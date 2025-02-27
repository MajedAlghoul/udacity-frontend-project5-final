import GlassCard from "../glassCard/GlassCard";
import Separator from "../separator/Separator";
import styles from "./TripCard.module.scss";
import xSvg from "../../assets/x.svg";
import xhoverSvg from "../../assets/xhover.svg";
import editSvg from "../../assets/edit.svg";
import edithoverSvg from "../../assets/edithover.svg";
import { useRef, useState } from "react";
import { format } from "date-fns";
// eslint-disable-next-line react/prop-types
function TripCard({
  id,
  title,
  tDate,
  dests,
  clickFunction,
  deleteTrip,
  editTrip,
}) {
  const xButton = useRef(null);
  const editButton = useRef(null);

  const timeRemaining = Math.ceil(
    (new Date(tDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  const getColor = () => {
    if (timeRemaining <= 0) {
      return "#FF2C2F";
    } else if (timeRemaining < 3) {
      return "#FFD900";
    } else {
      return "#83FF49";
    }
  };
  const changeOnHover = (reff, svgg) => {
    reff.current.src = svgg;
  };

  return (
    <div
      role="button"
      onClick={clickFunction}
      className={styles["trip-card-button"]}
    >
      <GlassCard h={"200px"} w={"360px"} p="14px 20px">
        <div className={styles["trip-little-grid"]}>
          <div className={styles["trip-card-title-container"]}>
            <div className={styles["trip-card-title"]}>{title}</div>
            <Separator w={"200px"}></Separator>
          </div>
          <div className={styles["trip-card-dests-container"]}>
            <div>Destinations</div>
            <span>{dests.count}</span>
          </div>
          <div className={styles["trip-card-departing-container"]}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: "0 0 auto",
                textAlign: "start",
                fontSize: "16px",
              }}
            >
              <span>Departing in</span>
              <span> {timeRemaining || 0} days</span>
            </div>
            <span
              style={{
                textAlign: "end",
                flex: "0 1 auto",
                fontSize: "16px",
              }}
            >
              {format(tDate, "do 'of' MMM'\n'yyyy")}
            </span>
          </div>
          <div className={styles["trip-card-sidebar"]}>
            <div className={styles["trip-card-sidebar-separator-container"]}>
              <Separator w={"198px"}></Separator>
            </div>
            <div className={styles["inner-trip-card-sidebar-container"]}>
              <button
                onMouseOver={() => changeOnHover(xButton, xhoverSvg)}
                onMouseLeave={() => changeOnHover(xButton, xSvg)}
                className={styles["trip-card-buttons"]}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTrip();
                }}
              >
                <img
                  className={styles["trip-card-buttons-images"]}
                  ref={xButton}
                  src={xSvg}
                ></img>
              </button>
              <button
                onMouseOver={() => changeOnHover(editButton, edithoverSvg)}
                onMouseLeave={() => changeOnHover(editButton, editSvg)}
                className={styles["trip-card-buttons"]}
                onClick={(e) => {
                  e.stopPropagation();
                  editTrip();
                }}
              >
                <img
                  className={styles["trip-card-buttons-images"]}
                  ref={editButton}
                  src={editSvg}
                />
              </button>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "48px",
                  justifyContent: "center",
                }}
              >
                <div
                  className={styles["color-indicator"]}
                  style={{ backgroundColor: getColor() }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

export default TripCard;
