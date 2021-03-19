import React, { useState, useEffect } from "react";
import { useHistory, useParams, BrowserRouter } from "react-router-dom";
import styles from "./_.module.css";
import axios from "../../../../axios";
import axiosCancel from "axios";
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
import Price from "./Price";
import Address from "./Address";
import Thumbnail from "./Thumbnail";
import Description from "./Description";
import Tag from "./Tag";
import Map from "./Map";
import { FiX } from "react-icons/fi";
import { ImageEditor } from "./Editor";
import Navbar from "../../Navbar";
import config from "../../../../config/config.json";

const CreateSportHall = (props) => {
  const [media, setMedia] = useState(false);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");
  const [district, setDistrict] = useState(1);
  const [khoroo, setKhoroo] = useState(1);
  const [address, setAddress] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [images, setImages] = useState(() => EditorState.createEmpty());
  const [tag, setTag] = useState([]);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [imageData, setImageData] = useState();
  const history = useHistory();
  const params = useParams();


  function destructIdTag(obj) {
    const arr = [];
    obj.map((item) => arr.push(item.tagId));
    return arr;
  }

  const getSporthall = (source) => {
    setLoading(true);
    axios
      .get(`/sporthalls/${params.id}`, {
        cancelToken: source.token,
      })
      .then((result) => {
        setLat(result.data.sportHall.latitude);
        setLng(result.data.sportHall.longitude);
        setTitle(result.data.sportHall.title);
        setPhone(result.data.sportHall.phone);
        setPrice(result.data.sportHall.price);
        setDistrict(result.data.sportHall.districtId);
        setKhoroo(result.data.sportHall.khorooId);
        setAddress(result.data.sportHall.address);
        setDescription(result.data.sportHall.info);
        setTag(destructIdTag(result.data.sportHall.tagSportHalls));
        setStatus(result.data.sportHall.status);
        setThumbnail(result.data.sportHall.thumbnail);
        if (
          result.data.sportHall.images !== " " &&
          result.data.sportHall.images !== null
        ) {
          const editorState = htmlToDraft(
            addUrl(
              JSON.parse(result.data.sportHall.images),
              `${config.FILE_SERVER}/`
            )
          );
          const state = ContentState.createFromBlockArray(
            editorState.contentBlocks,
            editorState.entityMap
          );
          setImages(EditorState.createWithContent(state));
        }
      })
      .catch(function (err) {
        if (axiosCancel.isCancel(err)) {
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

  const updateImageData = (state) => {
    setImages(state);
    const data = JSON.stringify(
      removeUrl(draftToHtml(convertToRaw(images.getCurrentContent())))
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
        price: price,
        status: status,
        tagId: tag,
        title: title,
        images: imageData,
        latitude: lat,
        longitude: lng,
        thumbnail: thumbnail,
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
                    button={true}
                    setThumbnail={setThumbnail}
                    close={setMedia.bind(this, false)}
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
              <Price current={price} change={setPrice} />
              <Address current={address} change={setAddress} />
              <Thumbnail
                current={thumbnail}
                change={setThumbnail}
                open={setMedia}
              />
              <div className={styles.field}>
                <h1 className={styles.label}>Зураг оруулах</h1>
                <Editor
                  editorState={images}
                  editorStyle={{
                    backgroundColor: "#171717",
                    color: "#ffffff ",
                    minHeight: "100px",
                  }}
                  toolbarClassName='toolbarClass'
                  wrapperClassName='wrapperClassName'
                  editorClassName='editorClassName'
                  toolbar={ImageEditor}
                  onEditorStateChange={(state) => updateImageData(state)}
                />
              </div>
              <Description current={description} change={setDescription} />
              <Tag current={tag} change={setTag} />
              <Map lat={lat} lng={lng} changeLat={setLat} changeLng={setLng} />
            </div>
          </>
        )}
        {loading && <Loader />}
      </BrowserRouter>
    </div>
  );
};

export default CreateSportHall;
