import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import styles from "./_.module.css";
import Loader from "../../Loader";
import { FiPlus, FiSearch, FiEdit3, FiTrash2 } from "react-icons/fi";
import { useHistory, Link } from "react-router-dom";

const Articles = () => {
  const [type, setType] = useState("posted");
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState();

  const getArticles = () => {
    setLoading(true);
    axios
      .get(`/articles/`)
      .then((result) => {
        setArticles(result.data.articles);
      })
      .catch((err) => console.log(err.response.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getArticles();
  },[]);


  return (
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.searchContainer}>
            <input className={styles.search} placeholder="Хайх..."></input>
            <button className={styles.button}>
              <FiSearch />
            </button>
          </div>
          <div className={styles.buttonContainer}>
            <div
              className={styles.typeButton}
              style={{ border: type === "posted" ? "1px solid #949BE3" : "" }}
              onClick={setType.bind(this, "posted")}
            >
              Posted
            </div>
            <div
              className={styles.typeButton}
              style={{ border: type === "saved" ? "1px solid #949BE3" : "" }}
              onClick={setType.bind(this, "saved")}
            >
              Saved
            </div>
            <div
              className={styles.typeButton}
              style={{ border: type === "deleted" ? "1px solid #949BE3" : "" }}
              onClick={setType.bind(this, "deleted")}
            >
              Deleted
            </div>
          </div>
        </div>
        <div className={styles.listContainer}>
          <ul className={styles.list}>
            {!loading &&
              articles.map((item) => (
                <li className={styles.zaal} key={item.articleId}>
                  <p className={styles.zaalTitle}>{item.title}</p>
                  <div className={styles.group}>
                    <button
                      className={styles.button}
                    >
                      <FiEdit3 />
                    </button>
                    <button
                      className={styles.button}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </li>
              ))}
            {loading && <Loader />}
          </ul>
        </div>
        {!loading && (
          <button
            className={styles.addZaalButton}
          >
            <FiPlus className={styles.icon} />
          </button>
        )}
        {loading && (
          <button
            className={styles.addZaalButton}
          >
            <Loader />
          </button>
        )}
      </div>
  );
};

export default Articles;
