import React, { useState } from "react";
import axios from "../../../../../../axios";
import styles from "../../Style/_.module.css";
import { FiPlusSquare } from "react-icons/fi";

const AddCategory = (props) => {
  const [newCategory, setNewCategory] = useState("");

  const handleChange = (e) => {
    if (e.target.value !== "") {
      setNewCategory(e.target.value);
    }
  };


  const postCategory = () => {
    props.loading(true);
    axios
      .post(`/categories`, {
        categoryName: newCategory,
      })
      .then((result) => {
        props.notify({ success: true, message: result.data.message });
      })
      .catch((err) => {
        props.notify({ success: false, message: err.response.data.error.message });
      })
      .finally(() => props.refresh(prev => prev+1));
  };

  return (
    <div className={styles.headContainer}>
      <input placeholder={'Нэмэх...'} className={styles.input} onChange={handleChange} />
      <button className={styles.button} onClick={postCategory}>
        <FiPlusSquare />
      </button>
    </div>
  );
};


export default AddCategory;
