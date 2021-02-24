import React, { useState } from "react";
import styles from "./_.module.css";
import Tags from "../TagsControl";

const CustomTags = () => {

  const [ level, setLevel] = useState(0);


  const levelUp = (id) => {
    setLevel(level => level+1);
  };
  const levelDown = () => {
    if(level>0){
      setLevel(level => 1-level);
    }
  };
  let content = <button className={styles.button} onClick={levelUp}>Тагууд</button>;

  if (level === 1) {
    content = <Tags next={levelUp} prev={levelDown} />
  }

  return (
    <div>
      {content}
    </div>
  );
};

export default CustomTags;
