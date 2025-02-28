import { useTrips } from "../../hooks/useTrips";
import styles from "./DestGrid.module.scss";
import React, { forwardRef } from "react";

// eslint-disable-next-line react/prop-types
const DestGrid = forwardRef(({ tId, children, ...props }, ref) => {
  const { trips } = useTrips();
  return (
    <div
      ref={ref}
      {...props}
      style={{
        ...(trips[tId].todo === null
          ? { justifyContent: "center", width: "100vw" }
          : {}),
      }}
      className={`${styles["dest-grid-container"]} ${props.className || ""}`}
    >
      {children}
    </div>
  );
});

DestGrid.displayName = "DestGrid";
export default DestGrid;
