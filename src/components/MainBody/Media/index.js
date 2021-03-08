import React, { useState, useEffect } from "react";
import styles from "./_.module.css";
import axios from "../../../axios";
import { FiPlus, FiSearch, FiEdit3, FiTrash2 } from "react-icons/fi";
import Loader from "../../Loader";
import { Link } from "react-router-dom";

const Media = () => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const getImages = () => {
    axios
      .get(`/medias`)
      .then((result) => {
        setImages(result.data.mediaLibraries);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    getImages();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <button className={styles.button}>Бүгд</button>
        <button className={styles.button}>ID</button>
      </div>
      <div className={styles.listContainer}>
        {!loading && (
          <ul className={styles.list}>
            <li className={styles.item}></li>
            {images.map((item) => (
              <li className={styles.item} key={item}></li>
            ))}
            <button className={styles.addButton}>
              <FiPlus className={styles.icon} />
            </button>
          </ul>
        )}
        {loading && <Loader />}
      </div>
    </div>
  );
};

export default Media;
