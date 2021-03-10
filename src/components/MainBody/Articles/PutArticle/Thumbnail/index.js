import React, { useState, useEffect } from "react";
import styles from "./_.module.css";
import { FiPlus } from "react-icons/fi";

const Thumbnail = (props) => {
  const [image, setImage] = useState(null);
  const handleImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };
  useEffect(() => {
    props.change(image);
  }, [image]);

  return (
    <div className={styles.field}>
      <h1 className={styles.label}>Нүүр Зураг</h1>
      <div className={styles.imageContainer}>
        {image === null && <button className={styles.button} onClick={props.open.bind(this,true)}><FiPlus/></button>}
        {image !== null && (
          <img alt="Нүүр зураг" className={styles.image} src={image} />
        )}
      </div>
    </div>
  );
};

export default Thumbnail;
