import GlassCard from "../glassCard/GlassCard";
import Separator from "../separator/Separator";
import styles from "./TripCard.module.scss";
import xSvg from "../../assets/x.svg";
import xhoverSvg from "../../assets/xhover.svg";
import editSvg from "../../assets/edit.svg";
import edithoverSvg from "../../assets/edithover.svg";
import { useRef, useState } from "react";

// eslint-disable-next-line react/prop-types
function TripCard({ id, title, tDate, todo, dests, clickFunction }) {
  const xButton = useRef(null);
  const editButton = useRef(null);
  const changeOnHover = (reff, svgg) => {
    reff.current.src = svgg;
  };

  return (
    <div
      role="button"
      onClick={clickFunction}
      className={styles["trip-card-button"]}
    >
      <GlassCard h={"170px"} w={"300px"} p="14px 20px">
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
              <span> {dests.count} days</span>
            </div>
            <span
              style={{
                textAlign: "end",
                flex: "0 1 auto",
                fontSize: "16px",
              }}
            >
              {tDate}
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
                <div className={styles["color-indicator"]}></div>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

export default TripCard;
