import React, { useState, useEffect, Fragment } from "react";
import { useHistory, useParams, BrowserRouter } from "react-router-dom";
import styles from "./_.module.css";
import axios from "axios";
import config from "../../../config/config.json";
import { toast } from "react-toastify";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  convertFromRaw,
  ContentState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./editor.css";

const CreateSportHall = () => {
  const [title, setTitle] = useState();
  const [phone, setPhone] = useState();
  const [districtId, setDistrictId] = useState();
  const [khorooId, setKhorooId] = useState();
  const [address, setAddress] = useState();
  const [info, setInfo] = useState();
  const [status, setStatus] = useState();
  const [images, setImages] = useState(() => EditorState.createEmpty());

  const [imageData, setImageData] = useState();

  const [districts, setDistricts] = useState([]);

  const [khoroos, setKhoroos] = useState([]);

  const [loading, setLoading] = useState(false);

  // const updateTextimages =  (state) => {
  //   await setEditorState(state);
  //   const data = convertToRaw(editorState.getCurrentContent());
  // };

  const history = useHistory();

  const params = useParams();

  const getSportHall = () => {
    axios.get(`${config.SERVER_URL}/sporthalls/${params.id}`).then((result) => {
      setTitle(result.data.sportHall.title);
      setPhone(result.data.sportHall.phone);
      setDistrictId(result.data.sportHall.districtId);
      setKhorooId(result.data.sportHall.khorooId);
      setAddress(result.data.sportHall.address);
      setInfo(result.data.sportHall.info);
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
        // console.log(editorState);
        setImages(EditorState.createWithContent(state));
      }
      if (result.data.sportHall.districtId !== null) {
        axios
          .get(
            `${config.SERVER_URL}/districts/${result.data.sportHall.districtId}/khoroos`,
            { withCredentials: true }
          )
          .then((result) => {
            if (result.data.district.khoroos !== null) {
              setKhoroos(result.data.district.khoroos);
              setLoading(false);
            }
          })
          .catch((err) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  };

  const getDistricts = () => {
    axios
      .get(`${config.SERVER_URL}/districts`, { withCredentials: true })
      .then((result) => {
        setDistricts(result.data.districts);
      });
  };

  const getKhoroos = (id) => {
    axios
      .get(`${config.SERVER_URL}/districts/${id}/khoroos`, {
        withCredentials: true,
      })
      .then((result) => {
        setKhoroos(result.data.district.khoroos);
      });
  };

  useEffect(() => {
    setLoading(true);
    getSportHall();
    getDistricts();
  }, []);

  const handleTypeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDistrictId = (e) => {
    setDistrictId(e.target.value);
    getKhoroos(e.target.value);
  };

  const handleKhorooId = (e) => {
    setKhorooId(e.target.value);
  };

  const handleTypePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleTypeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleTypeInfo = (e) => {
    setInfo(e.target.value);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  const updateDiscriptionData = (state) => {
    setImages(state);
    const data = JSON.stringify(
      draftToHtml(convertToRaw(images.getCurrentContent()))
    );
    setImageData(data);
  };

  const handleSave = () => {
    setLoading({ loadging: true });
    console.log(params.id);
    axios
      .put(
        `${config.SERVER_URL}/sporthalls/${params.id}`,
        {
          title,
          districtId,
          khorooId,
          phone,
          address,
          info,
          status,
          images: imageData,
        },
        { withCredentials: true }
      )
      .then((result) => {
        console.log(result);
        toast.success(result.data.message);
        setLoading(false);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div>
      <BrowserRouter>
        <div>
          {loading === false && (
            <>
              <div className={`field`}>
                <label className={`label is-uppercase ${styles.label}`}>
                  Заалны нэр
                </label>
                <div className={`control`}>
                  <input
                    className={`input ${styles.input}`}
                    type={`text`}
                    value={!title ? `` : title}
                    onChange={handleTypeTitle}
                  />
                </div>
              </div>
              <div className={styles.option}>
                <div className={`field  ${styles.field}`}>
                  <label className={`label is-uppercase ${styles.label}`}>
                    Дүүрэг сонгох
                  </label>
                  <div className={`select ${styles.select}`}>
                    <select
                      defaultValue={`${!districtId ? `` : districtId}`}
                      onChange={handleDistrictId}
                    >
                      <option></option>
                      {districts.map((item) => (
                        <option
                          key={`${item.districtId}`}
                          value={`${item.districtId}`}
                        >
                          {item.districtName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={`field ${styles.field}`}>
                  <label className={`label is-uppercase ${styles.label}`}>
                    Хороо сонгох
                  </label>
                  <div className={`select ${styles.select}`}>
                    <select
                      defaultValue={`${!khorooId ? `` : khorooId}`}
                      onChange={handleKhorooId}
                    >
                      <option></option>
                      {khoroos.map((item) => (
                        <option
                          value={`${item.khorooId}`}
                          key={`${item.khorooId}`}
                        >
                          {item.khorooName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className={`field`}>
                <label className={`label is-uppercase ${styles.label}`}>
                  Утасны дугаар
                </label>
                <div className={`control`}>
                  <input
                    className={`input ${styles.input}`}
                    type={`text`}
                    name={`phone`}
                    placeholder={`Утасны дугаар`}
                    value={`${!phone ? `` : phone}`}
                    onChange={handleTypePhone}
                  />
                </div>
              </div>

              <div className={`field`}>
                <label className={`label is-uppercase ${styles.label}`}>
                  Хаяг
                </label>
                <div className={`control`}>
                  <input
                    className={`input ${styles.input}`}
                    type={`text`}
                    name='address'
                    placeholder={`Хаяг`}
                    value={address}
                    onChange={handleTypeAddress}
                  />
                </div>
              </div>

              {/* <div className={`field`}>
              <label className={`label`}>Зураг оруулах</label>
              <MediaLibrary />
            </div> */}

              <div className={`field`}>
                <label className={`label ${styles.label}`}>Зураг оруулах</label>
                <Editor
                  editorState={images}
                  editorStyle={{ backgroundColor: "#171717", height: "300px" }}
                  toolbarClassName='toolbarClass'
                  wrapperClassName='wrapperClassName'
                  editorClassName='editorClassName'
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
              </div>

              <div className={`field`}>
                <label className={`label is-uppercase ${styles.label}`}>
                  Нэмэлт Мэдээлэл
                </label>
                <div className={`control`}>
                  <textarea
                    className={`textarea ${styles.input}`}
                    placeholder='Нэмэлт мэдээлэл'
                    value={info}
                    onChange={handleTypeInfo}
                  ></textarea>
                </div>
              </div>

              <div className={styles.option}>
                <div className={`field`}>
                  <label className={`label is-uppercase ${styles.label} `}>
                    Статус
                  </label>
                  <div className={`select ${styles.select}`}>
                    <select defaultValue={status} onChange={handleStatus}>
                      <option value='saved'>Хадгалах</option>
                      <option value='posted'>Нийтлэх</option>
                      <option value='deleted'>Устгах</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={`field`}>
                <label className={`label`}></label>
                <button
                  className={`button is-success is-fullwidth is-uppercase ${styles.btn}`}
                  onClick={() => handleSave()}
                >
                  Хадгалах
                </button>
              </div>
            </>
          )}
        </div>
      </BrowserRouter>
    </div>
  );
};

export default CreateSportHall;
