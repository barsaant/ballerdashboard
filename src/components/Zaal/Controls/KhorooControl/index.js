import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../../../config/config.json";
import styles from "../Style/_.module.css";
import Loader from "../../../Loader";
import AddKhoroo from "./addKhoroo";
import EditKhoroo from "./editKhoroo";
import DeleteKhoroo from "./deleteKhoroo";
import SidebarSearch from "../SidebarSearch";

const KhorooControl = (props) => {

  const [khoroo, setKhoroo] = useState({
    khoroos: [],
    error: null,
    loading: true,
    message: null,
  });


  const getKhoroos = () => {
    axios
      .get(`${config.SERVER_URL}/districts/${props.districtId}/khoroos`)
      .then((result) => {
        setKhoroo({ khoroos: result.data.district.khoroos, loading: false });
      })
      .catch((err) => console.log(err.response.data));
  };

  useEffect(() => {
    getKhoroos();
  }, [props.districtId]);


  if (!khoroo.loading) {
    return (
      <div className={styles.container}>
        <div className={styles.head}>
          <SidebarSearch />
          <AddKhoroo loading={setKhoroo} refresh={getKhoroos} />
        </div>
        <ul>
          {khoroo.khoroos.map((item) => (
            <li className={styles.items} key={item.khorooId}>
              <p className={styles.name}>{item.khorooName}</p>
              <div className={styles.group}>
                <EditKhoroo loading={setKhoroo} refresh={getKhoroos} id={item.khorooId} name={item.khorooName} />
                <DeleteKhoroo loading={setKhoroo} refresh={getKhoroos} id={item.khorooId} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return <Loader />;
};

export default KhorooControl;
