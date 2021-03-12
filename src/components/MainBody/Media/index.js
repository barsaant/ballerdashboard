import React, { useState, useEffect, useRef } from "react";
import styles from "./_.module.css";
import axios from "../../../axios";
import { FiPlus } from "react-icons/fi";
import Loader from "../../Loader";

const Media = (props) => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [progress, setProgess] = useState(0);

  const addImage = (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(`/medias`, formData, {
        onUploadProgress: (ProgressEvent) => {
          let progress =
            Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
            "%";
          setProgess(progress);
        },
      })
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

  console.log(progress);

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
              <li className={styles.item} key={item}>
                <img
                  src={`http://localhost:7259/uploads/${item.mediaPath}`}
                ></img>
              </li>
            ))}
            <input
              id='upload'
              type='file'
              style={{ display: "none" }}
              onChange={addImage}
            ></input>
            <label for='upload' className={styles.addButton}>
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
