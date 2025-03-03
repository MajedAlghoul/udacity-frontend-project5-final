import { useTrips } from "../../hooks/useTrips";
import styles from "./DestSection.module.scss";
import React, { forwardRef } from "react";

// import PropTypes from "prop-types";
import Weather from "../weather/Weather";
import ETime from "../eTime/ETime";
import Hotel from "../hotel/Hotel";

const DestSection = forwardRef(({ tId, dId, ...props }, ref) => {
  const { trips } = useTrips();

  const backgroundImage = trips?.[tId]?.dests?.dests?.[dId]?.image
    ? `url("${trips[tId].dests.dests[dId].image}")`
    : "none";

  return (
    <div
      ref={ref}
      {...props}
      style={{
        ...props.style,
        backgroundImage,
        ...(trips[tId].todo === null
          ? { justifyContent: "center", alignItems: "center" }
          : {}),
      }}
      className={`${styles["dest-section-container"]} ${props.className || ""}`}
    >
      <div
        className={styles["dest-section-inner"]}
        style={{
          ...(trips[tId].todo === null
            ? { justifyContent: "center", marginLeft: "0" }
            : {}),
        }}
      >
        <div style={{ display: "flex" }}>
          <Weather tId={tId} dId={dId}></Weather>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <ETime tId={tId} dId={dId}></ETime>
          <Hotel tId={tId} dId={dId}></Hotel>
        </div>
      </div>
    </div>
  );
});
DestSection.displayName = "DestSection";

export default DestSection;
