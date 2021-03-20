import React, { useEffect, useState } from "react";
import styles from "../_.module.css";

const LockerRoom = (props) => {
  const [lockerRoom, setLockerRoom] = useState(props.current);
  const handle = (e) => {
    setLockerRoom(e.target.value);
  };
  useEffect(() => {
    props.change(lockerRoom);
  }, [lockerRoom]);

  return (
    <div className={styles.field}>
      <h1 className={styles.label}>Хувцас солих өрөө</h1>
      <select className={styles.select} value={lockerRoom} onChange={handle}>
        <option value={true}>Байгаа</option>
        <option value={false}>Байхгүй</option>
      </select>
    </div>
  );
};

export default LockerRoom;
