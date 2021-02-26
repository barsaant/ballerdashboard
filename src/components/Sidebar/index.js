import React from "react";
import styles from "./_.module.css";
import Zaal from "../Zaal";

const Sidebar = (props) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}></div>
      <Zaal />
    </div>
  );
};

export default Sidebar;
