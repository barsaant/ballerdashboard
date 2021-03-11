import React, { useState, useEffect } from "react";
import styles from "./_.module.css";
import axios from "../../../axios";
import { FiPlus } from "react-icons/fi";
import Loader from "../../Loader";

const Media = (props) => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState([]);


  const addImage = (e) => {
    setLoading(true);
    axios
      .post(`/media`, e.target.files[0])
      .then((result) => {
        props.notify({
          success: true,
          message: result.data.message,
        });
        getImages();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
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
            <input
              id="upload"
              type="file"
              accept="image/png, image/jpeg"
              style={{ display: "none" }}
              onChange={addImage}
            ></input>
            <label for="upload" className={styles.addButton}>
              <FiPlus className={styles.icon} />
            </label>
          </ul>
        )}
        {loading && <Loader />}
      </div>
    </div>
  );
};

export default Media;
