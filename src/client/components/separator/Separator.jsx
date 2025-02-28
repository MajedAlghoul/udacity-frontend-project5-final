import styles from "./Separator.module.scss";

// eslint-disable-next-line react/prop-types
function Separator({ w, r = "0deg" }) {
  return (
    <div
      style={{ width: w, rotate: r }}
      className={styles["trip-separator-container"]}
    >
      <div className={styles["trip-separator-dark"]}></div>
      <div className={styles["trip-separator-light"]}></div>
    </div>
  );
}

export default Separator;
