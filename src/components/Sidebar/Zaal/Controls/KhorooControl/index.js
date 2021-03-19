import React, { useState, useEffect } from "react";
import axios from "../../../../../axios";
import axiosCancel from "axios";
import styles from "../Style/_.module.css";
import Loader from "../../../../Loader";
import AddKhoroo from "./addKhoroo";
import EditKhoroo from "./editKhoroo";
import DeleteKhoroo from "./deleteKhoroo";
import SidebarSearch from "../SidebarSearch";
import { FiArrowLeft } from "react-icons/fi";

const KhorooControl = (props) => {
  const [khoroos, setKhoroos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [temp, setTemp] = useState([]);
  const [operation, setOperation] = useState(0);

  const getKhoroos = (source) => {
    setLoading(true);
    axios
      .get(`/districts/${props.id}/khoroos`, {
        cancelToken: source.token,
      })
      .then((result) => {
        setKhoroos(result.data.district.khoroos);
        setTemp(result.data.district.khoroos);
      })
      .catch(function (err) {
        if (axiosCancel.isCancel(err)) {
        } else {
          console.log(err);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const CancelToken = axiosCancel.CancelToken;
    const source = CancelToken.source();
    getKhoroos(source);
    return () => {
      source.cancel();
    };
  }, [operation]);

  return (
    <div className={styles.container}>
      {!loading && (
        <>
          <div className={styles.head}>
            <SidebarSearch search={setTemp} origin={khoroos} level={"khoroo"} />
            <AddKhoroo
              districtId={props.id}
              notify={props.notify}
              loading={setLoading}
              refresh={setOperation}
            />
          </div>
          <ul className={styles.list}>
            {temp.map((item) => (
              <li className={styles.items} key={item.khorooId}>
                <p className={styles.name}>{item.khorooName}</p>
                <div className={styles.group}>
                  <EditKhoroo
                    notify={props.notify}
                    loading={setLoading}
                    refresh={setOperation}
                    id={item.khorooId}
                    name={item.khorooName}
                  />
                  <DeleteKhoroo
                    notify={props.notify}
                    loading={setLoading}
                    refresh={setOperation}
                    id={item.khorooId}
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.backButtonContainer}>
            <button
              className={styles.backButton}
              onClick={props.jump.bind(this, "districts")}
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

export default KhorooControl;
