import React, { useEffect, useState } from "react";
import styles from "../_.module.css";

const Phone = (props) => {
  const [phone, setPhone] = useState(props.current);
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  useEffect(() => {
    props.change(phone);
  },[phone]);

  return (
    <div className={styles.field}>
      <h1 className={styles.label}>Утасны дугаар</h1>
      <input
        className={styles.input}
        type={`text`}
        value={phone}
        onChange={handlePhone}
      />
    </div>
  );
};

export default Phone;
