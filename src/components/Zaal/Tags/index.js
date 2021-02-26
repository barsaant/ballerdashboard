import React, { useState } from "react";
import styles from "./_.module.css";
import TagControl from "../Controls/TagsControl";

const Tags = (props) => {

  const [ level, setLevel] = useState(0);


  const levelUp = () => {
    if(level<1){
      setLevel(level => level+1);
    }
  };
  const levelDown = () => {
    if(level>0){
      setLevel(level => 1-level);
    } else if (level===0) {
      props.back();
    }
  };

  let content = <button className={styles.button} onClick={levelUp}>Тагууд</button>;

  if (level === 1) {
    content = <TagControl next={levelUp} prev={levelDown}/>
  }

  return (
    <div>
      {content}
    </div>
  );
};

export default Tags;
