import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useHistory, Link } from "react-router-dom";
import axios from "axios";
import config from "../../../../config/config.json";
import styles from "../Style/_.module.css";
import Loader from "../../../Loader";
import { CSSTransition } from "react-transition-group";
import { FiPlus, FiSearch, FiEdit3, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

const ZaalControl = () => {
  const [type, setType] = useState({
    posted: true,
    saved: false,
    deleted: false,
    title: "posted",
  });
  const [loading, setLoading] = useState(false);

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

  const history = useHistory();

  const handleAddButton = () => {
    axios
      .post(`${config.SERVER_URL}/sporthalls`)
      .then((result) => {
        console.log(result);
        history.push(`/sporthalls/${result.data.sportHall.hallId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const moveDelete = (id) => {
    setLoading(true);
    axios
      .put(`${config.SERVER_URL}/sporthalls/${id}`, {
        status: "deleted",
      })
      .then((result) => {
        const del = zaal.sporthalls.filter((zaal) => id !== zaal.hallId);
        setZaal({ sporthalls: del });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const deleteHall = (id) => {
    setLoading(true);
    axios
      .delete(`${config.SERVER_URL}/sporthalls/${id}`)
      .then((result) => {
        const del = zaal.sporthalls.filter((zaal) => id !== zaal.hallId);
        setZaal({ sporthalls: del });
        setLoading(false);
        toast.success(result.data.message);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleDelete = (hallId) => {
    if (type.deleted === false) {
      moveDelete(hallId);
    } else {
      deleteHall(hallId);
    }
  };

  let hallId;

  return (
    <div className={styles.zaalControlContainer}>
      <div className={styles.zaalHeadContainer}>
        <div className={styles.zaalSearchContainer}>
          <input className={styles.zaalSearch} placeholder='Хайх...'></input>
          <button className={styles.button}>
            <FiSearch />
          </button>
        </div>
        <div className={styles.zaalButtonContainer}>
          <CSSTransition in={type.posted} timeout={100} classNames='btn'>
            <div className={styles.zaalButton} onClick={typePosted}>
              Posted
            </div>
          </CSSTransition>
          <CSSTransition in={type.saved} timeout={100} classNames='btn'>
            <div className={styles.zaalButton} onClick={typeSaved}>
              Saved
            </div>
          </CSSTransition>
          <CSSTransition in={type.deleted} timeout={100} classNames='btn'>
            <div className={styles.zaalButton} onClick={typeDeleted}>
              Deleted
            </div>
          </CSSTransition>
        </div>
      </div>
      {loading === false ? (
        <>
          <div className={styles.sporthalls}>
            <ul className={styles.zaalContainer}>
              {!zaal.loading &&
                zaal.sporthalls.map((item) => (
                  <li className={styles.zaal} key={item.hallId}>
                    <p className={styles.zaalTitle}>{item.title}</p>
                    <div className={styles.group}>
                      <Link
                        className={styles.button}
                        to={`/sporthalls/${item.hallId}`}
                      >
                        <FiEdit3 />
                      </Link>

                      <button
                        className={styles.button}
                        value={item.hallId}
                        onClick={() => handleDelete(item.hallId)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </li>
                ))}
              {zaal.loading && <Loader />}
            </ul>
          </div>
        </>
      ) : (
        <></>
      )}
      <button
        className={styles.addZaalButton}
        onClick={() => handleAddButton()}
      >
        <FiPlus className={styles.icon} />
      </button>
    </div>
  );
};

export default ZaalControl;
