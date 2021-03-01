import React from "react";
import styles from "./_.module.css";
import { FiLogOut } from "react-icons/fi";

const Logout = (props) => {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={props.back}><FiLogOut className={styles.icon} />LOG OUT</button>
    </div>
  );
};

export default Logout;
