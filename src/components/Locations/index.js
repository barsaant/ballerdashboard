import React, { useState } from "react";
import styles from "./_.module.css";
import Districts from "../DistrictControl";
import Khoroos from "../KhorooControl";

const Locations = () => {

  const [ level, setLevel] = useState(0);
  const [ id, setId ] = useState(null);


  const levelUp = (id) => {
    setLevel(level => level+1);
    setId(id);
  };
  const levelDown = () => {
    if(level>0){
      setLevel(level => level-1);
    }
  };
  let content = <button className={styles.button} onClick={levelUp}>Дүүргүүд</button>;

  if (level === 1) {
    content = <Districts next={levelUp} prev={levelDown} />
  } else if (level === 2) {
    content = <Khoroos next={levelUp} prev={levelDown} districtId={id} />
  }
  
  return (
    <div>
      {content}
    </div>
  );
};

export default Locations;
