import React, { useState, useEffect } from "react";
import styles from "../_.module.css";
import axios from "../../../../../axios";
import Loader from "../../../../Loader";

const Khoroo = (props) => {
  const [loading, setLoading] = useState(true);
  const [khoroo, setKhoroo] = useState(props.current);
  const [khoroos, setKhoroos] = useState([]);
  const handleKhoroo = (e) => {
    setKhoroo(e.target.value);
  };
  const getKhoroos = () => {
    setLoading(true);
    axios
      .get(`/districts/${props.districtId}/khoroos`)
      .then((result) => {
        setKhoroos(result.data.district.khoroos);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    props.change(khoroo);
  }, [khoroo]);
  useEffect(() => {
    if(props.districtId!==null) {
      getKhoroos();
    }  
  },[props.districtId]);

  return (
    <div className={styles.field}>
      <h1 className={styles.label}>Хороо сонгох</h1>
      {!loading && (
        <select
          className={styles.select}
          value={khoroo}
          onChange={handleKhoroo}
        >
          <option key={0} value={null}>
              {''}
          </option>
          {khoroos.map((item) => (
            <option value={item.khorooId} key={item.khorooId}>
              {item.khorooName}
            </option>
          ))}
        </select>
      )}
      {loading && (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Khoroo;
