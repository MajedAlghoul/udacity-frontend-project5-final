import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const TripsContext = createContext();

const STORAGE_KEY = "travel_planner";

//loads stored trips from local storage
const getInitialState = () => {
  try {
    const savedTrips = localStorage.getItem(STORAGE_KEY);
    if (savedTrips) {
      const parsed = JSON.parse(savedTrips, (key, value) => {
        if (key === "date") return new Date(value);
        return value;
      });
      return parsed;
    }
  } catch (error) {
    console.error("Failed to load trips from localStorage:", error);
  }
  return {};
};

export function TripsProvider({ children }) {
  //trips state houses all the data including trips and dests,
  const [trips, setTrips] = useState(getInitialState());

  // Save the trips state to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
    } catch (error) {
      console.error("Failed to save trips to localStorage:", error);
    }
  }, [trips]);

  // function to refresh data like weather and pictures depending on many factros such as date change
  const refreshData = () => {
    Object.keys(trips).forEach((id) => {
      if (trips[id].dests.count > 0) {
        Object.keys(trips[id].dests.dests).forEach((dId) => {
          const dest = trips[id].dests.dests[dId];
          const currentDate = new Date();
          const destDate = new Date(dest.date);
          const lastRefreshDate = dest.refreshDate
            ? new Date(dest.refreshDate)
            : null;
          //checks if the dest date falls in the range of 7 days starting from today due to free api tier limiations
          const daysDiff = Math.ceil(
            (destDate - currentDate) / (1000 * 60 * 60 * 24)
          );

          const shouldRefreshWeather =
            (!dest.weather ||
              !lastRefreshDate ||
              lastRefreshDate.toDateString() !== currentDate.toDateString() ||
              (dest.weather && Object.keys(dest.weather).length === 0)) &&
            daysDiff >= 0 &&
            daysDiff < 7;

          //attempt to get image for the dest
          if (dest.image === null) {
            (async () => {
              const img = await fetchPicture(dest.city);
              setTrips((prev) => ({
                ...prev,
                [id]: {
                  ...prev[id],
                  dests: {
                    ...prev[id].dests,
                    dests: {
                      ...prev[id].dests.dests,
                      [dId]: {
                        ...prev[id].dests.dests[dId],
                        image: img,
                      },
                    },
                  },
                },
              }));
            })();
          }

          // adjust / refresh weather for dests
          if (daysDiff < 0 || daysDiff >= 7) {
            setTrips((prev) => {
              let temp = { ...prev };
              temp[id].dests.dests[dId].weather = null;
              return temp;
            });
          } else if (shouldRefreshWeather) {
            (async () => {
              const newWeather = await getWeather(dest.location, dest.date);
              setTrips((prev) => ({
                ...prev,
                [id]: {
                  ...prev[id],
                  dests: {
                    ...prev[id].dests,
                    dests: {
                      ...prev[id].dests.dests,
                      [dId]: {
                        ...prev[id].dests.dests[dId],
                        weather: newWeather,
                        refreshDate: currentDate.toDateString(),
                      },
                    },
                  },
                },
              }));
            })();
          }
        });
      }
    });
  };

  // function to fetch pictures from the express server
  const fetchPicture = async (q) => {
    const response = await axios.get(`http://localhost:8000/pic?query=${q}`);
    if (response.data) {
      const img = response.data;
      return img;
    } else {
      return null;
    }
  };

  // function to fetch weather information for a specific location
  const getWeather = async (location, destDate) => {
    const response = await axios.get(
      `http://localhost:8000/weather?lon=${location.lon}&lat=${location.lat}`
    );

    if (response.data) {
      const startDate = new Date(destDate);
      const weatherData = response.data.reduce((acc, weatherData) => {
        const weatherDate = new Date(weatherData.datetime);
        // return weather for only 7 days range from now
        const daysDiff = Math.floor(
          (weatherDate - startDate) / (1000 * 60 * 60 * 24)
        );
        if (daysDiff >= 0 && daysDiff < 7) {
          acc[weatherData.datetime] = {
            temp: weatherData.temp,
            icon: `https://www.weatherbit.io/static/img/icons/${weatherData.weather.icon}.png`,
            description: weatherData.weather.description,
          };
        }
        return acc;
      }, {});

      return Object.keys(weatherData).length > 0 ? weatherData : null;
    }
    return null;
  };

  //refresh data on mount and adds an empty todo which servers as the todo add machanism
  useEffect(() => {
    Object.keys(trips).forEach((id) => {
      addEmptyTodo(id);
    });
    refreshData();
  }, []);

  // adds empty todo
  const addEmptyTodo = (id) => {
    if (trips[id].todo !== null) {
      setTrips((prev) => {
        let temp = { ...prev };
        temp[id].todo.todos["empty"] = { title: "", done: false };
        return temp;
      });
    }
  };

  //remove a todo from a trip
  const removeTodo = (id, todoId) => {
    setTrips((prev) => {
      let temp = { ...prev };
      if (!temp[id].todo.todos[todoId].done) {
        temp[id].todo.count--;
      }
      delete temp[id].todo.todos[todoId];
      return temp;
    });
  };

  // checks / unchecks a todo
  const toggleTodo = (id, todoId) => {
    setTrips((prev) => {
      let temp = { ...prev };
      temp[id].todo.todos[todoId].done = !temp[id].todo.todos[todoId].done;
      if (temp[id].todo.todos[todoId].done) {
        temp[id].todo.count--;
      } else {
        temp[id].todo.count++;
      }
      return temp;
    });
  };

  //updates a todo's text
  const updateTodo = (id, todoId, text) => {
    setTrips((prev) => {
      let temp = { ...prev };
      //handle the case of a todo addition
      if (todoId === "empty") {
        const newTodoId = generateUUID();
        temp[id].todo.todos[newTodoId] = { title: text, done: false };
        temp[id].todo.count++;
        delete temp[id].todo.todos["empty"];
        addEmptyTodo(id);
      } else {
        temp[id].todo.todos[todoId].title = text;
      }
      return temp;
    });
  };

  //add a dest to a specific trip
  const addDest = (trip, id) => {
    setTrips((prev) => {
      let temp = { ...prev };
      temp[id].dests.dests[generateUUID()] = trip;
      temp[id].dests.count++;
      return temp;
    });
    refreshData();
  };

  // adds a new trip
  const addTrip = (trip) => {
    setTrips((prev) => {
      let temp = { ...prev };
      const newID = generateUUID();
      temp[newID] = trip;
      if (temp[newID].todo !== null) {
        temp[newID].todo.todos["empty"] = { title: "", done: false };
      }
      return temp;
    });
  };

  //edits a specific trip
  const editTrip = (id, trip) => {
    setTrips((prev) => {
      let temp = { ...prev };
      temp[id] = trip;
      if (temp[id].todo !== null) {
        temp[id].todo.todos["empty"] = { title: "", done: false };
      }
      return temp;
    });
    refreshData();
  };

  // edits a spesific dest
  const editDest = (tId, dId, dest) => {
    setTrips((prev) => {
      let temp = { ...prev };
      temp[tId].dests.dests[dId] = dest;
      return temp;
    });
    refreshData();
  };

  //removes a specific trip
  const removeTrip = (id) => {
    setTrips((prev) => {
      let temp = { ...prev };
      delete temp[id];
      return temp;
    });
  };

  //removes a spesific trip
  const removeDest = (tId, dId) => {
    setTrips((prev) => {
      let temp = { ...prev };
      delete temp[tId].dests.dests[dId];
      temp[tId].dests.count--;
      return temp;
    });
  };

  //checks if theres no trips
  const isTripsEmpty = () => {
    return Object.keys(trips).length === 0;
  };

  return (
    <TripsContext.Provider
      value={{
        trips,
        isTripsEmpty,
        addTrip,
        removeTrip,
        addDest,
        removeTodo,
        toggleTodo,
        updateTodo,
        editTrip,
        editDest,
        removeDest,
      }}
    >
      {children}
    </TripsContext.Provider>
  );
}

// function to generate uuids or unique ids for trips and dests
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function useTrips() {
  return useContext(TripsContext);
}
