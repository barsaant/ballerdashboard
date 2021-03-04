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
  const [district, setDistrict] = useState({
    districts: [],
    loading: true,
  });
  const [temp, setTemp] = useState([]);

  const searchHandler = (arr) => {
    setTemp(arr);
  };

  const getDistricts = () => {
    axios
      .get(`/districts?limit=100`)
      .then((result) => {
        setTemp(result.data.districts);
        setDistrict({ districts: result.data.districts, loading: false });
      })
      .catch((err) => {
        if (err.response.data.error.message) {
          const note = {
            success: false,
            message: err.response.data.error.message,
          };
          props.notify(note);
        } else {
          const note = { success: false, message: err.message };
          props.notify(note);
        }
      });
  };

  useEffect(() => {
    getDistricts();
  }, []);

  if (!district.loading) {
    return (
      <div className={styles.container}>
        <div className={styles.head}>
          <SidebarSearch
            search={searchHandler}
            origin={district.districts}
            level="district"
          />
          <AddDistrict
            notify={props.notify}
            loading={setDistrict}
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
                  loading={setDistrict}
                  refresh={getDistricts}
                  name={item.districtName}
                  id={item.districtId}
                />
                <DeleteDistrict
                  notify={props.notify}
                  loading={setDistrict}
                  refresh={getDistricts}
                  id={item.districtId}
                />
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.backButtonContainer}>
          <button className={styles.backButton} onClick={props.jump.bind(this,'home')} >
            <FiArrowLeft />
          </button>
        </div>
      </div>
    );
  }
  return <Loader />;
};

export default DistrictControl;
