import React, { useEffect, useState } from "react";
import styles from "../_.module.css";

const Title = (props) => {
  const [title,setTitle] = useState(props.current);
  const titleHandler = (e) => {
    setTitle(e.target.value);
  }
  useEffect(() => {
    props.change(title);
  },[title]);
  
  return (
    <div className={styles.field}>
      <h1 className={styles.label}>Мэдээний гарчиг</h1>
      <input
        className={styles.input}
        type={`text`}
        value={title}
        onChange={titleHandler}
      />
    </div>
  );
};

export default Title;
