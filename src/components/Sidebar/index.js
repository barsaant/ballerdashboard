import React from "react";
import styles from "./_.module.css";
import Zaal from "../Zaal";
import Logout from "../Logout";

const Sidebar = (props) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}></div>
      <Zaal notify={props.notify} />
      <div><Logout /></div>
    </div>
  );
};

export default Sidebar;
