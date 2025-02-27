import styles from "./Hotel.module.scss";

import GlassCard from "../glassCard/GlassCard";
import { useTrips } from "../../hooks/useTrips";
function Hotel({ tId, dId }) {
  const { trips } = useTrips();
  return (
    <div style={{ width: "260px", height: "100%" }}>
      <GlassCard h={"100%"} w={"100%"} p="16px 24px">
        <div>
          <div style={{ fontSize: "24px" }}>Hotel Information</div>
          <div
            style={{ fontSize: "20px", marginTop: "8px", color: "#ffffffee" }}
          >
            {trips[tId].dests.dests[dId].hotel}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

export default Hotel;
