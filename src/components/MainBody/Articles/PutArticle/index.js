import React, { useState, useEffect } from "react";
import { useHistory, useParams, BrowserRouter } from "react-router-dom";
import styles from "./_.module.css";
import axios from "../../../../axios";
import axiosCancel from "axios";
import Loader from "../../../Loader";
import Title from "./Title";
import Category from "./Category";
import Tag from "./Tag";
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
import config from "../../../../config/config.json";

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
  function destructId(obj) {
    const arr = [];
    obj.map((item) => arr.push(item.categoryId));
    return arr;
  }

  const getSporthall = (source) => {
    setLoading(true);
    axios
      .get(`/articles/${params.id}`, {
        cancelToken: source.token,
      })
      .then((result) => {
        setTitle(result.data.article.title);
        setCategory(destructId(result.data.article.categoryArticles));
        setTag(result.data.article.tagArticles);
        setStatus(result.data.article.status);
        if (
          result.data.article.article !== " " &&
          result.data.article.article !== null
        ) {
          const editorState = htmlToDraft(
            addUrl(
              JSON.parse(result.data.article.article),
              `${config.FILE_SERVER}/`
            )
          );

          const state = ContentState.createFromBlockArray(
            editorState.contentBlocks,
            editorState.entityMap
          );
          setArticle(EditorState.createWithContent(state));
        }
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
    const CancelToken = axiosCancel.CancelToken;
    const source = CancelToken.source();
    getSporthall(source);
    return () => {
      source.cancel();
    };
  }, []);

  const addUrl = (string1, string2) => {
    let temp = "=";
    let str = string1;
    let arr = [];
    while (str.search("<img src=") !== -1) {
      arr.push(str.search("<img src="));
      str =
        str.slice(0, arr[arr.length - 1] + 8) +
        str.slice(arr[arr.length - 1] + 9, arr[arr.length - 1] + 10) +
        string2 +
        str.slice(arr[arr.length - 1] + 10);
    }
    for (var i = 0; i < arr.length; i++) {
      str = str.slice(0, arr[i] + 8 + i) + temp + str.slice(arr[i] + 8 + i);
    }
    return str;
  };

  const removeUrl = (string) => {
    let temp = "=";
    let str = string;
    let arr = [];
    while (str.search("<img src=") !== -1) {
      arr.push(str.search("<img src="));
      let j = 0;
      while (str[arr[arr.length - 1] + 19 + j] !== "/") {
        j++;
      }
      str =
        str.slice(0, arr[arr.length - 1] + 8) +
        str.slice(arr[arr.length - 1] + 9, arr[arr.length - 1] + 10) +
        str.slice(arr[arr.length - 1] + j + 20);
    }
    for (var i = 0; i < arr.length; i++) {
      str = str.slice(0, arr[i] + 8 + i) + temp + str.slice(arr[i] + 8 + i);
    }
    return str;
  };

  const updateArticleData = (state) => {
    setArticle(state);
    const data = JSON.stringify(
      removeUrl(draftToHtml(convertToRaw(article.getCurrentContent())))
    );
    setArticleData(data);
  };

  const Save = () => {
    axios
      .put(`/articles/${params.id}`, {
        title: title,
        tagArticles: tag,
        categoryId: category,
        status: status,
        article: articleData,
      })
      .then((result) => {
        history.push("/articles");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div className={styles.mainContainer}>
      <BrowserRouter>
        {!loading && (
          <>
            <Navbar
              change={setStatus}
              status={status}
              save={Save}
              open={setMedia.bind(this, true)}
            />
            <div className={styles.container}>
              {media && (
                <div className={styles.mediaContainer}>
                  <Media
                    notify={props.notify}
                    changeSection={props.changeSection}
                    type={"articles"}
                    id={params.id}
                    close={setMedia.bind(this, false)}
                    setThumbnail={setImage}
                    button={true}
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
              <Category current={category} change={setCategory} />
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
            </div>
          </>
        )}
        {loading && <Loader />}
      </BrowserRouter>
    </div>
  );
};

export default PutArticle;
