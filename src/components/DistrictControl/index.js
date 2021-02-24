import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config/config.json";
import styles from "./_.module.css";
import { FiX, FiEdit3, FiArrowLeft, FiSearch, FiPlus, FiLoader } from "react-icons/fi";

const Districts = (props) => {
  const [readable, setReadable] = useState("readOnly");
  const [newDistrict, setNewDistrict] = useState("");
  const [district, setDistrict] = useState({
    districts: [],
    error: null,
    loading: true,
    message: null,
  });

  const handleChange = (e) => {
    if (e.target.value !== "") {
      setNewDistrict(e.target.value);
    }
  };

  const deleteAtt = () => {

  };

  const getDistricts = () => {
    axios
      .get(`${config.SERVER_URL}/districts`)
      .then((result) => {
        setDistrict({ districts: result.data.districts, loading: false });
      })
      .catch((err) => console.log(err.response.data));
  };

  useEffect(() => {
    getDistricts();
  }, []);

  const postDistrict = () => {
    setDistrict({ loading: true });
    axios
      .post(`${config.SERVER_URL}/districts`, {
        districtName: newDistrict,
      })
      .then((result) => {
        console.log(result.data.message);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => getDistricts());
  };

  const handleSubmit = (e) => {
    postDistrict();
  };

  const deleteDistrict = (districtId) => {
    setDistrict({ loading: true });
    axios
      .delete(`${config.SERVER_URL}/districts/${districtId}`)
      .then((result) => alert(result.data.message))
      .catch((err) => alert(err.message))
      .finally(() => getDistricts());
  };

  if (!district.loading) {
    return (
      <div className={styles.container}>
        <div className={styles.headBar}>
          <button className={styles.button} onClick={props.prev}>
            {" "}
            <FiArrowLeft />{" "}
          </button>
          <button className={styles.button}>
            {" "}
            <FiSearch />{" "}
          </button>
        </div>
        <div className={styles.add}>
          <input readable className={styles.input} onChange={handleChange} />
          <button className={styles.button} onClick={handleSubmit}>
            <FiPlus />
          </button>
        </div>
        <ul className={styles.list}>
          {district.districts.map((item) => (
            <li className={styles.items} key={item.districtId}>
              <input
                className={styles.name}
                onClick={props.next.bind(this, item.districtId)}
                value={item.districtName}
              />
              <div className={styles.group}>
                <button className={styles.button}>
                  <FiEdit3 />
                </button>
                <button
                  className={styles.button}
                  onClick={() => deleteDistrict(item.districtId)}
                >
                  <FiX />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.loading}>
        <FiLoader className={styles.spinner} />
      </div>
    </div>
  );
};

export default Districts;
