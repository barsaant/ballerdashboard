import React, { useState } from "react";
import axios from "axios";
import config from "../../../../../config/config.json";
import styles from "../../Style/_.module.css";
import { FiArrowRight, FiCheck, FiEdit3 } from "react-icons/fi";

const EditDistrict = (props) => {
  const [edittedName, setEdittedName] = useState(props.name);
  const [editing, setEditing] = useState(false);


  const handleChange = (e) => {
    setEdittedName(e.target.value);
  };

  const handleSubmit = (e) => {
    editDistrict();
  };

  const edit = () => {
    setEditing(true);
  };
  const notEdit = () => {
    setEditing(false);
    setEdittedName(props.name);
  };
  const editDistrict = () => {
    props.loading({ loading: true });
    axios
      .put(`${config.SERVER_URL}/districts/${props.id}`, {
        districtName: edittedName.charAt(0).toUpperCase()+edittedName.toLowerCase().slice(1),
      })
      .then((result) => console.log(result.data.message))
      .catch((err) => console.log(err.message))
      .finally(() => props.refresh());
  };

  if (editing) {
    return (
      <div className={styles.editContainer}>
        <input className={styles.editInput} value={edittedName} onChange={handleChange} />
        <div className={styles.group}>
          <button className={styles.button} onClick={handleSubmit} >
            <FiCheck />
          </button>
          <button className={styles.button} onClick={notEdit}>
            <FiArrowRight />
          </button>
        </div>
      </div>
    );
  }
  return (
    <button className={styles.button} onClick={edit}>
      <FiEdit3 />
    </button>
  );
};

export default EditDistrict;
