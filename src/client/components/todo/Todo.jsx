import GlassCard from "../glassCard/GlassCard";
import styles from "./Todo.module.scss";

function Todo() {
  return (
    <div className={styles["todo-container"]}>
      <GlassCard h={"70vh"} w={"300px"} p="8px 8px">
        TODO
      </GlassCard>
    </div>
  );
}

export default Todo;
