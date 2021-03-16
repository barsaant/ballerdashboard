import React, { useState } from "react";
import styles from "../../Style/_.module.css";
import { FiPlusSquare } from "react-icons/fi";
import axios from "../../../../../../axios";
import axiosCancel from "axios";

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
    props.loading(true);
    axios
      .post(`/districts`, {
        districtName: newDistrict,
      })
      .then((result) => {
        props.notify({ success: true, message: result.data.message });
      })
      .catch((err) => {
        props.notify({
          success: false,
          message: err.response.data.error.message,
        });
      })
      .finally(() => {
        props.refresh((prev) => prev + 1);
      });
  };

  return (
    <div className={styles.headContainer}>
      <input
        placeholder={"Нэмэх..."}
        className={styles.input}
        onChange={handleChange}
      />
      <button className={styles.button} onClick={handleSubmit}>
        <FiPlusSquare />
      </button>
    </div>
  );
};

export default AddDistrict;
