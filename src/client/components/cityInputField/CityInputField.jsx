import { useEffect, useState } from "react";
import styles from "./CityInputField.module.scss";
import { debounce } from "lodash";
import axios from "axios";

// eslint-disable-next-line react/prop-types
function CityInputField({
  searchRef,
  setLoc,
  eLoc,
  w,
  h,
  p = "6px 20px",
  cityResult,
  setCityResult,
  eValue,
  children,
}) {
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    if (eValue !== null) {
      setLoc(eLoc);
    }
  }, []);
  useEffect(() => {
    const handleSelectCity = (city) => {
      searchRef.current.value = `${city.toponymName}, ${city.countryName}`;
      setLoc({ lon: city.lng, lat: city.lat });
      setSearchResult(null);
    };

    if (searchResult && searchResult.length > 0) {
      setCityResult(
        <div className={styles.cityListContainer}>
          <ul className={styles.cityList}>
            {searchResult.map((city) => {
              return (
                <li onClick={() => handleSelectCity(city)} key={city.geonameId}>
                  <div>
                    {city.toponymName} {city.countryName}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    } else {
      setCityResult(null);
    }
  }, [searchResult, searchRef, setLoc]);

  // convert text input into city info and uses debouncing to delay query for half a second
  const handleSearch = debounce(async (value) => {
    if (value === "") {
      setSearchResult(null);
      return;
    }
    const sResults = await axios.get(
      `http://localhost:8000/city?city=${value}`
    );
    setSearchResult(sResults.data);
  }, 500);

  return (
    <div
      style={{ width: w, height: h, padding: p }}
      className={styles["glass-card-outer-container"]}
    >
      <input
        className={styles["input-field-input"]}
        type="text"
        placeholder={children}
        ref={searchRef}
        onChange={(e) => {
          setLoc(null);
          handleSearch(e.target.value);
        }}
        defaultValue={eValue !== null ? eValue : ""}
      />

      {cityResult}
    </div>
  );
}

export default CityInputField;
