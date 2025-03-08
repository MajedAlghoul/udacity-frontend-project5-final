import GlassCard from "../glassCard/GlassCard";
import Separator from "../separator/Separator";
import styles from "./Popup.module.scss";
import xSvg from "../../assets/x.svg";
import xhoverSvg from "../../assets/xhover.svg";
import { useCallback, useRef, useEffect, useState } from "react";
import FancyDatePicker from "../fancyDatePicker/FancyDatePicker";
import InputField from "../inputField/InputField";
import CtaButtons from "../ctaButtons/CtaButtons";
import InputTextArea from "../inputTextArea/inputTextArea";
import CityInputField from "../cityInputField/CityInputField";
import { useTrips } from "../../hooks/useTrips";
import { format, startOfDay } from "date-fns";

// eslint-disable-next-line react/prop-types
function Popup({ closePopup, id, destMode, editObject, setEditObject }) {
  const xButton = useRef(null);
  const addTripTitleRef = useRef(null);
  const [addTripDate, setAddTripDate] = useState("");
  const [content, setContent] = useState(null);
  const searchRef = useRef(null);
  const { addTrip, trips, addDest, editTrip, editDest } = useTrips();
  const [dateEnabled, setDateEnabled] = useState(true);
  const [loc, setLoc] = useState(null);
  const hotelReff = useRef(null);
  const [searchResult, setSearchResult] = useState(null);

  //function that handles x button hover
  const changeOnHover = (reff, svgg) => {
    reff.current.src = svgg;
  };
  const todoCheckButton = useRef(false);

  //function that handles trip addition/editing
  const addTripOnClick = useCallback(() => {
    if (addTripTitleRef.current.value === "") {
      alert("please add trip title");
    } else if (addTripDate === "") {
      alert("please add departing date");
    } else {
      let todo = null;
      if (todoCheckButton.current) {
        todo = { count: 0, todos: {} };
      }
      //handle trip editing
      if (editObject !== null) {
        let temp = { ...trips[editObject] };
        temp.title = addTripTitleRef.current.value;
        temp.date = addTripDate;
        todoCheckButton.current
          ? temp.todo === null
            ? (temp.todo = todo)
            : null
          : (temp.todo = null);
        editTrip(editObject, temp);
      } else {
        //handle trip addition
        addTrip({
          title: addTripTitleRef.current.value,
          date: addTripDate,
          dests: { count: 0, dests: [] },
          todo: todo,
        });
      }
      setEditObject(null);
      closePopup(false);
    }
  }, [addTrip, addTripDate, closePopup]);

  // function that handles dests addition/edit
  const addDestOnClick = useCallback(async () => {
    if (searchRef.current.value === "" || loc === null) {
      alert("please select a proper destination");
    } else if (addTripDate === "") {
      alert("please add destination date");
    } else {
      //handle dests edition
      if (editObject !== null) {
        let temp = { ...trips[id].dests.dests[editObject] };
        if (temp.city !== searchRef.current.value) {
          temp.location = loc;
          temp.image = null;

          temp.city = searchRef.current.value;
        }
        if (
          startOfDay(new Date(temp.date)).getTime() !==
          startOfDay(new Date(addTripDate)).getTime()
        ) {
          temp.weather = null;
        }
        temp.date = addTripDate;
        temp.hotel = hotelReff.current.value;
        editDest(id, editObject, temp);
      } else {
        //handle dest addition
        addDest(
          {
            city: searchRef.current.value,
            date: addTripDate,
            hotel: hotelReff.current.value,
            image: null,
            location: loc,
            weather: null,
            refreshDate: null,
          },
          id
        );
      }
      setEditObject(null);
      closePopup(false);
    }
  }, [addTripDate, closePopup, id, addDest, loc]);

  useEffect(() => {
    if (destMode) {
      // popup add/edit dests interface
      setContent(
        <>
          <div className={styles["popup-title-container"]}>
            <button
              onClick={addDestOnClick}
              className={styles["popup-add-button"]}
            >
              {editObject !== null ? "Edit" : "Add"}
            </button>
            <span className={styles["popup-title-span"]}>
              {editObject !== null ? "Edit Destination" : "Add Destination"}
            </span>
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

          <div className={styles["popup-body-container"]}>
            <div
              className={`${styles["popup-body-left-container"]} ${
                searchResult !== null
                  ? styles["popup-body-left-container-opened"]
                  : ""
              }`}
            >
              <CityInputField
                setLoc={setLoc}
                eLoc={
                  trips[id].dests.dests[editObject] && trips[id]
                    ? trips[id].dests.dests[editObject].location
                    : null
                }
                searchRef={searchRef}
                w={"200px"}
                h={"26px"}
                cityResult={searchResult}
                setCityResult={(e) => setSearchResult(e)}
                eValue={
                  trips[id].dests.dests[editObject] && trips[id]
                    ? trips[id].dests.dests[editObject].city
                    : null
                }
              >
                City
              </CityInputField>
            </div>
            <div style={{ height: "290px" }}>
              <FancyDatePicker
                selectedDate={addTripDate}
                onDateChange={setAddTripDate}
                enabled={dateEnabled}
                minDate={
                  new Date(Math.max(new Date(trips[id].date), new Date()))
                }
                eValue={
                  trips[id].dests.dests[editObject] && trips[id]
                    ? trips[id].dests.dests[editObject].date
                    : null
                }
              >
                Check-in date
              </FancyDatePicker>

              <div style={{ marginTop: "18px" }}>
                <CtaButtons
                  clickFunction={(tof) => {
                    if (tof) {
                      setAddTripDate(format(trips[id].date, "MMMM d, yyyy"));
                      setDateEnabled(false);
                    } else {
                      //setAddDestDate("");
                      setDateEnabled(true);
                    }
                  }}
                  w={"150px"}
                  h={"36px"}
                  eValue={
                    trips[id].dests.dests[editObject] && trips[id]
                      ? new Date(
                          trips[id].dests.dests[editObject].date
                        ).toDateString() ===
                        new Date(trips[id].date).toDateString()
                      : null
                  }
                >
                  Use departing date
                </CtaButtons>
              </div>
              <div style={{ marginTop: "18px" }}>
                <InputTextArea
                  reff={hotelReff}
                  w={"200px"}
                  h={"200px"}
                  eValue={
                    trips[id].dests.dests[editObject] && trips[id]
                      ? trips[id].dests.dests[editObject].hotel
                      : null
                  }
                >
                  Hotel info
                </InputTextArea>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      // popup interface for adding/editing trips
      setContent(
        <>
          <div className={styles["popup-title-container"]}>
            <button
              onClick={addTripOnClick}
              className={styles["popup-add-button"]}
            >
              {editObject !== null ? "Edit" : "Add"}
            </button>
            <span className={styles["popup-title-span"]}>
              {editObject !== null ? "Edit trip" : "Add trip"}
            </span>
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
                minDate={new Date()}
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
    searchResult,
    loc,
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
