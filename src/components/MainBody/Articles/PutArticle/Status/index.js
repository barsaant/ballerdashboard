import React, { useEffect, useState } from "react";
import styles from "../_.module.css";

const Status = (props) => {
  const [status, setStatus] = useState(props.current);
  const handleStatus = (e) => {
    setStatus(e.target.value);
  };
  useEffect(() => {
    props.change(status);
  }, [status]);

  return (
    <div className={styles.field}>
      <h1 className={styles.label}>Статус</h1>
      <select className={styles.select} value={status} onChange={handleStatus}>
        <option value='saved'>Хадгалах</option>
        <option value='posted'>Нийтлэх</option>
        <option value='deleted'>Устгах</option>
      </select>
    </div>
  );
};

export default Status;
