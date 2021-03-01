import React, { useState } from "react";
import axios from "axios";
import config from "../../../../../config/config.json";
import styles from "../../Style/_.module.css";
import { FiPlusSquare } from "react-icons/fi";

const AddDistrict = (props) => {
  const [newDistrict, setNewDistrict] = useState("");

  const handleChange = (e) => {
    if (e.target.value !== "") {
      setNewDistrict(e.target.value);
    }
  };

  const handleSubmit = () => {
    postDistrict();
  };
  

  const postDistrict = () => {
    props.loading({loading: true});
    axios
      .post(`${config.SERVER_URL}/districts`, {
        districtName: newDistrict,
      })
      .then((result) => {
        const note = { success: true, message: result.data.message };
        props.notify(note);
      })
      .catch((err) => {
        const note = {success: false, message: err.data.error.message};
        props.notify(note);
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
