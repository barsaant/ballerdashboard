import React, { useState, useEffect } from "react";
import axios from "../../../../../axios";
import styles from "../Style/_.module.css";
import Loader from "../../../../Loader";
import AddDistrict from "./addDistrict";
import EditDistrict from "./editDistrict";
import DeleteDistrict from "./deleteDistrict";
import SidebarSearch from "../SidebarSearch";
import { FiArrowLeft } from "react-icons/fi";

const DistrictControl = (props) => {
  const [loading, setLoading] = useState(true);
  const [districts, setDistricts] = useState([]);
  const [temp, setTemp] = useState([]);

  const searchHandler = (arr) => {
    setTemp(arr);
  };

  const getDistricts = () => {
    setLoading(true);
    axios
      .get(`/districts?limit=100`)
      .then((result) => {
        setTemp(result.data.districts);
        setDistricts(result.data.districts);
      })
      .catch((err) => {
        props.notify({ success: false, message: err.response.data.error.message });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getDistricts();
  }, []);

  return (
    <div className={styles.container}>
      {!loading && (
        <>
          <div className={styles.head}>
            <SidebarSearch
              search={searchHandler}
              origin={districts}
              level="district"
            />
            <AddDistrict
              notify={props.notify}
              loading={setLoading}
              refresh={getDistricts}
            />
          </div>
          <ul className={styles.list}>
            {temp.map((item) => (
              <li className={styles.items} key={item.districtId}>
                <p
                  className={styles.name}
                  onClick={() => {
                    props.jump("khoroos");
                    props.getId(item.districtId);
                  }}
                >
                  {item.districtName}
                </p>
                <div className={styles.group}>
                  <EditDistrict
                    notify={props.notify}
                    loading={setLoading}
                    refresh={getDistricts}
                    name={item.districtName}
                    id={item.districtId}
                  />
                  <DeleteDistrict
                    notify={props.notify}
                    loading={setLoading}
                    refresh={getDistricts}
                    id={item.districtId}
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.backButtonContainer}>
            <button
              className={styles.backButton}
              onClick={props.jump.bind(this, "home")}
            >
              <FiArrowLeft />
            </button>
          </div>
        </>
      )}
      {loading && <Loader />}
    </div>
  );
};

export default DistrictControl;
