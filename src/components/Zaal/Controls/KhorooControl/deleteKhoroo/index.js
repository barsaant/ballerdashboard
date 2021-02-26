import React from "react";
import axios from "axios";
import config from "../../../../../config/config.json";
import styles from "../../Style/_.module.css";
import { FiX } from "react-icons/fi";

const DeleteKhoroo = (props) => {
  const deleteKhoroo = (khorooId) => {
    props.loading({ loading: true });
    axios
      .delete(`${config.SERVER_URL}/districts/${khorooId}`)
      .then((result) => alert(result.data.message))
      .catch((err) => alert(err.message))
      .finally(() => props.refresh());
  };

  return (
    <button
      className={styles.button}
      onClick={() => deleteKhoroo(props.id)}
    >
      <FiX />
    </button>
  );
};

export default DeleteKhoroo;
