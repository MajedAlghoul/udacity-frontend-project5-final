import { createContext, useContext, useState, useEffect } from "react";

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
              "https://pixabay.com/get/ge30be40bfe317a71d38c431d371404e590004cabe21df906651008dae623af057f41d1f6153e83b743d2fee73868988e82832a63cc2c50ee2bde1c58200d3e42_1280.jpg",
          },
        },
      },
      todo: { count: 0, todos: [] },
    },
    222: {
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
              "https://pixabay.com/get/ge30be40bfe317a71d38c431d371404e590004cabe21df906651008dae623af057f41d1f6153e83b743d2fee73868988e82832a63cc2c50ee2bde1c58200d3e42_1280.jpg",
          },
        },
      },
      todo: { count: 0, todos: [] },
    },
    333: {
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
              "https://pixabay.com/get/ge30be40bfe317a71d38c431d371404e590004cabe21df906651008dae623af057f41d1f6153e83b743d2fee73868988e82832a63cc2c50ee2bde1c58200d3e42_1280.jpg",
          },
        },
      },
      todo: { count: 0, todos: [] },
    },
    444: {
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
              "https://pixabay.com/get/ge30be40bfe317a71d38c431d371404e590004cabe21df906651008dae623af057f41d1f6153e83b743d2fee73868988e82832a63cc2c50ee2bde1c58200d3e42_1280.jpg",
          },
        },
      },
      todo: { count: 0, todos: [] },
    },
    555: {
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
              "https://pixabay.com/get/ge30be40bfe317a71d38c431d371404e590004cabe21df906651008dae623af057f41d1f6153e83b743d2fee73868988e82832a63cc2c50ee2bde1c58200d3e42_1280.jpg",
          },
        },
      },
      todo: { count: 0, todos: [] },
    },
    666: {
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
              "https://pixabay.com/get/ge30be40bfe317a71d38c431d371404e590004cabe21df906651008dae623af057f41d1f6153e83b743d2fee73868988e82832a63cc2c50ee2bde1c58200d3e42_1280.jpg",
          },
        },
      },
      todo: { count: 0, todos: [] },
    },
    777: {
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
              "https://pixabay.com/get/ge30be40bfe317a71d38c431d371404e590004cabe21df906651008dae623af057f41d1f6153e83b743d2fee73868988e82832a63cc2c50ee2bde1c58200d3e42_1280.jpg",
          },
        },
      },
      todo: { count: 0, todos: [] },
    },
    999: {
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
              "https://pixabay.com/get/ge30be40bfe317a71d38c431d371404e590004cabe21df906651008dae623af057f41d1f6153e83b743d2fee73868988e82832a63cc2c50ee2bde1c58200d3e42_1280.jpg",
          },
        },
      },
      todo: { count: 0, todos: [] },
    },
    888: {
      title: "Trip to Switzerland",
      date: new Date("2022-12-12"),
      dests: {
        count: 15,
        dests: {
          222: {
            city: "Berlin, Germany",
            date: new Date("2022-12-13"),
            hotel: "Hotel",
            image:
              "https://pixabay.com/get/g3c9a3cbf7fffa4711754e7d28fa67e91b085f6e1ee0afc94cce3d496702ec06b4cdc0db88ceb8c77f3b2916a8c44761ebfde707874987d7bf1950a702855797f_1280.jpg",
          },
          2123: {
            city: "Berlin, Germany",
            date: new Date("2022-12-13"),
            hotel: "Hotel",
            image:
              "https://pixabay.com/get/ge30be40bfe317a71d38c431d371404e590004cabe21df906651008dae623af057f41d1f6153e83b743d2fee73868988e82832a63cc2c50ee2bde1c58200d3e42_1280.jpg",
          },
          8: {
            city: "Berlin, Germany",
            date: new Date("2022-12-13"),
            hotel: "Hotel",
            image:
              "https://pixabay.com/get/ge30be40bfe317a71d38c431d371404e590004cabe21df906651008dae623af057f41d1f6153e83b743d2fee73868988e82832a63cc2c50ee2bde1c58200d3e42_1280.jpg",
          },
          4: {
            city: "Berlin, Germany",
            date: new Date("2022-12-13"),
            hotel: "Hotel",
            image:
              "https://pixabay.com/get/ge30be40bfe317a71d38c431d371404e590004cabe21df906651008dae623af057f41d1f6153e83b743d2fee73868988e82832a63cc2c50ee2bde1c58200d3e42_1280.jpg",
          },
          cvb: {
            city: "Berlin, Germany",
            date: new Date("2022-12-13"),
            hotel: "Hotel",
            image:
              "https://pixabay.com/get/ge30be40bfe317a71d38c431d371404e590004cabe21df906651008dae623af057f41d1f6153e83b743d2fee73868988e82832a63cc2c50ee2bde1c58200d3e42_1280.jpg",
          },
          erg: {
            city: "Berlin, Germany",
            date: new Date("2022-12-13"),
            hotel: "Hotel",
            image:
              "https://pixabay.com/get/ge30be40bfe317a71d38c431d371404e590004cabe21df906651008dae623af057f41d1f6153e83b743d2fee73868988e82832a63cc2c50ee2bde1c58200d3e42_1280.jpg",
          },
          ll: {
            city: "Berlin, Germany",
            date: new Date("2022-12-13"),
            hotel: "Hotel",
            image:
              "https://pixabay.com/get/ge30be40bfe317a71d38c431d371404e590004cabe21df906651008dae623af057f41d1f6153e83b743d2fee73868988e82832a63cc2c50ee2bde1c58200d3e42_1280.jpg",
          },
          aa: {
            city: "Berlin, Germany",
            date: new Date("2022-12-13"),
            hotel: "Hotel",
            image:
              "https://pixabay.com/get/ge30be40bfe317a71d38c431d371404e590004cabe21df906651008dae623af057f41d1f6153e83b743d2fee73868988e82832a63cc2c50ee2bde1c58200d3e42_1280.jpg",
          },
          kkk: {
            city: "Berlin, Germany",
            date: new Date("2022-12-13"),
            hotel: "Hotel",
            image:
              "https://pixabay.com/get/ge30be40bfe317a71d38c431d371404e590004cabe21df906651008dae623af057f41d1f6153e83b743d2fee73868988e82832a63cc2c50ee2bde1c58200d3e42_1280.jpg",
          },
          uuu: {
            city: "Berlin, Germany",
            date: new Date("2022-12-13"),
            hotel: "Hotel",
            image:
              "https://pixabay.com/get/ge30be40bfe317a71d38c431d371404e590004cabe21df906651008dae623af057f41d1f6153e83b743d2fee73868988e82832a63cc2c50ee2bde1c58200d3e42_1280.jpg",
          },
          q: {
            city: "Berlin, Germany",
            date: new Date("2022-12-13"),
            hotel: "Hotel",
            image:
              "https://pixabay.com/get/ge30be40bfe317a71d38c431d371404e590004cabe21df906651008dae623af057f41d1f6153e83b743d2fee73868988e82832a63cc2c50ee2bde1c58200d3e42_1280.jpg",
          },
          g: {
            city: "Berlin, Germany",
            date: new Date("2022-12-13"),
            hotel: "Hotel",
            image:
              "https://pixabay.com/get/ge30be40bfe317a71d38c431d371404e590004cabe21df906651008dae623af057f41d1f6153e83b743d2fee73868988e82832a63cc2c50ee2bde1c58200d3e42_1280.jpg",
          },
          s: {
            city: "Berlin, Germany",
            date: new Date("2022-12-13"),
            hotel: "Hotel",
            image:
              "https://pixabay.com/get/ge30be40bfe317a71d38c431d371404e590004cabe21df906651008dae623af057f41d1f6153e83b743d2fee73868988e82832a63cc2c50ee2bde1c58200d3e42_1280.jpg",
          },
          x: {
            city: "Berlin, Germany",
            date: new Date("2022-12-13"),
            hotel: "Hotel",
            image:
              "https://pixabay.com/get/ge30be40bfe317a71d38c431d371404e590004cabe21df906651008dae623af057f41d1f6153e83b743d2fee73868988e82832a63cc2c50ee2bde1c58200d3e42_1280.jpg",
          },
          xxx: {
            city: "Berlin, Germany",
            date: new Date("2022-12-13"),
            hotel: "Hotel",
            image:
              "https://pixabay.com/get/ge30be40bfe317a71d38c431d371404e590004cabe21df906651008dae623af057f41d1f6153e83b743d2fee73868988e82832a63cc2c50ee2bde1c58200d3e42_1280.jpg",
          },
        },
      },
      todo: { count: 0, todos: [] },
    },
    ggg: {
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
              "https://pixabay.com/get/ge30be40bfe317a71d38c431d371404e590004cabe21df906651008dae623af057f41d1f6153e83b743d2fee73868988e82832a63cc2c50ee2bde1c58200d3e42_1280.jpg",
          },
        },
      },
      todo: { count: 0, todos: [] },
    },
    aaa: {
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
              "https://pixabay.com/get/ge30be40bfe317a71d38c431d371404e590004cabe21df906651008dae623af057f41d1f6153e83b743d2fee73868988e82832a63cc2c50ee2bde1c58200d3e42_1280.jpg",
          },
        },
      },
      todo: { count: 0, todos: [] },
    },
    xxx: {
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
              "https://pixabay.com/get/ge30be40bfe317a71d38c431d371404e590004cabe21df906651008dae623af057f41d1f6153e83b743d2fee73868988e82832a63cc2c50ee2bde1c58200d3e42_1280.jpg",
          },
        },
      },
      todo: { count: 0, todos: [] },
    },
  });

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
      temp[generateUUID()] = trip;
      return temp;
    });
  };
  const removeTrip = (trip) => {
    setTrips(trips.filter((t) => t.id !== trip.id));
  };
  const isTripsEmpty = () => {
    return trips.length === 0;
  };
  return (
    <TripsContext.Provider
      value={{ trips, isTripsEmpty, addTrip, removeTrip, addDest }}
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
