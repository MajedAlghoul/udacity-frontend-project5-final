import GlassCard from "../glassCard/GlassCard";
import styles from "./NoItemsCard.module.scss";

// eslint-disable-next-line react/prop-types
function NoItemsCard({ w = "200px", h = "200px", children }) {
  return (
    <GlassCard h={h} w={w}>
      <div style={{ fontSize: "14px", color: "#ffffffcc" }}>{children}</div>
    </GlassCard>
  );
}

export default NoItemsCard;
