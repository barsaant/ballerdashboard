import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../../../config/config.json";
import styles from "../Style/_.module.css";
import Loader from "../../../Loader";
import { CSSTransition } from "react-transition-group";
import { FiPlus, FiSearch, FiEdit3, FiTrash2 } from "react-icons/fi";

const ZaalControl = () => {
  const [type, setType] = useState({
    posted: true,
    saved: false,
    deleted: false,
    title: "posted",
  });

  const typePosted = () => {
    setType({ posted: true, saved: false, deleted: false, title: "posted" });
  };
  const typeSaved = () => {
    setType({ posted: false, saved: true, deleted: false, title: "saved" });
  };
  const typeDeleted = () => {
    setType({ posted: false, saved: false, deleted: true, title: "deleted" });
  };

  const [zaal, setZaal] = useState({
    sporthalls: [],
    loading: true,
  });

  const getZaal = () => {
    axios
      .get(`${config.SERVER_URL}/sporthalls/${type.title}`)
      .then((result) => {
        setZaal({ sporthalls: result.data.sportHalls, loading: false });
      })
      .catch((err) => console.log(err.response.data));
  };

  useEffect(() => {
    getZaal();
  }, [type]);

  return (
    <div className={styles.zaalControlContainer}>
      <div className={styles.zaalHeadContainer}>
        <div className={styles.zaalSearchContainer}>
          <input className={styles.zaalSearch} placeholder='Хайх...'></input>
          <button className={styles.button}><FiSearch /></button>
        </div>
        <div className={styles.zaalButtonContainer}>
          <CSSTransition in={type.posted} timeout={100} classNames="btn">
            <div className={styles.zaalButton} onClick={typePosted}>
              Posted
            </div>
          </CSSTransition>
          <CSSTransition in={type.saved} timeout={100} classNames="btn">
            <div className={styles.zaalButton} onClick={typeSaved}>
              Deleted
            </div>
          </CSSTransition>
          <CSSTransition in={type.deleted} timeout={100} classNames="btn">
            <div className={styles.zaalButton} onClick={typeDeleted}>
              Saved
            </div>
          </CSSTransition>
        </div>
      </div>
      <div className={styles.sporthalls}>
        <ul className={styles.zaalContainer}>
          {!zaal.loading &&
            zaal.sporthalls.map((item) => (
              <li className={styles.zaal} key={item.hallId}>
                <p className={styles.zaalTitle}>{item.title}</p>
                <div className={styles.group}>
                  <button className={styles.button}><FiEdit3 /></button>
                  <button className={styles.button}><FiTrash2 /></button>
                </div>
              </li>
            ))}
          {zaal.loading && <Loader />}
        </ul>
      </div>
      <button className={styles.addZaalButton}>
        <FiPlus className={styles.icon} />
      </button>
    </div>
  );
};

export default ZaalControl;
