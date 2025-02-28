import styles from "./NavHeader.module.scss";

// eslint-disable-next-line react/prop-types
function NavHeader({ children }) {
  return <div className={styles["header-container"]}>{children}</div>;
}

export default NavHeader;
