import { useEffect, useState } from "react";
import styles from "./CtaButtons.module.scss";

// eslint-disable-next-line react/prop-types
function CtaButtons({
  clickFunction,
  w = "100px",
  h = "40px",
  eValue,
  children,
}) {
  const [toggled, setToggled] = useState("actual-button-style");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setButton();
  }, [eValue]);

  const setButton = () => {
    if (eValue !== null) {
      if (!eValue) {
        setToggled("actual-button-style");
      } else {
        setToggled("actual-button-style-clicked");
      }
      setClicked(eValue);
      clickFunction(eValue);
    }
  };
  const toggleStyle = () => {
    if (toggled.includes("clicked")) {
      setToggled("actual-button-style");
    } else {
      setToggled("actual-button-style-clicked");
    }
    setClicked(!clicked);
  };
  return (
    <button
      onClick={() => {
        toggleStyle();
        clickFunction(!clicked);
      }}
      className={styles["actual-button"]}
      style={{ width: w, height: h }}
    >
      <div
        className={styles[toggled]}
        style={{
          width: w,
          height: h,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </button>
  );
}

export default CtaButtons;
