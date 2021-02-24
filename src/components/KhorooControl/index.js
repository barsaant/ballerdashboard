import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config/config.json";
import styles from "./_.module.css";
import { FiX, FiEdit3, FiArrowLeft, FiSearch, FiPlus, FiLoader } from "react-icons/fi";

const Khoroos = (props) => {
  const [newKhoroo, setNewKhoroo] = useState("");
  const [khoroo, setKhoroo] = useState({
    khoroos: [],
    error: null,
    loading: true,
    message: null,
  });

  const handleChange = (e) => {
    if (e.target.value !== "") {
      setNewKhoroo(e.target.value);
    }
  };

  const getKhoroos = (districtId) => {
    axios
      .get(`${config.SERVER_URL}/districts/${districtId}/khoroos`)
      .then((result) => {
        console.log(result);
        setKhoroo({ khoroos: result.data.district.khoroos, loading: false });
      })
      .catch((err) => console.log(err.response.data));
  };

  useEffect(() => {
    getKhoroos(props.districtId);
  }, [props.districtId]);

  const postKhoroo = () => {
    setKhoroo({ loading: true });
    axios
      .post(`${config.SERVER_URL}/khoroos`, {
        khorooName: newKhoroo,
        districtId: props.districtId
      })
      .then((result) => {
        console.log(result.data.message);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => getKhoroos(props.districtId));
  };

  const handleSubmit = (e) => {
    postKhoroo();
  };

  const deleteKhoroo = (khorooId) => {
    setKhoroo({ loading: true });
    axios
      .delete(`${config.SERVER_URL}/khoroos/${khorooId}`)
      .then((result) => alert(result.data.message))
      .catch((err) => alert(err.message))
      .finally(() => getKhoroos(props.districtId));
  };

  if (!khoroo.loading) {
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
          <input className={styles.input} onChange={handleChange} />
          <button className={styles.button} onClick={handleSubmit}>
            <FiPlus />
          </button>
        </div>
        <ul>
          {khoroo.khoroos.map((item) => (
            <li className={styles.items} key={item.khorooId}>
              <h5 className={styles.h5}>{item.khorooName}</h5>
              <div className={styles.group}>
                <button className={styles.button}>
                  <FiEdit3 />
                </button>
                <button
                  className={styles.button}
                  onClick={() => deleteKhoroo(item.khorooId)}
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

export default Khoroos;
