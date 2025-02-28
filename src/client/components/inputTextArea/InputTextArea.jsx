import styles from "./InputTextArea.module.scss";

// eslint-disable-next-line react/prop-types
function InputTextArea({ reff, w, h, p = "6px 20px", eValue, children }) {
  return (
    <div
      style={{ width: w, height: h, padding: p }}
      className={styles["glass-card-outer-container"]}
    >
      <textarea
        className={styles["input-field-input"]}
        type="text"
        placeholder={children}
        ref={reff}
        defaultValue={eValue !== null ? eValue : ""}
      />
    </div>
  );
}

export default InputTextArea;
