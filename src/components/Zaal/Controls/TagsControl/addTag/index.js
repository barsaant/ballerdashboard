import React, { useState } from "react";
import axios from "axios";
import config from "../../../../../config/config.json";
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
    props.loading({loading: true});
    axios
      .post(`${config.SERVER_URL}/tagshalls`, {
        tagName: newTag,
      })
      .then((result) => {
        console.log(result.data.message);
      })
      .catch((err) => {
        console.log(err);
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
