import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config/config.json";
import styles from "./_.module.css";
import { FiX, FiEdit3, FiArrowLeft, FiSearch, FiPlus, FiLoader } from "react-icons/fi";

const Tags = (props) => {
  const [newTag, setNewTag] = useState("");
  const [tag, setTag] = useState({
    tags: [],
    error: null,
    loading: true,
    message: null,
  });

  const handleChange = (e) => {
    if (e.target.value !== "") {
      setNewTag(e.target.value);
    }
  };

  const getTags = () => {
    axios
      .get(`${config.SERVER_URL}/tagshalls`)
      .then((result) => {
        setTag({ tags: result.data.tags, loading: false });
      })
      .catch((err) => console.log(err.response.data));
  };

  useEffect(() => {
    getTags();
  }, []);

  const postTag = () => {
    setTag({ loading: true });
    axios
      .post(`${config.SERVER_URL}/tagshalls`, {
        tagName: newTag,
      })
      .then((result) => {
        console.log(result.data.message);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => getTags());
  };

  const handleSubmit = (e) => {
    postTag();
  };

  const deleteTag = (tagId) => {
    setTag({ loading: true });
    axios
      .delete(`${config.SERVER_URL}/tagshalls/${tagId}`)
      .then((result) => alert(result.data.message))
      .catch((err) => alert(err.message))
      .finally(() => getTags());
  };

  if (!tag.loading) {
    return (
      <div className={styles.container}>
        <div className={styles.headBar}>
          <button className={styles.button} onClick={props.prev}>
            {" "}
            <FiArrowLeft />{" "}
          </button>
          <button className={styles.button}>
            {" "}
            <FiSearch />{" "}
          </button>
        </div>
        <div className={styles.add}>
          <input className={styles.input} onChange={handleChange} />
          <button className={styles.button} onClick={handleSubmit}>
            <FiPlus />
          </button>
        </div>
        <ul className={styles.list}>
          {tag.tags.map((item) => (
            <li className={styles.items} key={item.tagId}>
              <h5
                className={styles.h5}
                onClick={props.next.bind(this, item.tagId)}
              >
                {item.tagName}
              </h5>
              <div className={styles.group}>
                <button className={styles.button}>
                  <FiEdit3 />
                </button>
                <button
                  className={styles.button}
                  onClick={() => deleteTag(item.tagId)}
                >
                  <FiX />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.loading}>
        <FiLoader className={styles.spinner} />
      </div>
    </div>
  );
};

export default Tags;
