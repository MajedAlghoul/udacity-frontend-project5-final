import styles from "./Weather.module.scss";

import GlassCard from "../glassCard/GlassCard";
function Weather() {
  return (
    <GlassCard h={"300px"} w={"400px"} p="8px 8px">
      Weather
    </GlassCard>
  );
}

export default Weather;
