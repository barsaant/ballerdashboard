import React, { useEffect, useState } from "react";
import styles from "../_.module.css";

const Address = (props) => {
  const [address, setAddress] = useState(props.current);
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  useEffect(() => {
    props.change(address);
  },[address]);

  return (
    <div className={styles.field}>
      <h1 className={styles.label}>Хаяг</h1>
      <input
        className={styles.input}
        type={`text`}
        placeholder={`Хаяг`}
        value={address}
        onChange={handleAddress}
      />
    </div>
  );
};

export default Address;
