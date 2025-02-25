import styles from "./GlassCard.module.scss";

// eslint-disable-next-line react/prop-types
function GlassCard({ w, h, p = "10px 20px", children }) {
  return (
    <div
      style={{ width: w, height: h, padding: p }}
      className={styles["glass-card-outer-container"]}
    >
      <div className={styles["glass-card-inner-container"]}>{children}</div>
    </div>
  );
}

export default GlassCard;
