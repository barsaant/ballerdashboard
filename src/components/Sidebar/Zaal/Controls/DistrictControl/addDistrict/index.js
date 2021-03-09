import React, { useState } from "react";
import styles from "../../Style/_.module.css";
import { FiPlusSquare } from "react-icons/fi";
import axios from "../../../../../../axios";

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
    props.loading({ loading: true });
    axios
      .post(`/districts`, {
        districtName: newDistrict,
      })
      .then((result) => {
        const note = { success: true, message: result.data.message };
        props.notify(note);
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.data.error.message) {
        //   const note = {
        //     success: false,
        //     message: err.response.data.error.message,
        //   };
        //   props.notify(note);
        // } else {
        //   const note = { success: false, message: err.message };
        //   props.notify(note);
        // }
      })
      .finally(() => props.refresh());
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
