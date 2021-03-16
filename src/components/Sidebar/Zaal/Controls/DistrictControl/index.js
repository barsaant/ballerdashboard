import React, { useState, useEffect } from "react";
import axios from "../../../../../axios";
import axiosCancel from "axios";
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
  const [operation, setOperation] = useState(0);

  const getDistricts = (source) => {
    setLoading(true);
    axios
      .get(`/districts?limit=100`, {
        cancelToken: source.token,
      })
      .then((result) => {
        setTemp(result.data.districts);
        setDistricts(result.data.districts);
      })
      .catch(function (err) {
        if (axiosCancel.isCancel(err)) {
          console.log("req fail", err.message);
        } else {
          console.log(err);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const CancelToken = axiosCancel.CancelToken;
    const source = CancelToken.source();
    getDistricts(source);
    return () => {
      source.cancel();
    };
  }, [operation]);

  return (
    <div className={styles.container}>
      {!loading && (
        <>
          <div className={styles.head}>
            <SidebarSearch
              search={setTemp}
              origin={districts}
              level="district"
            />
            <AddDistrict
              notify={props.notify}
              loading={setLoading}
              refresh={setOperation}
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
                    refresh={setOperation}
                    name={item.districtName}
                    id={item.districtId}
                  />
                  <DeleteDistrict
                    notify={props.notify}
                    loading={setLoading}
                    refresh={setOperation}
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
