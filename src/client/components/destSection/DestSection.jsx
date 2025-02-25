import { useTrips } from "../../hooks/useTrips";
import styles from "./DestSection.module.scss";
import React, { forwardRef } from "react";

import PropTypes from "prop-types";
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
      style={{ ...props.style, backgroundImage }}
      className={`${styles["dest-section-container"]} ${props.className || ""}`}
    >
      <div className={styles["dest-section-inner"]}>
        <Weather></Weather>
        <div>
          <ETime></ETime>
          <Hotel></Hotel>
        </div>
      </div>
    </div>
  );
});
DestSection.displayName = "DestSection";

export default DestSection;
