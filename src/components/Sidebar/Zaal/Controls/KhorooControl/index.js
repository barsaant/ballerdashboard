import React, { useState, useEffect } from "react";
import axios from "../../../../../axios";
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

  const searchHandler = (arr) => {
    setTemp(arr);
  };

  const getKhoroos = () => {
    setLoading(true);
    axios
      .get(`/districts/${props.id}/khoroos`)
      .then((result) => {
        setKhoroos(result.data.district.khoroos);
        setTemp(result.data.district.khoroos);
      })
      .catch((err) => {
        props.notify({ success: false, message: err.response.data.error.message });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getKhoroos();
  }, []);

  return (
    <div className={styles.container}>
      {!loading && (
        <>
          <div className={styles.head}>
            <SidebarSearch
              search={searchHandler}
              origin={khoroos}
              level={"khoroo"}
            />
            <AddKhoroo
              districtId={props.id}
              notify={props.notify}
              loading={setLoading}
              refresh={getKhoroos}
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
                    refresh={getKhoroos}
                    id={item.khorooId}
                    name={item.khorooName}
                  />
                  <DeleteKhoroo
                    notify={props.notify}
                    loading={setLoading}
                    refresh={getKhoroos}
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
