import React from "react";
import { FiSearch } from "react-icons/fi";
import styles from "../Style/_.module.css";

const SidebarSearch = (props) => {

  return (
    <div className={styles.headContainer}>
      <input
        className={styles.input}
        placeholder={"Search something..."}
      />
      <button className={styles.button}><FiSearch /></button>
    </div>
  );
};

export default SidebarSearch;
