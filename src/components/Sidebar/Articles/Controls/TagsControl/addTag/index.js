import React, { useState } from "react";
import axios from "../../../../../../axios";
import styles from "../../Style/_.module.css";
import { FiPlusSquare } from "react-icons/fi";

const AddDistrict = (props) => {
  const [newTag, setNewTag] = useState("");

  const handleChange = (e) => {
    if (e.target.value !== "") {
      setNewTag(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    postTag();
  };
  

  const postTag = () => {
    props.loading(true);
    axios
      .post(`/tagshalls`, {
        tagName: newTag,
      })
      .then((result) => {
        props.notify({ success: true, message: result.data.message });
      })
      .catch((err) => {
        props.notify({ success: false, message: err.response.data.error.message });
      })
      .finally(() => props.refresh());
  };

  return (
    <div className={styles.headContainer}>
      <input placeholder={'Нэмэх...'} className={styles.input} onChange={handleChange} />
      <button className={styles.button} onClick={handleSubmit}>
        <FiPlusSquare />
      </button>
    </div>
  );
};


export default AddDistrict;
