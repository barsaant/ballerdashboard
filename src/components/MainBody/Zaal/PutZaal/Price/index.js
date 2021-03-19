import React, { useEffect, useState } from "react";
import styles from "../_.module.css";

const Price = (props) => {
  const [price, setPrice] = useState(props.current);
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };
  useEffect(() => {
    props.change(price);
  },[price]);

  return (
    <div className={styles.field}>
      <h1 className={styles.label}>Үнэ</h1>
      <input
        className={styles.input}
        type={`text`}
        value={price}
        onChange={handlePrice}
      />
    </div>
  );
};

export default Price;
