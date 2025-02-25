import GlassCard from "../glassCard/GlassCard";
import styles from "./TripGrid.module.scss";

// eslint-disable-next-line react/prop-types
function TripGrid({ children }) {
  return <div className={styles["trip-grid-container"]}>{children}</div>;
}

export default TripGrid;
