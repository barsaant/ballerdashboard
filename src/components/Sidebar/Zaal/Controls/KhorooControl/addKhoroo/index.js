import React, { useState } from "react";
import axios from "../../../../../../axios";
import styles from "../../Style/_.module.css";
import { FiPlusSquare } from "react-icons/fi";

const AddKhoroo = (props) => {
  const [newKhoroo, setNewKhoroo] = useState("");

  const handleChange = (e) => {
    if (e.target.value !== "") {
      setNewKhoroo(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    postKhoroo();
  };
  

  const postKhoroo = () => {
    props.loading({loading: true});
    axios
      .post(`/khoroos`, {
        khorooName: newKhoroo,
        districtId: props.districtId
      })
      .then((result) => {
        const note = { success: true, message: result.data.message };
        props.notify(note);
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
      })
      .finally(() => props.refresh(props.districtId));
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


export default AddKhoroo;
