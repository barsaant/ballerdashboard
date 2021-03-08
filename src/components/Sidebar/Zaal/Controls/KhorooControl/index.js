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
  const [khoroo, setKhoroo] = useState({
    khoroos: [],
    loading: true,
  });
  const [temp, setTemp] = useState([]);

  const searchHandler = (arr) => {
    setTemp(arr);
  };

  const getKhoroos = () => {
    axios
      .get(`/districts/${props.id}/khoroos`)
      .then((result) => {
        setKhoroo({ khoroos: result.data.district.khoroos, loading: false });
        setTemp(result.data.district.khoroos);
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
    getKhoroos();
  }, []);

  if (!khoroo.loading) {
    return (
      <div className={styles.container}>
        <div className={styles.head}>
          <SidebarSearch
            search={searchHandler}
            origin={khoroo.khoroos}
            level={"khoroo"}
          />
          <AddKhoroo
            districtId={props.id}
            notify={props.notify}
            loading={setKhoroo}
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
                  loading={setKhoroo}
                  refresh={getKhoroos}
                  id={item.khorooId}
                  name={item.khorooName}
                />
                <DeleteKhoroo
                  notify={props.notify}
                  loading={setKhoroo}
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
      </div>
    );
  }
  return <Loader />;
};

export default KhorooControl;
