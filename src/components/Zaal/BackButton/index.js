import React from "react";
import styles from "./_.module.css";
import { FiArrowLeft } from "react-icons/fi";

const BackButton = (props) => {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={props.back}><FiArrowLeft /></button>
    </div>
  );
};

export default BackButton;
