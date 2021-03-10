import React, { useState, useEffect } from "react";
import axios from "../../../../../axios";
import styles from "../Style/_.module.css";
import Loader from "../../../../Loader";
import AddTag from "./addTag";
import EditTag from "./editTag";
import DeleteTag from "./deleteTag";
import SidebarSearch from "../SidebarSearch";
import { FiArrowLeft } from "react-icons/fi";

const TagControl = (props) => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [temp, setTemp] = useState([]);

  const getTags = () => {
    setLoading(true);
    axios
      .get(`/tagshalls`)
      .then((result) => {
        setTags(result.data.tags);
        setTemp(result.data.tags);
      })
      .catch((err) => {
        props.notify({ success: false, message: err.response.data.error.message });
      })
      .finally(() => setLoading(false));
  };
  const searchHandler = (arr) => {
    setTemp(arr);
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <div className={styles.container}>
      {!loading && (
        <>
          <div className={styles.head}>
            <SidebarSearch search={searchHandler} origin={tags} level="tag" />
            <AddTag
              notify={props.notify}
              loading={setLoading}
              refresh={getTags}
            />
          </div>
          <ul className={styles.list}>
            {temp.map((item) => (
              <li className={styles.items} key={item.tagId}>
                <p className={styles.name}>{item.tagName}</p>
                <div className={styles.group}>
                  <EditTag
                    notify={props.notify}
                    loading={setLoading}
                    refresh={getTags}
                    name={item.tagName}
                    id={item.tagId}
                  />
                  <DeleteTag
                    notify={props.notify}
                    loading={setLoading}
                    refresh={getTags}
                    id={item.tagId}
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.backButtonContainer}>
            <button
              className={styles.backButton}
              onClick={props.jump.bind(this, "home")}
            >
              <FiArrowLeft />
            </button>
          </div>
        </>
      )}
      {loading && <Loader />}
    </div>
  );
};

export default TagControl;
