import GlassCard from "../glassCard/GlassCard";
import Separator from "../separator/Separator";
import styles from "./DestCard.module.scss";
import xSvg from "../../assets/x.svg";
import xhoverSvg from "../../assets/xhover.svg";
import editSvg from "../../assets/edit.svg";
import edithoverSvg from "../../assets/edithover.svg";
import { use, useRef, useState } from "react";
import tempimg from "../../assets/background.jpg";
import noImageSvg from "../../assets/noimage.svg";
// eslint-disable-next-line react/prop-types
function DestCard({ id, city, dDate, hotel, image, clickFunction }) {
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
      <GlassCard h={"260px"} w={"300px"} p="8px 8px">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div className={styles["dest-city-image-container"]}>
            {image === null ? (
              <div
                style={{
                  width: "200px",
                  height: "200px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  style={{
                    width: "50%",
                    height: "50%",
                    top: "100%",
                  }}
                  src={noImageSvg}
                />
              </div>
            ) : (
              <img style={{ width: "100%", height: "100%" }} src={image} />
            )}
          </div>
          <div className={styles["dest-city-bottom-container"]}>
            <div className={styles["trip-card-title"]}>{city}</div>
            <div style={{ display: "flex" }}>
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
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

export default DestCard;
