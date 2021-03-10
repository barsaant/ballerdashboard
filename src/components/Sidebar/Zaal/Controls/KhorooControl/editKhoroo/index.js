import React, { useState } from "react";
import axios from "../../../../../../axios";
import styles from "../../Style/_.module.css";
import { FiArrowRight, FiCheck, FiEdit3 } from "react-icons/fi";

const EditKhoroo = (props) => {
  const [edittedName, setEdittedName] = useState(props.name);
  const [editing, setEditing] = useState(false);


  const handleChange = (e) => {
    setEdittedName(e.target.value);
  };

  const handleSubmit = (e) => {
    editKhoroo();
  };

  const edit = () => {
    setEditing(true);
  };
  const notEdit = () => {
    setEditing(false);
    setEdittedName(props.name);
  };
  const editKhoroo = () => {
    props.loading(true);
    axios
      .put(`/khoroos/${props.id}`, {
        khorooName: edittedName.charAt(0).toUpperCase()+edittedName.toLowerCase().slice(1),
      })
      .then((result) => {
        props.notify({ success: true, message: result.data.message });
      })
      .catch((err) => {
        props.notify({ success: false, message: err.response.data.error.message });
      })
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

export default EditKhoroo;
