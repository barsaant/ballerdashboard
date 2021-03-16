import React, { useState, useEffect } from "react";
import styles from "../_.module.css";
import axios from "../../../../../axios";
import axiosCancel from "axios";
import Loader from "../../../../Loader";

const District = (props) => {
  const [loading, setLoading] = useState(true);
  const [district, setDistrict] = useState(props.current);
  const [districts, setDistricts] = useState([]);
  const handleDistrict = (e) => {
    setDistrict(e.target.value);
  };
  const getDistricts = (source) => {
    setLoading(true);
    axios
      .get(`/districts`,{
        cancelToken: source.token
      })
      .then((result) => {
        setDistricts(result.data.districts);
      })
      .catch(function (err) {
        if (axiosCancel.isCancel(err)) {
          console.log('req fail',err.message);
        } else {
          console.log(err);
        }
      })
      .finally(() => setLoading(false));
  };
  

  useEffect(() => {
    props.change(district);
    props.resetKhoroo(null);
  }, [district]);

  useEffect(() => {
    const CancelToken = axiosCancel.CancelToken;
    const source = CancelToken.source();
    getDistricts(source);
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <div className={styles.field}>
      <h1 className={styles.label}>Дүүрэг сонгох</h1>
      {!loading && (
        <select
          className={styles.select}
          value={district}
          onChange={handleDistrict}
        >
          {districts.map((item) => (
            <option key={item.districtId} value={item.districtId}>
              {item.districtName}
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

export default District;
