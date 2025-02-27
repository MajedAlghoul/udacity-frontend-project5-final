import { add, get } from "lodash";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const TripsContext = createContext();

export function TripsProvider({ children }) {
  const [trips, setTrips] = useState({
    111: {
      title: "Trip to Switzerland",
      date: new Date("2022-12-12"),
      dests: {
        count: 1,
        dests: {
          222: {
            city: "Berlin, Germany",
            date: new Date("2022-12-13"),
            hotel: "Hotel",
            image:
              "https://pixabay.com/get/gb3059bd65d97b16f5732d725c51c220576d9a7d5029bff3049a916a90f9243deda07ff2be86fe881306dbfea3c9210ac908320aacea33216a5c397f5fb7b5b36_1280.jpg",
            location: {
              lat: 31.89964,
              lon: 35.20422,
            },
            weather: {
              "2025-01-01": {
                temp: 3,
                icon: "https://www.weatherbit.io/static/img/icons/c02d.png",
                description: "Mostly Clouds",
              },
              "2025-01-02": {
                temp: 3,
                icon: "https://www.weatherbit.io/static/img/icons/c02d.png",
                description: "Mostly Clouds",
              },
              "2025-01-03": {
                temp: 3,
                icon: "https://www.weatherbit.io/static/img/icons/c02d.png",
                description: "Mostly Clouds",
              },
              "2025-01-04": {
                temp: 3,
                icon: "https://www.weatherbit.io/static/img/icons/c02d.png",
                description: "Mostly Clouds",
              },
              "2025-01-05": {
                temp: 3,
                icon: "https://www.weatherbit.io/static/img/icons/c02d.png",
                description: "Mostly Clouds",
              },
              "2025-01-06": {
                temp: 3,
                icon: "https://www.weatherbit.io/static/img/icons/c02d.png",
                description: "Mostly Clouds",
              },
              "2025-01-07": {
                temp: 3,
                icon: "https://www.weatherbit.io/static/img/icons/c02d.png",
                description: "Mostly Clouds",
              },
            },
            refreshDate: new Date().toDateString(),
          },
        },
      },
      todo: {
        count: 2,
        todos: {
          11: { title: "Buy groceries", done: false },
          22: { title: "Buy groceries", done: false },
          33: { title: "Buy xx", done: true },
        },
      },
    },
  });

  useEffect(() => {
    const getWeather = async (location, datee) => {
      const response = await axios.get(
        `http://localhost:8000/weather?lon=${location.lon}&lat=${location.lat}`
      );
      if (response.data) {
        return response.data.reduce((acc, weatherData) => {
          const weatherDate = new Date(weatherData.datetime);
          const destDate = new Date(datee);
          console.log(weatherDate, destDate);
          if (weatherDate >= destDate) {
            acc[weatherData.datetime] = {
              temp: weatherData.temp,
              icon: `https://www.weatherbit.io/static/img/icons/${weatherData.weather.icon}.png`,
              description: weatherData.weather.description,
            };
          }
          return acc;
        }, {});
      } else {
        return null;
      }
    };
    Object.keys(trips).forEach((id) => {
      if (trips[id].dests.count > 0) {
        Object.keys(trips[id].dests.dests).forEach((dId) => {
          if (
            trips[id].dests.dests[dId].refreshDate === null ||
            trips[id].dests.dests[dId].refreshDate < new Date().toDateString()
          ) {
            (async () => {
              console.log("refreshing", id, dId);
              const newWeather = await getWeather(
                trips[id].dests.dests[dId].location,
                trips[id].dests.dests[dId].date
              );
              setTrips((prev) => {
                let temp = { ...prev };
                temp[id].dests.dests[dId].weather = newWeather;
                temp[id].dests.dests[dId].refreshDate =
                  new Date().toDateString();
                return temp;
              });
            })();
          }
        });
      }
    });
  }, [trips]);

  const addEmptyTodo = (id) => {
    setTrips((prev) => {
      let temp = { ...prev };
      temp[id].todo.todos["empty"] = { title: "", done: false };
      return temp;
    });
  };

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

  const updateTodo = (id, todoId, text) => {
    setTrips((prev) => {
      let temp = { ...prev };
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

  const addDest = (trip, id) => {
    setTrips((prev) => {
      let temp = { ...prev };
      temp[id].dests.dests[generateUUID()] = trip;
      temp[id].dests.count++;
      return temp;
    });
  };

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

  const editTrip = (id, trip) => {
    setTrips((prev) => {
      let temp = { ...prev };
      temp[id] = trip;
      if (temp[id].todo !== null) {
        temp[id].todo.todos["empty"] = { title: "", done: false };
      }
      return temp;
    });
  };
  const removeTrip = (id) => {
    setTrips((prev) => {
      let temp = { ...prev };
      delete temp[id];
      return temp;
    });
  };
  const isTripsEmpty = () => {
    return Object.keys(trips).length === 0;
  };

  useEffect(() => {
    Object.keys(trips).forEach((id) => {
      addEmptyTodo(id);
    });
  }, []);

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
      }}
    >
      {children}
    </TripsContext.Provider>
  );
}

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
