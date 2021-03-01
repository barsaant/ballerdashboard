import React, { useState } from "react";
import axios from "axios";
import config from "../../../../../config/config.json";
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
      .post(`${config.SERVER_URL}/khoroos`, {
        khorooName: newKhoroo,
        districtId: props.districtId
      })
      .then((result) => {
        console.log(result.data.message);
      })
      .catch((err) => {
        console.log(err);
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
