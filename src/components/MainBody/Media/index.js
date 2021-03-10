import React, { useState, useEffect } from "react";
import styles from "./_.module.css";
import axios from "../../../axios";
import { FiPlus } from "react-icons/fi";
import Loader from "../../Loader";

const Media = (props) => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [newImage,setNewImage] = useState(null);

  const handleImage = (e) => {
    setNewImage(e.target.files[0]);
  };

  const Save = () => {
    console.log('gaga');
  };
  const getImages = () => {
    axios
      .get(`/medias`)
      .then((result) => {
        setImages(result.data.mediaLibraries);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    props.changeSection("media");
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
            <button className={styles.addButton} onClick={Save}>
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
