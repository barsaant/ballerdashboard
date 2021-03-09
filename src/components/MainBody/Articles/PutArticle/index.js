import React, { useState, useEffect } from "react";
import { useHistory, useParams, BrowserRouter } from "react-router-dom";
import axios from "../../../../axios";
import Loader from "../../../Loader";
import Title from "./Title";
import Status from "./Status";
import styles from "./_.module.css";

const PutArticle = () => {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [article, setArticle] = useState("");
  const [status, setStatus] = useState("");

  const params = useParams();

  const getArticle = () => {
    setLoading(true);
    axios
      .get(`/articles/${params.id}`)
      .then((result) => {
        setTitle(result.data.article.title);
        setArticle(result.data.artitle.article);
        setStatus(result.data.article.status);
        setCategories(result.data.article.categoryArticles);
        setTags(result.data.article.tagArticles);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getArticle();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <BrowserRouter>
        {!loading && (
          <div className={styles.container}>
            <Title current={title} change={setTitle} />
            <Status current={status} change={setStatus} />
            <div className={styles.field}>
              <button className={styles.button}>Хадгалах</button>
            </div>
          </div>
        )}
        {loading && <Loader />}
      </BrowserRouter>
    </div>
  );
};

export default PutArticle;
