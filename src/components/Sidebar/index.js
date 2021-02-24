import React from "react";
import styles from "./_.module.css";
import Locations from "../Locations";
import Tags from "../Tags";

const Sidebar = (props) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}></div>
      <Locations />
      <Tags />
    </div>
  );
};

export default Sidebar;
