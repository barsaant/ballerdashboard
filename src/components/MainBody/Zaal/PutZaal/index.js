import React, { useState, useEffect } from "react";
import { useHistory, useParams, BrowserRouter } from "react-router-dom";
import styles from "./_.module.css";
import axios from "../../../../axios";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./editor.css";
import Loader from "../../../Loader";
import Title from "./Title";
import District from "./District";
import Khoroo from "./Khoroo";
import Phone from "./Phone";
import Address from "./Address";
import Description from "./Description";
import Tag from "./Tag";
import Status from "./Status";

const CreateSportHall = (props) => {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState(null);
  const [khoroo, setKhoroo] = useState(null);
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [images, setImages] = useState(() => EditorState.createEmpty());
  const [tag, setTag] = useState([]);
  const [imageData, setImageData] = useState();
  const history = useHistory();
  const params = useParams();

  const getSporthall = () => {
    setLoading(true);
    axios
      .get(`/sporthalls/${params.id}`)
      .then((result) => {
        setTitle(result.data.sportHall.title);
        setPhone(result.data.sportHall.phone);
        setDistrict(result.data.sportHall.districtId);
        setKhoroo(result.data.sportHall.khorooId);
        setAddress(result.data.sportHall.address);
        setDescription(result.data.sportHall.info);
        setTag(result.data.sportHall.tagSportHalls);
        setStatus(result.data.sportHall.status);
        if (
          result.data.sportHall.images !== " " &&
          result.data.sportHall.images !== null
        ) {
          const editorState = htmlToDraft(
            JSON.parse(result.data.sportHall.images)
          );
          const state = ContentState.createFromBlockArray(
            editorState.contentBlocks,
            editorState.entityMap
          );
          console.log(JSON.parse(result.data.sportHall.images));
          setImages(EditorState.createWithContent(state));
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getSporthall();
  }, []);
  const updateDiscriptionData = (state) => {
    setImages(state);
    const data = JSON.stringify(
      draftToHtml(convertToRaw(images.getCurrentContent()))
    );
    setImageData(data);
  };

  const Save = () => {
    setLoading(true);
    axios
      .put(`/sporthalls/${params.id}`, {
        address: address,
        districtId: district,
        info: description,
        khorooId: khoroo,
        phone: phone,
        status: status,
        tagSportHalls: tag,
        title: title,
      })
      .then((result) => {
        props.notify({
          success: result.data.success,
          message: result.data.message,
        });
        history.push("/sporthalls");
      })
      .catch((err) => {
        props.notify({
          success: err.response.data.success,
          message: err.response.data.error.message,
        });
        console.log(err.response.data);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={styles.mainContainer}>
      <BrowserRouter>
        {!loading && (
          <div className={styles.container}>
            <Title current={title} change={setTitle} />
            <div className={styles.group}>
              <District
                current={district}
                change={setDistrict}
                resetKhoroo={setKhoroo}
              />
              <Khoroo
                current={khoroo}
                districtId={district}
                change={setKhoroo}
              />
            </div>
            <Phone current={phone} change={setPhone} />
            <Address current={address} change={setAddress} />
            {/*<div className={`field`}>
              <label className={`label`}>Зураг оруулах</label>
              <MediaLibrary />
             </div> 

            <div className={styles.field}>
              <h1 className={styles.label}>Зураг оруулах</h1>
              <Editor
                editorState={images}
                editorStyle={{ backgroundColor: "#171717", height: "300px" }}
                toolbarClassName="toolbarClass"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                toolbar={{
                  inline: {
                    bold: { className: "demo-option-none" },
                    italic: {
                      className: "demo-option-none",
                    },
                    underline: {
                      className: "demo-option-none",
                    },
                    strikethrough: {
                      className: "demo-option-none",
                    },
                    monospace: { className: "demo-option-none" },
                    superscript: {
                      className: "demo-option-none",
                    },
                    subscript: {
                      className: "demo-option-none",
                    },
                  },
                  blockType: {
                    className: "demo-option-none",
                    dropdownClassName: "demo-dropdown-custom",
                  },
                  fontSize: { className: "demo-option-none" },
                  list: {
                    unordered: {
                      className: "demo-option-none",
                    },
                    ordered: {
                      className: "demo-option-none",
                    },
                    indent: {
                      className: "demo-option-none",
                    },
                    outdent: {
                      className: "demo-option-none",
                    },
                  },
                  textAlign: {
                    left: { className: "demo-option-none" },
                    center: {
                      className: "demo-option-none",
                    },
                    right: {
                      className: "demo-option-none",
                    },
                    justify: {
                      className: "demo-option-none",
                    },
                  },
                  fontFamily: {
                    className: "demo-option-none",
                    dropdownClassName: "demo-dropdown-custom",
                  },
                  colorPicker: {
                    className: "demo-option-none",
                    popupClassName: "demo-popup-custom",
                  },
                  link: {
                    popupClassName: "demo-popup-custom",
                    link: { className: "demo-option-none" },
                    unlink: {
                      className: "demo-option-none",
                    },
                  },
                  emoji: {
                    className: "demo-option-none",
                    popupClassName: "demo-popup-custom",
                  },
                  embedded: {
                    className: "demo-option-none",
                    popupClassName: "demo-popup-custom",
                  },
                  image: {
                    className: "demo-option-image",
                    popupClassName: "demo-popup-image",
                  },
                  remove: {
                    className: "demo-option-none",
                  },
                  history: {
                    undo: { className: "demo-option-none" },
                    redo: { className: "demo-option-none" },
                  },
                }}
                onEditorStateChange={(state) => updateDiscriptionData(state)}
              />
            </div>*/}
            <Description current={description} change={setDescription} />
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

export default CreateSportHall;
