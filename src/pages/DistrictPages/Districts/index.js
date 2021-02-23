import React from "react";
import styles from "../_.module.css";
import DistricHome from "../../../components/DistrictControl/Districts";
import { Router, Link } from "react-router-dom";
const Districts = () => {
  return (
    <div>
      <div className={styles.district}>
        <div className={`container is-max-desktop`}>
          <div className={`${styles.header}`}>
            <h1 className={`${styles.h1}`}>Дүүргүүд</h1>

            <Link
              to={`/districts/create`}
              className={`button is-info ${styles.btn}`}
            >
              Үүсгэх
            </Link>
          </div>
          <DistricHome />
        </div>
      </div>
    </div>
  );
};

export default Districts;
