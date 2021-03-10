import React from "react";
import axios from "../../../../../../axios";
import styles from "../../Style/_.module.css";
import { FiTrash2 } from "react-icons/fi";

const DeleteKhoroo = (props) => {
  const deleteKhoroo = (khorooId) => {
    props.loading(true);
    axios
      .delete(`/districts/${khorooId}`)
      .then((result) => {
        props.notify({ success: true, message: result.data.message });
      })
      .catch((err) => {
        props.notify({ success: false, message: err.response.data.error.message });
      })
      .finally(() => props.refresh());
  };

  return (
    <button className={styles.button} onClick={() => deleteKhoroo(props.id)}>
      <FiTrash2 />
    </button>
  );
};

export default DeleteKhoroo;
