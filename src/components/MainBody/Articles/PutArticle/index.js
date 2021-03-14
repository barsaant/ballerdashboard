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
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FiX } from "react-icons/fi";
import { EditorConfig } from "./Editor";
import "./Editor/editor.css";
import Navbar from "../../Navbar";

const PutArticle = (props) => {
  const [media, setMedia] = useState(false);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState([]);
  const [category, setCategory] = useState([]);
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [article, setArticle] = useState(() => EditorState.createEmpty());
  const [articleData, setArticleData] = useState();
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

  const updateArticleData = (state) => {
    setArticle(state);
    const data = JSON.stringify(
      draftToHtml(convertToRaw(article.getCurrentContent()))
    );
    setArticleData(data);
  };

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
          <>
            <Navbar />
            <div className={styles.container}>
              {media && (
                <div className={styles.mediaContainer}>
                  <Media
                    notify={props.notify}
                    changeSection={props.changeSection}
                    type={"articles"}
                    id={params.id}
                  />
                  <button className={styles.closeBtn}>
                    <FiX
                      className={styles.icon}
                      onClick={setMedia.bind(this, false)}
                    />
                  </button>
                </div>
              )}
              <Title current={title} change={setTitle} />
              <Thumbnail current={image} change={setImage} open={setMedia} />
              <Category current={tag} change={setCategory} />
              <Tag current={tag} change={setTag} />
              <div className={styles.field}>
                <h1 className={styles.label}>Нийтлэл</h1>
                <Editor
                  editorState={article}
                  editorStyle={{
                    backgroundColor: "#171717",
                    minHeight: "100px",
                    color: "#ffffff ",
                  }}
                  toolbarClassName="toolbarClass"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  toolbar={EditorConfig}
                  onEditorStateChange={(state) => updateArticleData(state)}
                />

                {console.log(EditorConfig)}
              </div>
              <Status current={status} change={setStatus} />
              <div className={styles.field}>
                <button className={styles.button} onClick={Save}>
                  Хадгалах
                </button>
              </div>
            </div>
          </>
        )}
        {loading && <Loader />}
      </BrowserRouter>
    </div>
  );
};

export default PutArticle;
