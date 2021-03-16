import React from "react";
import axios from "../../../../../../axios";
import styles from "../../Style/_.module.css";
import { FiTrash2 } from "react-icons/fi";

const DeleteTag = (props) => {
  const deleteTag = () => {
    props.loading(true);
    axios
      .delete(`/tagshalls/${props.id}`)
      .then((result) => {
        props.notify({ success: true, message: result.data.message });
      })
      .catch((err) => {
        props.notify({ success: false, message: err.response.data.error.message });
      })
      .finally(() => props.refresh(prev => prev+1));
  };

  return (
    <button
      className={styles.button}
      onClick={() => deleteTag()}
    >
      <FiTrash2 />
    </button>
  );
};

export default DeleteTag;
