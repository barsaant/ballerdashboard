import React, { useEffect, useState } from "react";
import styles from "../_.module.css";

const Description = (props) => {
  const [description, setDescription] = useState(props.current);
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  useEffect(() => {
    props.change(description);
  },[description]);

  return (
    <div className={styles.field}>
      <h1 className={styles.label}>Нэмэлт мэдээлэл</h1>
      <input
        className={styles.input}
        type={`text`}
        placeholder={`Нэмэлт мэдээлэл`}
        value={description}
        onChange={handleDescription}
      />
    </div>
  );
};

export default Description;
