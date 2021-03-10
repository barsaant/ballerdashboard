import React from "react";
import axios from "../../../../../../axios";
import styles from "../../Style/_.module.css";
import { FiTrash2 } from "react-icons/fi";

const DeleteCategory = (props) => {
  const deleteCategory = () => {
    props.loading(true);
    axios
      .delete(`/categories/${props.id}`)
      .then((result) => {
        props.notify({ success: true, message: result.data.message });
      })
      .catch((err) => {
        props.notify({ success: false, message: err.response.data.error.message });
      })
      .finally(() => props.refresh());
  };

  return (
    <button
      className={styles.button}
      onClick={() => deleteCategory()}
    >
      <FiTrash2 />
    </button>
  );
};

export default DeleteCategory;
