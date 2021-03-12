import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import styles from "./_.module.css";
import Loader from "../../Loader";
import { FiPlus, FiSearch, FiEdit3, FiTrash2 } from "react-icons/fi";
import { useHistory, BrowserRouter } from "react-router-dom";

const Zaal = (props) => {
  const [type, setType] = useState("posted");
  const [zaal, setZaal] = useState([]);
  const [loading, setLoading] = useState(true);

  const getZaal = () => {
    setLoading(true);
    axios
      .get(`/sporthalls/${type}`)
      .then((result) => {
        setZaal(result.data.sportHalls);
      })
      .catch((err) => console.log(err.response.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    props.changeSection();
    getZaal();
  }, [type]);

  const history = useHistory();

  const handleAddButton = () => {
    setLoading(true);
    axios
      .post(`/sporthalls`)
      .then((result) => {
        history.push(`/sporthalls/${result.data.sportHall.hallId}`);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  const handleEditButton = (id) => {
    setLoading(true);
    history.push(`/sporthalls/${id}`);
  };

  const moveDelete = (id) => {
    setZaal({ loading: true });
    axios
      .put(`/sporthalls/${id}`, {
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
      .delete(`/sporthalls/${id}`)
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
    <>
      <div className={styles.container}>
        <BrowserRouter>
          <div className={styles.head}>
            <div className={styles.searchContainer}>
              <input className={styles.search} placeholder='Хайх...'></input>
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
                style={{
                  border: type === "deleted" ? "1px solid #949BE3" : "",
                }}
                onClick={setType.bind(this, "deleted")}
              >
                Deleted
              </div>
            </div>
          </div>
          <div className={styles.listContainer}>
            {!loading && (
              <ul className={styles.list}>
                {zaal.map((item) => (
                  <li className={styles.item} key={item.hallId}>
                    <p className={styles.title}>{item.title}</p>
                    <div className={styles.group}>
                      <button
                        className={styles.button}
                        onClick={() => handleEditButton(item.hallId)}
                      >
                        <FiEdit3 />
                      </button>
                      <button
                        className={styles.button}
                        onClick={() => handleDelete(item.hallId)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </li>
                ))}
                <button
                  className={styles.addButton}
                  onClick={() => handleAddButton()}
                >
                  <FiPlus className={styles.icon} />
                </button>
              </ul>
            )}
            {loading && <Loader />}
          </div>
        </BrowserRouter>
      </div>
    </>
  );
};

export default Zaal;
