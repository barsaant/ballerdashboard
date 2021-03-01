import React, { useState } from "react";
import styles from "./_.module.css";
import BackButton from "../BackButton";
import DistrictControl from "../Controls/DistrictControl";
import KhorooControl from "../Controls/KhorooControl";

const Districts = (props) => {

  const [ level, setLevel] = useState(0);
  const [ id, setId ] = useState(null);


  const levelUp = (id) => {
    if(level<2){
      setLevel(level => level+1);
      setId(id);
    }
  };
  const levelDown = () => {
    if(level>0){
      setLevel(level => level-1);
    } else if(level===0){
      props.close();
    }
  };
  let content = <button className={styles.button} onClick={levelUp}>Байршил</button>;

  if (level === 1) {
    content = <DistrictControl notify={props.notify} next={levelUp} />
  } else if (level === 2) {
    content = <KhorooControl next={levelUp} districtId={id} />
  }
  
  return (
    <div className={styles.container}>
      {content}
      <BackButton back={levelDown}/>
    </div>
  );
};

export default Districts;
