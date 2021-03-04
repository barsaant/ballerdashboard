import React from "react";
import axios from "../../../../../../axios";
import styles from "../../Style/_.module.css";
import { FiTrash2 } from "react-icons/fi";

const DeleteKhoroo = (props) => {
  const deleteKhoroo = (khorooId) => {
    props.loading({ loading: true });
    axios
      .delete(`/districts/${khorooId}`)
      .then((result) => {
        const note = { success: true, message: result.data.message };
        props.notify(note);
      })
      .catch((err) => {
        if (err.response.data.error.message!==undefined) {
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
      .finally(() => props.refresh());
  };

  return (
    <button className={styles.button} onClick={() => deleteKhoroo(props.id)}>
      <FiTrash2 />
    </button>
  );
};

export default DeleteKhoroo;
