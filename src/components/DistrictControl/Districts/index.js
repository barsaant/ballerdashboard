import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import config from "../../../config/config.json";
import styles from "./_.module.css";

const DistrictHome = () => {
  const [state, setState] = useState({
    district: [],
    error: null,
    loading: true,
    message: null,
  });

  const getDistricts = () => {
    axios
      .get(`${config.SERVER_URL}/districts?limit=30`)
      .then((result) => {
        setState({ district: result.data.districts, loading: false });
      })
      .catch((err) => console.log(err.response.data));
  };

  useEffect(() => {
    getDistricts();
  }, []);

  const deleteButton = (districtId) => {
    axios
      .delete(`${config.SERVER_URL}/districts/${districtId}`)
      .then((result) => setState({ message: result.data.message }))
      .catch((err) => setState({ error: err.response.data.error.message }))
      .finally(() => getDistricts());
  };

  return (
    <div>
      <ul>
        {state.loading == false &&
          state.district.map((item) => (
            <li className={`${styles.items}`} key={`${item.districtId}`}>
              <div>
                <h3 className={`${styles.h3}`}>{item.districtName}</h3>
              </div>
              <div>
                <Link
                  href={`/district/${item.districtId}`}
                  className={`button is-info ${styles.btn}`}
                >
                  Засах
                </Link>
                <Link
                  className={`button is-danger`}
                  onClick={(event) => deleteButton(item.districtId)}
                  to={`/districts`}
                >
                  Устгах
                </Link>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DistrictHome;
