import styles from "./FancyDatePicker.module.scss";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// eslint-disable-next-line react/prop-types
function FancyDatePicker({
  selectedDate,
  onDateChange,
  enabled = true,
  eValue,
  minDate,
  children,
}) {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (eValue !== null) {
      onDateChange(eValue);
    }
  }, []);

  return (
    <div className={opened ? styles["fancy-datepicker-container"] : ""}>
      <DatePicker
        key={selectedDate}
        minDate={minDate}
        selected={selectedDate}
        onChange={(date) => {
          onDateChange(date);
          setOpened(false);
        }}
        disabled={!enabled}
        onInputClick={() => setOpened(true)}
        onClickOutside={() => setOpened(false)}
        onCalendarOpen={() => setOpened(true)}
        dateFormat="MMMM d, yyyy"
        className={styles["custom-datepicker"]}
        placeholderText={children}
      />
    </div>
  );
}

export default FancyDatePicker;
