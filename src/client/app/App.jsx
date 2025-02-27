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

function App() {
  const { trips, isTripsEmpty, removeTrip, editTrip } = useTrips();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDestViewOpen, setIsDestViewOpen] = useState(false);
  const [tripViewId, setTripViewId] = useState(null);
  const sectionsRef = useRef({});
  const dGridRef = useRef(null);
  const containerRef = useRef(null);
  const [isDestGridInView, setIsDestGridInView] = useState(true);
  const [hasDestinations, setHasDestinations] = useState(false);
  const [holdEditTrip, setHoldEditTrip] = useState(null);

  useEffect(() => {
    if (tripViewId !== null && trips[tripViewId]) {
      setHasDestinations(trips[tripViewId].dests.count > 0);
    }
  }, [trips, tripViewId]);

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

  const handlePopupClose = (isOpen) => {
    setIsPopupOpen(isOpen);

    if (!isOpen && tripViewId !== null && trips[tripViewId]) {
      setHasDestinations(trips[tripViewId].dests.count > 0);
    }
  };

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

  const enterDestView = (id) => {
    setTripViewId(id);
    setIsDestViewOpen(true);
    setIsDestGridInView(true);

    if (trips[id]) {
      setHasDestinations(trips[id].dests.count > 0);
    }
  };

  const renderContent = () => {
    if (isDestViewOpen && tripViewId !== null && trips[tripViewId]) {
      if (!hasDestinations) {
        return (
          <>
            <div
              style={{
                position: "absolute",
                left: "32vw",
                top: "32vh",
                transform: "translate(-50%, 200%)",
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
        return (
          <>
            <div
              className="trip-dest-container"
              style={{ position: "relative" }}
            >
              <div className="trip-dest-title">{trips[tripViewId].title}</div>
              <DestGrid ref={dGridRef} id="dGrid">
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

  const getButtonText = () => {
    if (isDestViewOpen && hasDestinations && !isDestGridInView) {
      return "Back to top";
    } else if (isDestViewOpen) {
      return "New Destination";
    } else {
      return "New Trip";
    }
  };

  const getButtonIcon = () => {
    if (isDestViewOpen && hasDestinations && !isDestGridInView) {
      return upArrowSvg;
    }
    return plusSvg;
  };

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
        <div style={{ minWidth: "142px", marginLeft: "4vw" }}>
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
              Back to trips
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
            {getButtonText()}
          </Buttons>
        </div>
        <div style={{ minWidth: "142px", marginRight: "4vw" }}></div>
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
