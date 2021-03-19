import React, { useState, useEffect } from "react";
import axios from "../../../../../axios";
import axiosCancel from "axios";
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
  const [operation, setOperation] = useState(0);

  const getTags = (source) => {
    setLoading(true);
    axios
      .get(`/tagarticles`, {
        cancelToken: source.token,
      })
      .then((result) => {
        console.log(result);
        setTags(result.data.tags);
        setTemp(result.data.tags);
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
    getTags(source);
    return () => {
      source.cancel();
    };
  }, [operation]);

  return (
    <div className={styles.container}>
      {!loading && (
        <>
          <div className={styles.head}>
            <SidebarSearch search={setTemp} origin={tags} level='tag' />
            <AddTag
              notify={props.notify}
              loading={setLoading}
              refresh={setOperation}
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
                    refresh={setOperation}
                    name={item.tagName}
                    id={item.tagId}
                  />
                  <DeleteTag
                    notify={props.notify}
                    loading={setLoading}
                    refresh={setOperation}
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
