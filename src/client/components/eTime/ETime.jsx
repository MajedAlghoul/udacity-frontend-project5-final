import GlassCard from "../glassCard/GlassCard";
import { useTrips } from "../../hooks/useTrips";
function ETime({ tId, dId }) {
  const { trips } = useTrips();
  const timeRemaining = Math.ceil(
    (new Date(trips[tId].dests.dests[dId].date) - new Date()) /
      (1000 * 60 * 60 * 24)
  );

  const getColor = () => {
    if (timeRemaining < 0) {
      return "#FF2C2F";
    } else if (timeRemaining >= 1) {
      return "#FFD900";
    } else {
      return "#83FF49";
    }
  };
  return (
    <div
      style={{
        width: "300px",
        height: "60px",
        minWidth: "260px",
        maxWidth: "360px",
      }}
    >
      <GlassCard h={"100%"} w={"100%"} p="8px 8px 8px 32px">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
          }}
        >
          <div style={{ fontSize: "20px" }}>
            {timeRemaining < 0
              ? `${Math.abs(timeRemaining)} days ago`
              : timeRemaining === 0
              ? "Today"
              : `In ${timeRemaining} days`}
          </div>
          <div
            style={{
              backgroundColor: getColor(),
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              marginLeft: "16px",
              marginRight: "8px",
            }}
          ></div>
        </div>
      </GlassCard>
    </div>
  );
}

export default ETime;
