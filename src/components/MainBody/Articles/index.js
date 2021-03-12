import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import styles from "./_.module.css";
import Loader from "../../Loader";
import { FiPlus, FiSearch, FiEdit3, FiTrash2 } from "react-icons/fi";
import { useHistory, BrowserRouter } from "react-router-dom";

const Articles = (props) => {
  const [type, setType] = useState("posted");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleEditButton = (id) => {
    setLoading(true);
    history.push(`/articles/${id}`);
  };

  useEffect(() => {
    props.changeSection();
    getArticles();
  }, []);

  const history = useHistory();

  const handleAddButton = () => {
    setLoading(true);
    axios
      .post(`/articles`)
      .then((result) => {
        history.push(`/articles/${result.data.article.articleId}`);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  const moveDelete = (id) => {
    setLoading(true);
    axios
      .put(`/articles/${id}`, {
        status: "deleted",
      })
      .finally(() => setLoading(false));
  };

  const deleteHall = (id) => {
    setLoading(true);
    axios
      .delete(`/articles/${id}`)
      .then((result) => {
        const del = articles.articles.filter((zaal) => id !== zaal.hallId);
        setArticles(del);
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = (hallId) => {
    if (type.deleted === false) {
      moveDelete(hallId);
    } else {
      deleteHall(hallId);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <BrowserRouter>
          <div className={styles.head}>
            <div className={styles.searchContainer}>
              <input className={styles.search} placeholder='Хайх...'></input>
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
                style={{
                  border: type === "deleted" ? "1px solid #949BE3" : "",
                }}
                onClick={setType.bind(this, "deleted")}
              >
                Deleted
              </div>
            </div>
          </div>
          <div className={styles.listContainer}>
            {!loading && (
              <ul className={styles.list}>
                {articles.map((item) => (
                  <li className={styles.item} key={item.articleId}>
                    <p className={styles.title}>{item.title}</p>
                    <div className={styles.group}>
                      <button
                        className={styles.button}
                        onClick={() => handleEditButton(item.articleId)}
                      >
                        <FiEdit3 />
                      </button>
                      <button
                        className={styles.button}
                        onClick={() => handleDelete(item.articleId)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </li>
                ))}
                <button
                  className={styles.addButton}
                  onClick={() => handleAddButton()}
                >
                  <FiPlus className={styles.icon} />
                </button>
              </ul>
            )}
            {loading && <Loader />}
          </div>
        </BrowserRouter>
      </div>
    </>
  );
};

export default Articles;
