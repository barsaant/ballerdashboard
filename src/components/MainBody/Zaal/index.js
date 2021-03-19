import React, { useEffect, useState } from "react";
import axiosCancel from "axios";
import axios from "../../../axios";
import styles from "./_.module.css";
import Loader from "../../Loader";
import { FiPlus, FiSearch, FiEdit3, FiTrash2 } from "react-icons/fi";
import { useHistory, BrowserRouter } from "react-router-dom";

const Zaal = (props) => {
  const [type, setType] = useState("posted");
  const [zaal, setZaal] = useState([]);
  const [loading, setLoading] = useState(true);

  const getZaal = (source) => {
    setLoading(true);
    axios
      .get(`/sporthalls/${type}`, {
        cancelToken: source.token,
      })
      .then((result) => {
        setZaal(result.data.sportHalls);
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
    document.title = "Sporthalls";
    props.changeSection();
    const CancelToken = axiosCancel.CancelToken;
    const source = CancelToken.source();
    getZaal(source);
    return () => {
      source.cancel();
    };
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
    setLoading(true);
    axios
      .put(`/sporthalls/${id}/delete`, {
        status: "deleted",
      })
      .then((result) => {
        const del = zaal.filter((sporthall) => id !== sporthall.hallId);
        setZaal(del);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const deleteHall = (id) => {
    setLoading(true);
    axios
      .delete(`/sporthalls/${id}`)
      .then((result) => {
        const del = zaal.filter((sporthall) => id !== sporthall.hallId);
        setZaal(del);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleDelete = (hallId) => {
    if (type !== "deleted") {
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
            <div className={styles.heading}>Sporthalls</div>
            <div className={styles.searchContainer}>
              <input className={styles.search} placeholder="Хайх..."></input>
              <button className={styles.button}>
                <FiSearch />
              </button>
            </div>
            <button
              className={styles.addButton}
              onClick={() => handleAddButton()}
            >
              <FiPlus className={styles.icon}/>
              <p style={{ marginLeft: "10px" }}>Шинийг үүсгэх</p>
            </button>
          </div>
          <div className={styles.listContainer}>
            <div className={styles.buttonContainer}>
              <div
                className={styles.typeButton}
                style={{
                  backgroundColor: type === "posted" ? "#171717" : "",
                  color: type === "posted" ? "white" : "",
                }}
                onClick={setType.bind(this, "posted")}
              >
                Posted
              </div>
              <div
                className={styles.typeButton}
                style={{
                  backgroundColor: type === "saved" ? "#171717" : "",
                  color: type === "saved" ? "white" : "",
                }}
                onClick={setType.bind(this, "saved")}
              >
                Saved
              </div>
              <div
                className={styles.typeButton}
                style={{
                  backgroundColor: type === "deleted" ? "#171717" : "",
                  color: type === "deleted" ? "white" : "",
                }}
                onClick={setType.bind(this, "deleted")}
              >
                Deleted
              </div>
            </div>
            <ul className={styles.list}>
              {!loading && (
                <>
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
                </>
              )}
              {loading && <Loader />}
            </ul>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
};

export default Zaal;
