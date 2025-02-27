import GlassCard from "../glassCard/GlassCard";
import Separator from "../separator/Separator";
import styles from "./Popup.module.scss";
import xSvg from "../../assets/x.svg";
import xhoverSvg from "../../assets/xhover.svg";
import editSvg from "../../assets/edit.svg";
import edithoverSvg from "../../assets/edithover.svg";
import { useCallback, useRef, useEffect, useState } from "react";
import FancyDatePicker from "../fancyDatePicker/FancyDatePicker";
import InputField from "../inputField/InputField";
import CtaButtons from "../ctaButtons/CtaButtons";
import InputTextArea from "../inputTextArea/inputTextArea";
import CityInputField from "../cityInputField/CityInputField";
import { useTrips } from "../../hooks/useTrips";
import { format } from "date-fns";
import { set } from "lodash";
import axios from "axios";

// eslint-disable-next-line react/prop-types
function Popup({ closePopup, id, destMode, editObject, setEditObject }) {
  const xButton = useRef(null);
  const addTripTitleRef = useRef(null);
  const [addTripDate, setAddTripDate] = useState("");
  const [content, setContent] = useState(null);
  const searchRef = useRef(null);
  const { addTrip, trips, addDest, editTrip } = useTrips();
  const [dateEnabled, setDateEnabled] = useState(true);
  const [loc, setLoc] = useState(null);
  const hotelReff = useRef(null);
  const changeOnHover = (reff, svgg) => {
    reff.current.src = svgg;
  };
  const todoCheckButton = useRef(false);

  const addTripOnClick = useCallback(() => {
    let todo = null;
    //console.log(todoCheckButton.current);
    if (todoCheckButton.current) {
      todo = { count: 0, todos: {} };
    }
    if (editObject !== null) {
      let temp = { ...trips[editObject] };
      temp.title = addTripTitleRef.current.value;
      temp.date = addTripDate;
      console.log("tf", todoCheckButton.current);
      todoCheckButton.current
        ? temp.todo === null
          ? (temp.todo = todo)
          : null
        : (temp.todo = null);
      //temp.todo = todo;
      setEditObject(null);
      editTrip(editObject, temp);
    } else {
      addTrip({
        title: addTripTitleRef.current.value,
        date: addTripDate,
        dests: { count: 0, dests: [] },
        todo: todo,
      });
    }
    closePopup(false);
  }, [addTrip, addTripDate, closePopup]);

  const addDestOnClick = useCallback(async () => {
    const pic = await fetchPicture(searchRef.current.value);
    addDest(
      {
        city: searchRef.current.value,
        date: addTripDate,
        hotel: hotelReff.current.value,
        image: pic,
        location: loc,
        weather: null,
        refreshDate: null,
      },
      id
    );
    closePopup(false);
  }, [addTripDate, closePopup, id, addDest, loc]);

  const fetchPicture = async (q) => {
    const response = await axios.get(`http://localhost:8000/pic?query=${q}`);
    console.log(response);
    if (response.data) {
      const img = response.data;
      return img;
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (destMode) {
      setContent(
        <>
          <div className={styles["popup-title-container"]}>
            <button
              onClick={addDestOnClick}
              className={styles["popup-add-button"]}
            >
              Add
            </button>
            <span className={styles["popup-title-span"]}>Add Destination</span>
            <button
              onClick={() => closePopup(false)}
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
          <div className={styles["popup-separator-container"]}>
            <Separator w={"100%"}></Separator>
          </div>

          <div
            //style={{ backgroundColor: "red" }}
            className={styles["popup-body-container"]}
          >
            <div className={styles["popup-body-left-container"]}>
              <CityInputField
                setLoc={setLoc}
                searchRef={searchRef}
                w={"200px"}
                h={"26px"}
              >
                City
              </CityInputField>
            </div>
            <div style={{ height: "290px" }}>
              <FancyDatePicker
                selectedDate={addTripDate}
                onDateChange={setAddTripDate}
                enabled={dateEnabled}
              >
                Check-in date
              </FancyDatePicker>

              <div style={{ marginTop: "18px" }}>
                <CtaButtons
                  clickFunction={(tof) => {
                    if (tof) {
                      console.log(trips[id].date);

                      setAddTripDate(format(trips[id].date, "MMMM d, yyyy"));
                      setDateEnabled(false);
                    } else {
                      //setAddDestDate("");
                      setDateEnabled(true);
                    }
                  }}
                  w={"150px"}
                  h={"36px"}
                >
                  Use departing date
                </CtaButtons>
              </div>
              <div style={{ marginTop: "18px" }}>
                <InputTextArea reff={hotelReff} w={"200px"} h={"200px"}>
                  Hotel info
                </InputTextArea>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      setContent(
        <>
          <div className={styles["popup-title-container"]}>
            <button
              onClick={addTripOnClick}
              className={styles["popup-add-button"]}
            >
              Add
            </button>
            <span className={styles["popup-title-span"]}>add trip</span>
            <button
              onClick={() => {
                setEditObject(null);
                closePopup(false);
              }}
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
          <div className={styles["popup-separator-container"]}>
            <Separator w={"100%"}></Separator>
          </div>
          <div
            //style={{ backgroundColor: "red" }}
            className={styles["popup-body-container"]}
          >
            <div className={styles["popup-body-left-container"]}>
              <InputField
                eValue={trips[editObject] ? trips[editObject].title : null}
                reff={addTripTitleRef}
                w={"200px"}
                h={"26px"}
              >
                Trip title
              </InputField>
              <div style={{ marginTop: "18px" }}>
                <CtaButtons
                  eValue={
                    trips[editObject] ? trips[editObject].todo !== null : null
                  }
                  clickFunction={(tof) => {
                    todoCheckButton.current = tof;
                  }}
                  w={"120px"}
                  h={"36px"}
                >
                  Use Todo List
                </CtaButtons>
              </div>
            </div>
            <div style={{ height: "290px" }}>
              <FancyDatePicker
                eValue={trips[editObject] ? trips[editObject].date : null}
                selectedDate={addTripDate}
                onDateChange={setAddTripDate}
              >
                Departing date
              </FancyDatePicker>
            </div>
          </div>
        </>
      );
    }
  }, [
    addTripDate,
    addTripOnClick,
    closePopup,
    destMode,
    dateEnabled,
    trips,
    id,
    editObject,
    addDestOnClick,
  ]);

  return (
    <div className={styles["popup-absolute-container"]}>
      <GlassCard h={"100%"} w={"100%"} p="14px 20px">
        <div className={styles["popup-outer-container"]}>{content}</div>
      </GlassCard>
    </div>
  );
}

export default Popup;
