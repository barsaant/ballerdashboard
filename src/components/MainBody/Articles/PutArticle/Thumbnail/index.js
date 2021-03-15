import React, { useState, useEffect } from "react";
import styles from "./_.module.css";
import { FiPlus, FiX } from "react-icons/fi";
import config from "../../../../../config/config.json";

const Thumbnail = (props) => {
  const [image, setImage] = useState(null);
  useEffect(() => {
    setImage(props.current);
  }, [props.current]);

  return (
    <div className={styles.field}>
      <h1 className={styles.label}>Нүүр Зураг</h1>
      <div className={styles.container}>
        {image === null && (
          <button
            className={styles.button}
            onClick={props.open.bind(this, true)}
          >
            <FiPlus />
          </button>
        )}
        {image !== null && (
          <div className={styles.imgContainer}>
            <img
              alt="Нүүр зураг"
              className={styles.image}
              src={`${config.FILE_SERVER_URL}/${image}`}
            />
            <button className={styles.closeBtn} onClick={props.change.bind(this,null)}>
              <FiX />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Thumbnail;
