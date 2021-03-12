import React, { useState, useEffect } from "react";
import { useHistory, useParams, BrowserRouter } from "react-router-dom";
import styles from "./_.module.css";
import axios from "../../../../axios";
import Loader from "../../../Loader";
import Title from "./Title";
import Category from "./Category";
import Tag from "./Tag";
import Status from "./Status";
import Thumbnail from "./Thumbnail";
import Media from "../../Media";
import { FiX } from "react-icons/fi";

const PutArticle = (props) => {
  const [media, setMedia] = useState(false);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState([]);
  const [category, setCategory] = useState([]);
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const history = useHistory();
  const params = useParams();

  const handleImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };
  const getSporthall = () => {
    setLoading(true);
    axios
      .get(`/articles/`)
      .then((result) => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getSporthall();
  }, []);

  const Save = () => {
    axios
      .put(`/articles/${params.id}`, {
        title: title,
        tagArticles: tag,
        categoryArticles: category,
        status: status,
      })
      .then((result) => {})
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div className={styles.mainContainer}>
      <BrowserRouter>
        {!loading && (
          <div className={styles.container}>
            {media && (
              <div className={styles.mediaContainer}>
                <Media notify={props.notify} changeSection={props.changeSection} type={'articles'} id={params.id}/>
                <button className={styles.closeBtn}><FiX className={styles.icon} onClick={setMedia.bind(this,false)}/></button>
              </div>
            )}
            <Title current={title} change={setTitle} />
            <Thumbnail current={image} change={setImage} open={setMedia} />
            <Category current={tag} change={setCategory} />
            <Tag current={tag} change={setTag} />
            <Status current={status} change={setStatus} />
            <div className={styles.field}>
              <button className={styles.button} onClick={Save}>
                Хадгалах
              </button>
            </div>
          </div>
        )}
        {loading && <Loader />}
      </BrowserRouter>
    </div>
  );
};

export default PutArticle;
