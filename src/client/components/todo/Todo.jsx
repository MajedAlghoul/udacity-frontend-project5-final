import { useTrips } from "../../hooks/useTrips";
import GlassCard from "../glassCard/GlassCard";
import styles from "./Todo.module.scss";
import { useState, useEffect } from "react";
import trashSvg from "../../assets/trash.svg";
function Todo({ id }) {
  const { trips, removeTodo, toggleTodo, updateTodo } = useTrips();
  const [editableContent, setEditableContent] = useState({});
  const [isEditing, setIsEditing] = useState({});

  useEffect(() => {
    const initialContent = Object.entries(trips[id].todo.todos).reduce(
      (acc, [key, todo]) => {
        acc[key] = todo.title;
        return acc;
      },
      {}
    );
    setEditableContent(initialContent);
  }, [trips, id]);

  const handleContentChange = (key, content) => {
    setEditableContent((prev) => ({ ...prev, [key]: content }));
  };

  const handleBlur = (key) => {
    if (key !== "empty" || (key === "empty" && editableContent[key] !== "")) {
      updateTodo(id, key, editableContent[key]);
      setIsEditing((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleFocus = (key) => {
    setIsEditing((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <div className={styles["todo-container"]}>
      <GlassCard h={"70vh"} w={"300px"} p="20px 26px">
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "26px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>Todo</div>
            <div>{trips[id].todo.count}</div>
          </div>
          <div
            style={{ display: "flex", gap: "20px", flexDirection: "column" }}
          >
            {Object.entries(trips[id].todo.todos).map(([key, todo]) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <button
                    style={{
                      width: "14px",
                      height: "16px",
                      background: todo.done ? "white" : "none",
                      border: "2px solid white",
                      cursor: "pointer",
                      borderRadius: "4px",
                      visibility: key === "empty" ? "hidden" : "visible",
                    }}
                    onClick={() => toggleTodo(id, key)}
                  ></button>
                  {isEditing[key] || key === "empty" ? (
                    <input
                      type="text"
                      value={editableContent[key] || ""}
                      onChange={(e) => handleContentChange(key, e.target.value)}
                      onBlur={() => handleBlur(key)}
                      autoFocus
                      placeholder="Add a task"
                      className={styles["todo-input"]}
                      style={{
                        textDecoration: todo.done ? "line-through" : "none",
                      }}
                    />
                  ) : (
                    <div
                      onClick={() => handleFocus(key)}
                      style={{
                        textDecoration: todo.done ? "line-through" : "none",
                        border: "1px solid transparent",
                        padding: "2px",
                        cursor: "pointer",
                        width: "162px",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        boxSizing: "border-box",
                      }}
                    >
                      {editableContent[key]}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => removeTodo(id, key)}
                  style={{
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    visibility: key === "empty" ? "hidden" : "visible",
                  }}
                >
                  <img width="20px" height="20px" src={trashSvg} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

export default Todo;
