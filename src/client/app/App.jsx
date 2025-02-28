import { useCallback, useRef, useState, useEffect } from "react";
import "./App.scss";
import NoItemsCard from "../components/noItemsCard/noItemsCard";
import NavHeader from "../components/navHeader/NavHeader";
import Buttons from "../components/buttons/Buttons";
import plusSvg from "../assets/plus.svg";
import upArrowSvg from "../assets/uparrow.svg";
import { useTrips } from "../hooks/useTrips";
import TripGrid from "../components/tripGrid/TripGrid";
import TripCard from "../components/tripCard/TripCard";
import Popup from "../components/popup/Popup";
import { format } from "date-fns";
import DestGrid from "../components/destGrid/DestGrid";
import backArrowSvg from "../assets/backarrow.svg";
import DestCard from "../components/destCard/DestCard";
import DestSection from "../components/destSection/DestSection";
import Todo from "../components/todo/Todo";

/*
this is the main app function that contains the content to display the trips and dests grids
it uses different components to achieve this,

mainly theres a

navbar component for the navbar
tripsgrid component for the trips grid
tripcard component for showing a trip info
destgrid component for showing the dests grid
destcard component for showing the image and name of the dest
destsection component which displays weather and more info about a dest

and most importantly the popup component which handles the addition editing of trips / dests

almost all components rely on glasscard component which is the fancy glass like effect card

some important components are the cityinput and facncy datepicker

cityinput component wraps a text input and intigrates the geoinfo api by contacting the express server
to display suggestions

fancydatepicker component relies on the package react-datepicker which is a nice gui date picker

i made most of the icons used,
*/

function App() {
  const { trips, isTripsEmpty, removeTrip, removeDest } = useTrips();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDestViewOpen, setIsDestViewOpen] = useState(false);
  const [tripViewId, setTripViewId] = useState(null);
  const sectionsRef = useRef({});
  const dGridRef = useRef(null);
  const containerRef = useRef(null);
  const [isDestGridInView, setIsDestGridInView] = useState(true);
  const [hasDestinations, setHasDestinations] = useState(false);
  const [holdEditTrip, setHoldEditTrip] = useState(null);

  //use effect to keep up with the fact that the current trip has dests or not
  useEffect(() => {
    if (tripViewId !== null && trips[tripViewId]) {
      setHasDestinations(trips[tripViewId].dests.count > 0);
    }
  }, [trips, tripViewId]);

  //use effect that observes the dests grid to switch the main button from adding dests / going up based
  // on if the dests grid is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDestGridInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (isDestViewOpen) {
      setIsDestGridInView(true);
    }

    const currentDGridRef = dGridRef.current;
    if (currentDGridRef && isDestViewOpen) {
      observer.observe(currentDGridRef);
    }

    return () => {
      if (currentDGridRef) {
        observer.unobserve(currentDGridRef);
      }
    };
  }, [dGridRef, isDestViewOpen, hasDestinations]);

  // function to close popup for adding/editing trips/dests
  const handlePopupClose = (isOpen) => {
    setIsPopupOpen(isOpen);

    if (!isOpen && tripViewId !== null && trips[tripViewId]) {
      setHasDestinations(trips[tripViewId].dests.count > 0);
    }
  };

  //function to scroll up to the dests grid
  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    setIsDestGridInView(true);
  };

  // function to scroll to a dest section by clicking at its card in the dests grid
  const scrollToSection = useCallback(
    (id) => {
      if (id === "top") {
        scrollToTop();
        return;
      }

      sectionsRef.current[id]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
    [sectionsRef]
  );

  //function to conditionally switch between the app two main sections, trips and dests
  const enterDestView = (id) => {
    setTripViewId(id);
    setIsDestViewOpen(true);
    setIsDestGridInView(true);

    if (trips[id]) {
      setHasDestinations(trips[id].dests.count > 0);
    }
  };

  //function to provide content for the app two main sections, trips and dests
  const renderContent = () => {
    if (isDestViewOpen && tripViewId !== null && trips[tripViewId]) {
      if (!hasDestinations) {
        // displays no dests available
        return (
          <>
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, 50%)",
                width: "210px",
              }}
            >
              <NoItemsCard w="auto" h="auto">
                No Destinations planned
              </NoItemsCard>
            </div>
            {trips[tripViewId].todo !== null && (
              <div className="todo-container">
                <Todo id={tripViewId} />
              </div>
            )}
          </>
        );
      } else {
        // displays dests for trips, dests menu
        return (
          <>
            <div
              className="trip-dest-container"
              style={{ position: "relative" }}
            >
              <div
                className="trip-dest-title"
                style={trips[tripViewId].todo === null ? { left: "50%" } : {}}
              >
                {trips[tripViewId].title}
              </div>
              <DestGrid tId={tripViewId} ref={dGridRef} id="dGrid">
                {Object.entries(trips[tripViewId].dests.dests).map(
                  ([id, dest]) => (
                    <DestCard
                      key={id}
                      id={id}
                      city={dest.city}
                      dDate={format(dest.date, "do 'of' MMM'\n'yyyy")}
                      hotel={dest.hotel}
                      image={dest.image}
                      clickFunction={() => scrollToSection(id)}
                      deleteDest={() => removeDest(tripViewId, id)}
                      editDest={() => {
                        setIsPopupOpen(true);
                        setHoldEditTrip(id);
                      }}
                    />
                  )
                )}
              </DestGrid>
              {Object.entries(trips[tripViewId].dests.dests).map(([id]) => (
                <DestSection
                  ref={(el) => (sectionsRef.current[id] = el)}
                  key={id}
                  tId={tripViewId}
                  dId={id}
                />
              ))}
            </div>
            {trips[tripViewId].todo !== null && (
              <div className="todo-container">
                <Todo id={tripViewId} />
              </div>
            )}
          </>
        );
      }
    } else {
      if (isTripsEmpty()) {
        // shows no trips available
        return (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <NoItemsCard w="auto" h="auto">
              No planned trips
            </NoItemsCard>
          </div>
        );
      } else {
        // the trips grid, the trips display menu
        return (
          <TripGrid>
            {Object.entries(trips).map(([id, trip]) => (
              <TripCard
                key={id}
                id={id}
                title={trip.title}
                tDate={trip.date}
                todo={trip.todo}
                dests={trip.dests}
                clickFunction={() => enterDestView(id)}
                deleteTrip={() => removeTrip(id)}
                editTrip={() => {
                  setIsPopupOpen(true);
                  setHoldEditTrip(id);
                }}
              />
            ))}
          </TripGrid>
        );
      }
    }
  };

  //function to get main button text
  const getButtonText = () => {
    if (isDestViewOpen && hasDestinations && !isDestGridInView) {
      return "Back to top";
    } else if (isDestViewOpen) {
      return "New Destination";
    } else {
      return "New Trip";
    }
  };

  //function to switch main button icon
  const getButtonIcon = () => {
    if (isDestViewOpen && hasDestinations && !isDestGridInView) {
      return upArrowSvg;
    }
    return plusSvg;
  };

  // function to handle main button or new trip/dest / go up button
  const handleButtonClick = () => {
    if (isDestViewOpen && hasDestinations && !isDestGridInView) {
      scrollToTop();
    } else {
      setIsPopupOpen(true);
    }
  };

  return (
    <div className="app-outer-container">
      {isPopupOpen && (
        <Popup
          id={tripViewId}
          destMode={isDestViewOpen}
          closePopup={handlePopupClose}
          editObject={holdEditTrip}
          setEditObject={setHoldEditTrip}
        />
      )}
      <NavHeader>
        <div
          style={{ marginLeft: "4vw", minWidth: "142px" }}
          className="nav-buttons-minwidth"
        >
          {isDestViewOpen && (
            <Buttons
              w="auto"
              h="auto"
              clickFunction={() => {
                setIsDestViewOpen(false);
              }}
            >
              <img
                width={"16px"}
                height={"16px"}
                src={backArrowSvg}
                style={{ marginRight: "8px" }}
              />
              <div className="back-button-text"> Back to trips</div>
            </Buttons>
          )}
        </div>
        <div>
          <Buttons w="auto" h="auto" clickFunction={handleButtonClick}>
            <img
              width={"16px"}
              height={"16px"}
              src={getButtonIcon()}
              style={{ marginRight: "8px" }}
            />
            <div style={{ textWrap: "nowrap" }}>{getButtonText()}</div>
          </Buttons>
        </div>
        <div
          style={{ minWidth: "142px", marginRight: "4vw" }}
          className="nav-buttons-minwidth"
        ></div>
      </NavHeader>
      <div
        ref={containerRef}
        className="app-inner-container"
        style={isDestViewOpen ? { alignItems: "flex-start" } : {}}
      >
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
