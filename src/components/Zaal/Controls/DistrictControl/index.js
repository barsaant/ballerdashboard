import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../../../config/config.json";
import styles from "../Style/_.module.css";
import Loader from "../../../Loader";
import AddDistrict from "./addDistrict";
import EditDistrict from "./editDistrict";
import DeleteDistrict from "./deleteDistrict";
import SidebarSearch from "../SidebarSearch";

const DistrictControl = (props) => {

  const [district, setDistrict] = useState({
    districts: [],
    error: null,
    loading: true,
    message: null,
  });
  const [ temp, setTemp ] = useState([]);

  const searchHandler = (arr) => {
    setTemp(arr);
  };

  const getDistricts = () => {
    axios
      .get(`${config.SERVER_URL}/districts?limit=100`)
      .then((result) => {
        setTemp(result.data.districts);
        setDistrict({ districts: result.data.districts, loading: false });
      })
      .catch((err) => console.log(err.response.data));
  };

  useEffect(() => {
    getDistricts();
  }, []);


  if (!district.loading) {
    return (
      <div className={styles.container}>
        <div className={styles.head}>
          <SidebarSearch search={searchHandler} origin={district.districts} level="district" />
          <AddDistrict notify={props.notify} loading={setDistrict} refresh={getDistricts} />
        </div>
        <ul className={styles.list}>
          {temp.map((item) => (
            <li className={styles.items} key={item.districtId}>
              <p className={styles.name} onClick={props.next.bind(this,item.districtId)} >{item.districtName}</p>
              <div className={styles.group}>
                <EditDistrict notify={props.notify} loading={setDistrict} refresh={getDistricts} name={item.districtName} id={item.districtId} />
                <DeleteDistrict notify={props.notify} loading={setDistrict} refresh={getDistricts} id={item.districtId} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return <Loader />;
};

export default DistrictControl;
