import GlassCard from "../glassCard/GlassCard";
import styles from "./Buttons.module.scss";

// eslint-disable-next-line react/prop-types
function Buttons({ clickFunction, w = "100px", h = "40px", children }) {
  return (
    <button
      onClick={() => clickFunction()}
      className={styles["actual-button"]}
      style={{ width: w, height: h }}
    >
      <GlassCard h={h} w={w}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </div>
      </GlassCard>
    </button>
  );
}

export default Buttons;
