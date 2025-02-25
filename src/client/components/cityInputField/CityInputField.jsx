import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./CityInputField.module.scss";
import { debounce } from "lodash";
import axios from "axios";

// eslint-disable-next-line react/prop-types
function CityInputField({ searchRef, w, h, p = "6px 20px", children }) {
  const [searchResult, setSearchResult] = useState(null);
  const [cityResult, setCityResult] = useState(null);

  useEffect(() => {
    const handleSelectCity = (city) => {
      searchRef.current.value = `${city.toponymName}, ${city.countryName}`;
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
  }, [searchResult, searchRef]);

  const handleSearch = debounce(async (value) => {
    if (value === "") {
      setSearchResult(null);
      return;
    }
    const sResults = await axios.get(
      `http://localhost:8000/city?city=${value}`
    );
    //console.log(sResults);
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
          handleSearch(e.target.value);
        }}
      />

      {cityResult}
    </div>
  );
}

export default CityInputField;
