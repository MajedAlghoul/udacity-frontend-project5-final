import GlassCard from "../glassCard/GlassCard";
import { useTrips } from "../../hooks/useTrips";
import { format } from "date-fns";

function getDaySuffix(day) {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

/*
weather component that displays dest weather
*/
function Weather({ tId, dId }) {
  const { trips } = useTrips();
  const weather = trips[tId]?.dests?.dests[dId]?.weather || {};
  return (
    <div
      style={{
        width: "300px",
        height: "auto",
        boxSizing: "border-box",
      }}
    >
      <GlassCard h={"100%"} w={"300px"} p="18px 18px">
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <div>
            <div style={{ textWrap: "nowrap", overflow: "hidden" }}>
              {trips[tId].dests.dests[dId].city.split(",")[0]}
            </div>
            <div style={{ fontSize: "24px" }}>{trips[tId].title}</div>
          </div>
          {Object.entries(weather).length === 0 ? (
            <div
              style={{
                fontSize: "16px",
                textAlign: "center",
                backgroundColor: "#ffffff20",
                borderRadius: "14px",
                padding: "10px",
                height: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Weather data will appear by the trip's week
            </div>
          ) : (
            <div>
              <div style={{ fontSize: "24px", marginBottom: "20px" }}>
                {format(trips[tId].dests.dests[dId].date, "MMMM 'the' ")}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  maxWidth: "310px",
                  flexWrap: "wrap",
                  gap: "40px",
                  rowGap: "20px",
                  fontSize: "16px",
                }}
              >
                {Object.entries(weather).map(([date, weather]) => {
                  const day = Number(format(date, "d"));
                  return (
                    <div
                      key={date}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      {format(new Date(date), `d'${getDaySuffix(day)}'`)}
                      <img
                        src={weather.icon}
                        title={weather.description}
                        style={{ width: "32px", height: "32px" }}
                      />
                      <div>{Math.floor(weather.temp) + "°"}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
}

export default Weather;
