import React from "react";
import { FiSearch } from "react-icons/fi";
import styles from "../Style/_.module.css";

const SidebarSearch = (props) => {
  const handleSearch = (e) => {
    if (e.target.value !== "") {
      if(props.level==='category') {
        props.search(props.origin.filter((item) => item.categoryName.toLowerCase().includes(e.target.value.toLowerCase())));
      } else if (props.level==='tag') {
        props.search(props.origin.filter((item) => item.tagName.toLowerCase().includes(e.target.value.toLowerCase())));
      }
    } else {
      props.search(props.origin);
    }
  };

  return (
    <div className={styles.headContainer}>
      <input
        className={styles.input}
        placeholder={"Хайх..."}
        onChange={handleSearch}
      />
      <button className={styles.button}><FiSearch /></button>
    </div>
  );
};

export default SidebarSearch;
