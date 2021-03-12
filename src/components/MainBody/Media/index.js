import React, { useState, useEffect, useRef } from "react";
import styles from "./_.module.css";
import axios from "../../../axios";
import { FiCopy, FiEdit3, FiPlus, FiTrash2 } from "react-icons/fi";
import Loader from "../../Loader";
import config from "../../../config/config.json";
const Media = (props) => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [progress, setProgess] = useState(0);
  const [selected, setSelected] = useState({});
  const [type, setType] = useState(props.type);
  const input = useRef(null);


  const copy = () => {
    input.current.select();
    document.execCommand("copy");
  }

  const deleteImage = (id) => {
    setLoading(true);
    axios
      .delete(`/medias/${id}`)
      .then((result) => {
        props.notify({
          success: true,
          message: result.data.message,
        });
        setImages(images.filter((item) => item.mediaId !== selected.mediaId));
      })
      .catch((err) => {
        props.notify({
          success: false,
          message: err.data.message,
        });
      })
      .finally(() => setLoading(false));
  };

  const addImage = (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(`/${type}`, formData, {
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
        getAllImages();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  const getSporthallImages = () => {
    setLoading(true);
    axios
      .get(`/sporthalls/${props.id}/upload`)
      .then((result) => {
        setImages(result.data.sporthallsMedia);
      })
      .finally(() => setLoading(false));
  };
  const getArticleImages = () => {
    setLoading(true);
    axios
      .get(`/articles/${props.id}/upload`)
      .then((result) => {
        setImages(result.data.articlesMedia);
      })
      .finally(() => setLoading(false));
  };
  const getAllImages = () => {
    setLoading(true);
    axios
      .get(`/medias?limit=100`)
      .then((result) => {
        console.log(result);
        setImages(result.data.mediaLibraries);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    props.changeSection();
    if (type === "all") {
      getAllImages();
    } else if (type === "sporthalls") {
      getSporthallImages();
    } else if (type === "articles") {
      getArticleImages();
    }
  }, [type]);

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <button className={styles.button} onClick={setType.bind(this,'all')}>Бүгд</button>
        <button className={styles.button} onClick={setType.bind(this, 'articles')}>ID</button>
      </div>
      <div className={styles.group}>
        <div className={styles.listContainer}>
          {!loading && (
            <ul className={styles.list}>
              {images.map((item) => (
                <li
                  style={{
                    border:
                      selected.mediaId === item.mediaId
                        ? "1px solid #949be3"
                        : "",
                  }}
                  className={styles.item}
                  key={item.mediaId}
                  onClick={setSelected.bind(this, item)}
                >
                  <img
                    className={styles.image}
                    src={`http://localhost:7259/uploads/${item.mediaPath}`}
                    alt={item.mediaId}
                  />
                </li>
              ))}
              <input
                id="upload"
                type="file"
                style={{ display: "none" }}
                onChange={addImage}
              ></input>
              <label htmlFor="upload" className={styles.addButton}>
                <FiPlus className={styles.icon} />
              </label>
            </ul>
          )}
          {loading && <Loader />}
        </div>
        <div className={styles.preview}>
          {Object.keys(selected).length === 0 && (
            <div className={styles.emptyBox}>Preview</div>
          )}
          {Object.keys(selected).length !== 0 && (
            <div className={styles.imageContainer}>
              <img
                src={`http://localhost:7259/uploads/${selected.mediaPath}`}
                alt={selected.mediaId}
              />
            </div>
          )}
          <div className={styles.buttonContainer}>
            <button className={styles.button}>
              <FiEdit3 className={styles.icon} /> Edit
            </button>
            <button className={styles.button}>
              <FiTrash2
                className={styles.icon}
                onClick={deleteImage.bind(this, selected.mediaId)}
              />{" "}
              Delete
            </button>
          </div>
          <div className={styles.pathContainer}>
            <input
              className={styles.input}
              readOnly
              value={`${config.FILE_SERVER_URL}${selected.mediaPath}`}
              ref={input}
            />
            <button className={styles.copy} onClick={copy}>
              <FiCopy className={styles.icon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Media;
