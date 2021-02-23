import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import UpdateDistrictComp from "../../../components/DistrictControl/UpdateDistrict";
import styles from "../_.module.css";
const Districts = () => {
  return (
    <div>
      <div className={styles.district}>
        <div className={`container is-max-desktop`}>
          <h1 className={`${styles.h1}`}>Дүүрэг засах</h1>
          <UpdateDistrictComp />
        </div>
      </div>
    </div>
  );
};

export default Districts;
