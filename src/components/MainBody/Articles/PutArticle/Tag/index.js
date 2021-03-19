import React, { useState, useEffect } from "react";
import styles from "../_.module.css";
import axios from "../../../../../axios";
import axiosCancel from "axios";
import Loader from "../../../../Loader";
import { CSSTransition } from "react-transition-group";
import msStyle from "./_.module.css";
import { FiX } from "react-icons/fi";

const Tag = (props) => {
  const [dropdown, setDropdown] = useState(true);
  const [loading, setLoading] = useState(true);
  const [tagId, setTagId] = useState(props.current);
  const [selectedTags, setSelectedTags] = useState([]);
  const [unSelectedTags, setUnselectedTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [temp, setTemp] = useState([]);

  const addTag = (newTag) => {
    setSelectedTags([...selectedTags, newTag]);
    setTagId([...tagId, newTag.tagId]);
  };
  const removeTag = (newTag) => {
    const removed = selectedTags.filter((item) => item.tagId !== newTag.tagId);
    const idRemoved = tagId.filter((item) => item !== newTag.tagId);
    setSelectedTags(removed);
    setTagId(idRemoved);
  };
  const getTags = (source) => {
    setLoading(true);
    axios
      .get(`/tagarticles`, {
        cancelToken: source.token,
      })
      .then((result) => {
        setTags(result.data.tags);
        setUnselectedTags(
          result.data.tags.filter((item) => !tagId.includes(item.tagId))
        );
        setSelectedTags(
          result.data.tags.filter((item) => tagId.includes(item.tagId))
        );
        setTemp(result.data.tags.filter((item) => !tagId.includes(item.tagId)));
      })
      .catch(function (err) {
        if (axiosCancel.isCancel(err)) {
        } else {
          console.log(err);
        }
      })
      .finally(() => setLoading(false));
  };
  const handleSearch = (e) => {
    if (e.target.value === "") {
      setTemp(unSelectedTags);
    } else {
      setTemp(
        unSelectedTags.filter((item) =>
          item.tagName.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };
  useEffect(() => {
    const CancelToken = axiosCancel.CancelToken;
    const source = CancelToken.source();
    getTags(source);
    return () => {
      source.cancel();
    };
  }, []);
  useEffect(() => {
    setTemp(tags.filter((item) => !tagId.includes(item.tagId)));
    setSelectedTags(tags.filter((item) => tagId.includes(item.tagId)));
    props.change(tagId);
  }, [tagId]);

  return (
    <div className={styles.field}>
      <h1 className={styles.label}>Таг</h1>
      {!loading && (
        <div className={msStyle.container}>
          {selectedTags.map((item) => (
            <div className={msStyle.selected} key={item.tagId}>
              {item.tagName}
              <button
                className={msStyle.button}
                onClick={removeTag.bind(this, item)}
              >
                <FiX />
              </button>
            </div>
          ))}
          <div className={msStyle.inputContainer}>
            <input
              className={msStyle.input}
              type={`text`}
              onFocus={() => setDropdown(false)}
              onBlur={() => setDropdown(true)}
              onChange={handleSearch}
            />
            <CSSTransition
              in={dropdown}
              appear={true}
              timeout={200}
              classNames="tagDropdown"
            >
              <div className={msStyle.dropdownContainer}>
                {temp.map((item) => (
                  <div
                    key={item.tagId}
                    className={msStyle.option}
                    onClick={addTag.bind(this, item)}
                  >
                    {item.tagName}
                  </div>
                ))}
              </div>
            </CSSTransition>
          </div>
        </div>
      )}
      {loading && (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Tag;
