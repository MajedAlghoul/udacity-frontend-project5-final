import GlassCard from "../glassCard/GlassCard";
import Todo from "../todo/Todo";
import styles from "./DestGrid.module.scss";
import React, { forwardRef } from "react";

// eslint-disable-next-line react/prop-types
const DestGrid = forwardRef(({ children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={`${styles["dest-grid-container"]} ${props.className || ""}`}
    >
      {children}
    </div>
  );
});

DestGrid.displayName = "DestGrid";
export default DestGrid;
