import React from "react";
import styles from "../_.module.css";
import DistricCreate from "../../../components/DistrictControl/CreateDistrict";
const Districts = () => {
  return (
    <div>
      <div className={styles.district}>
        <div className={`container is-max-desktop`}>
          <h1 className={`${styles.h1}`}>Дүүрэг үүсгэх</h1>
          <DistricCreate />
        </div>
      </div>
    </div>
  );
};

export default Districts;
