import React, { useState, useEffect } from "react";
import styles from "../_.module.css";
import axios from "../../../../../axios";
import Loader from "../../../../Loader";
import { Multiselect } from "multiselect-react-dropdown";

const Tags = (props) => {
  const [loading, setLoading] = useState(true);
  const [tag, setTag] = useState(props.current);
  const [tags, setTags] = useState([]);
  const handleTag = (e) => {
    setTag(e.target.value);
  };
  const getTags = () => {
    setLoading(true);
    axios
      .get(`/tagshalls`)
      .then((result) => {
        setTags(result.data.tags);
        console.log(result.data.tags);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <div className={styles.field}>
      <h1 className={styles.label}>Таг</h1>
      {!loading && (
        <Multiselect
          options={tags}
          selectedValues={tag}
          displayValue='tagName'
        />
      )}
      {loading && (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Tags;
