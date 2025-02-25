import { use, useEffect, useRef, useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import GlassCard from "../components/glassCard/GlassCard";
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
import { set } from "lodash";

function App() {
  const [content, setContent] = useState(null);
  const { trips, isTripsEmpty } = useTrips();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDestViewOpen, setIsDestViewOpen] = useState(false);
  const [tripViewId, setTripViewId] = useState(null);
  const [isDestGridInView, setIsDestGridInView] = useState(true);
  const sectionsRef = useRef({});
  const dGridRef = useRef(null);
  const [dGridRefReady, setDGridRefReady] = useState(false);

  const scrollToSection = (id) => {
    sectionsRef.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    dGridRef.current.scrollTop = 0;
  };

  const enterDestView = (id) => {
    setTripViewId(id);
    setIsDestViewOpen(true);
  };

  useEffect(() => {
    if (isDestViewOpen) {
      if (trips[tripViewId].dests.count === 0) {
        setContent(
          <NoItemsCard w="auto" h="auto">
            No Destinations planned
          </NoItemsCard>
        );
      } else {
        setContent(() => (
          <>
            <div className="trip-dest-container">
              <div className="trip-dest-title">{trips[tripViewId].title}</div>
              <DestGrid ref={dGridRef}>
                {Object.entries(trips[tripViewId].dests.dests).map(
                  ([id, dest]) => {
                    return (
                      <DestCard
                        key={id}
                        id={id}
                        city={dest.city}
                        dDate={format(dest.date, "do 'of' MMM'\n'yyyy")}
                        hotel={dest.hotel}
                        image={dest.image}
                        clickFunction={() => scrollToSection(id)}
                      ></DestCard>
                    );
                  }
                )}
              </DestGrid>
            </div>
            {Object.entries(trips[tripViewId].dests.dests).map(([id]) => {
              return (
                <DestSection
                  ref={(el) => (sectionsRef.current[id] = el)}
                  key={id}
                  tId={tripViewId}
                  dId={id}
                ></DestSection>
              );
            })}
            <div className="todo-container">
              <Todo />
            </div>
          </>
        ));
        setDGridRefReady(dGridRef.current);
        sectionsRef.current["dGrid"] = dGridRef.current;
      }
    } else {
      if (isTripsEmpty()) {
        setContent(
          <NoItemsCard w="auto" h="auto">
            No planned trips
          </NoItemsCard>
        );
      } else {
        setContent(() => (
          <TripGrid>
            {Object.entries(trips).map(([id, trip]) => {
              return (
                <TripCard
                  key={id}
                  id={id}
                  title={trip.title}
                  tDate={format(trip.date, "do 'of' MMM'\n'yyyy")}
                  todo={trip.todo}
                  dests={trip.dests}
                  clickFunction={() => enterDestView(id)}
                ></TripCard>
              );
            })}
          </TripGrid>
        ));
      }
    }
  }, [isDestViewOpen, isTripsEmpty, tripViewId, trips, dGridRefReady]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDestGridInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentDGridRef = dGridRefReady;

    if (currentDGridRef) {
      observer.observe(currentDGridRef);
    }

    return () => {
      if (currentDGridRef) {
        observer.unobserve(currentDGridRef);
      }
    };
  }, [dGridRefReady, isDestGridInView, isDestViewOpen]);

  return (
    <div className="app-outer-container">
      {isPopupOpen && (
        <Popup
          id={tripViewId}
          destMode={isDestViewOpen}
          closePopup={setIsPopupOpen}
        ></Popup>
      )}
      <NavHeader>
        <div style={{ minWidth: "142px", marginLeft: "4vw" }}>
          {isDestViewOpen && (
            <Buttons
              w="auto"
              h="auto"
              clickFunction={() => {
                setIsDestViewOpen(false);
                setIsDestGridInView(true);
              }}
            >
              <img
                width={"16px"}
                height={"16px"}
                src={backArrowSvg}
                style={{
                  marginRight: "8px",
                }}
              />
              Back to trips
            </Buttons>
          )}
        </div>
        <div>
          <Buttons
            w="auto"
            h="auto"
            clickFunction={() => {
              if (isDestViewOpen && !isDestGridInView) {
                scrollToSection("dGrid");
              } else {
                setIsPopupOpen(true);
              }
            }}
          >
            <img
              width={"16px"}
              height={"16px"}
              src={isDestViewOpen && !isDestGridInView ? upArrowSvg : plusSvg}
              style={{
                marginRight: "8px",
              }}
            />
            {isDestViewOpen && !isDestGridInView
              ? "Back to top"
              : isDestViewOpen
              ? "New Destination"
              : "New Trip"}
          </Buttons>
        </div>
        <div style={{ minWidth: "142px", marginRight: "4vw" }}></div>
      </NavHeader>
      <div
        className="app-inner-container"
        style={isDestViewOpen ? { alignItems: "flex-start" } : {}}
      >
        {content}
      </div>
    </div>
  );
}

export default App;
