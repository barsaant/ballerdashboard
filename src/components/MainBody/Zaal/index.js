import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../../config/config.json";
import styles from "./_.module.css";
import Loader from "../../Loader";
import { FiPlus, FiSearch, FiEdit3, FiTrash2 } from "react-icons/fi";
import { useHistory, Link } from "react-router-dom";

const Zaal = () => {
  const [type, setType] = useState("posted");

  const [zaal, setZaal] = useState({
    sporthalls: [],
    loading: true,
  });

  const getZaal = () => {
    setZaal({ loading: true });
    axios
      .get(`${config.SERVER_URL}/sporthalls/${type}`)
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
    setZaal({ loading: true });
    axios
      .put(`${config.SERVER_URL}/sporthalls/${id}`, {
        status: "deleted",
      })
      .then((result) => {
        const del = zaal.sporthalls.filter((zaal) => id !== zaal.hallId);
        setZaal({ sporthalls: del, loading: false });
      })
      .catch((err) => {
        setZaal({ loading: false });
      });
  };

  const deleteHall = (id) => {
    setZaal({ loading: true });
    axios
      .delete(`${config.SERVER_URL}/sporthalls/${id}`)
      .then((result) => {
        const del = zaal.sporthalls.filter((zaal) => id !== zaal.hallId);
        setZaal({ sporthalls: del, loading: false });
      })
      .catch((err) => {
        setZaal({ loading: false });
      });
  };

  const handleDelete = (hallId) => {
    if (type.deleted === false) {
      moveDelete(hallId);
    } else {
      deleteHall(hallId);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.searchContainer}>
          <input className={styles.search} placeholder="Хайх..."></input>
          <button className={styles.button}>
            <FiSearch />
          </button>
        </div>
        <div className={styles.buttonContainer}>
          <div
            className={styles.typeButton}
            style={{ border: type === "posted" ? "1px solid #949BE3" : "" }}
            onClick={setType.bind(this, "posted")}
          >
            Posted
          </div>
          <div
            className={styles.typeButton}
            style={{ border: type === "saved" ? "1px solid #949BE3" : "" }}
            onClick={setType.bind(this, "saved")}
          >
            Saved
          </div>
          <div
            className={styles.typeButton}
            style={{ border: type === "deleted" ? "1px solid #949BE3" : "" }}
            onClick={setType.bind(this, "deleted")}
          >
            Deleted
          </div>
        </div>
      </div>
      <div className={styles.listContainer}>
        <ul className={styles.list}>
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
      <button
        className={styles.addZaalButton}
        onClick={() => handleAddButton()}
      >
        <FiPlus className={styles.icon} />
      </button>
    </div>
  );
};

export default Zaal;
