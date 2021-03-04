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
  const [tag, setTag] = useState({
    tags: [],
    error: null,
    loading: true,
    message: null,
  });

  const getTags = () => {
    axios
      .get(`/tagshalls`)
      .then((result) => {
        setTag({ tags: result.data.tags, loading: false });
      })
      .catch((err) => {
        if (err.response.data.error.message) {
          const note = {
            success: false,
            message: err.response.data.error.message,
          };
          props.notify(note);
        } else {
          const note = { success: false, message: err.message };
          props.notify(note);
        }
      });
  };

  useEffect(() => {
    getTags();
  }, []);

  if (!tag.loading) {
    return (
      <div className={styles.container}>
        <div className={styles.head}>
          <SidebarSearch />
          <AddTag notify={props.notify} loading={setTag} refresh={getTags} />
        </div>
        <ul className={styles.list}>
          {tag.tags.map((item) => (
            <li className={styles.items} key={item.tagId}>
              <p className={styles.name}>{item.tagName}</p>
              <div className={styles.group}>
                <EditTag
                  notify={props.notify}
                  loading={setTag}
                  refresh={getTags}
                  name={item.tagName}
                  id={item.tagtId}
                />
                <DeleteTag
                  notify={props.notify}
                  loading={setTag}
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
      </div>
    );
  }
  return <Loader />;
};

export default TagControl;
