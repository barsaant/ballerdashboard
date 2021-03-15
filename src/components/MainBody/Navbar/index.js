import React, { useState, useEffect } from "react";
import styles from "./_.module.css";

const Navbar = (props) => {
  const [status, setStatus] = useState(props.status);
  const handleStatus = (e) => {
    setStatus(e.target.value);
  };
  useEffect(() => {
    props.change(status);
  },[status]);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <button className={styles.button} onClick={props.open}>
          Медиа
        </button>
        <select
          className={styles.select}
          value={status}
          onChange={handleStatus}
        >
          <option value="saved">Хадгалах</option>
          <option value="posted">Нийтлэх</option>
          <option value="deleted">Устгах</option>
        </select>
        <button className={styles.button} onClick={props.save}>
          Хадгалах
        </button>
      </div>
    </div>
  );
};

export default Navbar;
