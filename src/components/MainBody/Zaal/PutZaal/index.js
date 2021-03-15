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
import Media from "../../Media";
import Title from "./Title";
import District from "./District";
import Khoroo from "./Khoroo";
import Phone from "./Phone";
import Address from "./Address";
import Description from "./Description";
import Tag from "./Tag";
import { FiX } from "react-icons/fi";
import { ImageEditor } from "./Editor";
import Navbar from "../../Navbar";

const CreateSportHall = (props) => {
  const [media, setMedia] = useState(false);
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
            addUrl(
              JSON.parse(result.data.sportHall.images),
              "https://api.baller.mn/"
            )
          );
          const state = ContentState.createFromBlockArray(
            editorState.contentBlocks,
            editorState.entityMap
          );
          setImages(EditorState.createWithContent(state));
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getSporthall();
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
        str.slice(arr[arr.length - 1] + 11);
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

  const updateImageData = (state) => {
    setImages(state);
    const data = JSON.stringify(
      removeUrl(draftToHtml(convertToRaw(images.getCurrentContent())))
    );

    setImageData(data);
    console.log(data);
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
        images: imageData,
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
                    type={"sporthalls"}
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
              <div className={styles.field}>
                <h1 className={styles.label}>Зураг оруулах</h1>
                <Editor
                  editorState={images}
                  editorStyle={{
                    backgroundColor: "#171717",
                    color: "#ffffff ",
                    minHeight: "100px",
                  }}
                  toolbarClassName="toolbarClass"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  toolbar={ImageEditor}
                  onEditorStateChange={(state) => updateImageData(state)}
                />
              </div>
              <Description current={description} change={setDescription} />
              <Tag current={tag} change={setTag} />
            </div>
          </>
        )}
        {loading && <Loader />}
      </BrowserRouter>
    </div>
  );
};

export default CreateSportHall;
