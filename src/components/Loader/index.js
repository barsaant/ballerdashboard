import React from "react";
import styles from "./_.module.css";
import { FiLoader } from "react-icons/fi";

const Loader = () => {
  return (
    <div className={styles.loading}>
      <FiLoader className={styles.spinner} />
    </div>
  );
};

export default Loader;
