import React, { useState, useEffect, useRef } from "react";
import styles from "./_.module.css";
import axiosUpload from "../../../axiosUpload";
import axios from "../../../axios";
import { FiCopy, FiEdit3, FiPlus, FiTrash2 } from "react-icons/fi";
import Loader from "../../Loader";
import config from "../../../config/config.json";
import axiosCancel from "axios";

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
  };

  const deleteImage = (id) => {
    setLoading(true);
    axiosUpload
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

  const addSpecificImage = (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    axiosUpload
      .post(`/${type}/${props.id}/upload`, formData, {
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

  const addImage = (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    axiosUpload
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

  const getSporthallImages = (source) => {
    setLoading(true);
    axios
      .get(`/sporthalls/${props.id}/upload`, {
        cancelToken: source.token,
      })
      .then((result) => {
        setImages(result.data.sporthallsMedia);
      })
      .catch(function (err) {
        if (axiosCancel.isCancel(err)) {
          console.log("req fail", err.message);
        } else {
          console.log(err);
        }
      })
      .finally(() => setLoading(false));
  };
  const getArticleImages = (source) => {
    setLoading(true);
    axios
      .get(`/articles/${props.id}/upload`, {
        cancelToken: source.token,
      })
      .then((result) => {
        setImages(result.data.articlesMedia);
      })
      .catch(function (err) {
        if (axiosCancel.isCancel(err)) {
          console.log("req fail", err.message);
        } else {
          console.log(err);
        }
      })
      .finally(() => setLoading(false));
  };
  const getAllImages = (source) => {
    setLoading(true);
    axios
      .get(`/medias?limit=100`, {
        cancelToken: source.token,
      })
      .then((result) => {
        setImages(result.data.mediaLibraries);
      })
      .catch(function (err) {
        if (axiosCancel.isCancel(err)) {
          console.log("req fail", err.message);
        } else {
          console.log(err);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    props.changeSection();
    const CancelToken = axiosCancel.CancelToken;
    const source = CancelToken.source();
    if (type === "medias") {
      getAllImages(source);
    } else if (type === "sporthalls") {
      getSporthallImages(source);
    } else if (type === "articles") {
      getArticleImages(source);
    }
  }, [type]);
  console.log(props.close);
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <button
          className={styles.button}
          onClick={setType.bind(this, "medias")}
        >
          Бүгд
        </button>
        <button
          className={styles.button}
          onClick={setType.bind(this, "articles")}
        >
          ID
        </button>
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
                  onDoubleClick={() => {
                    if (props.close !== undefined) {
                      props.setThumbnail(item.mediaPath);
                      props.close();
                    }
                  }}
                >
                  <img
                    className={styles.image}
                    src={`${config.FILE_SERVER_URL}/${item.mediaPath}`}
                    alt={item.mediaId}
                  />
                </li>
              ))}
              <input
                id="upload"
                type="file"
                style={{ display: "none" }}
                onChange={type === "medias" ? addImage : addSpecificImage}
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
                src={`${config.FILE_SERVER_URL}/${selected.mediaPath}`}
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
              value={`${config.FILE_SERVER_URL}/${selected.mediaPath}`}
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
