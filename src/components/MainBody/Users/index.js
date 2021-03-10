import React, { useState, useEffect } from "react";
import styles from "./_.module.css";
import axios from "../../../axios";
import { FiPlus, FiSearch, FiEdit3, FiTrash2 } from "react-icons/fi";
import Loader from "../../Loader";
import { useHistory, BrowserRouter } from "react-router-dom";

const Users = (props) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const getUsers = () => {
    setLoading(true);
    axios
      .get(`/users`)
      .then((result) => {
        setUsers(result.data.users);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  useEffect(() => {
    props.changeSection("users");
    getUsers();
  }, []);

  const handleAddButton = () => {
    history.push(`/users/create`);
  };

  const handleEditButton = (id) => {
    history.push(`/user/${id}`);
  };

  const handleDeleteButton = (id) => {
    setLoading(true);
    axios
      .delete(`/users/${id}`)
      .then((result) => {
        const del = users.filter((user) => id !== user.userId);
        setUsers(del);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <BrowserRouter>
        <div className={styles.head}>
          <div className={styles.searchContainer}>
            <input className={styles.search} placeholder="Хайх..."></input>
            <button className={styles.button}>
              <FiSearch />
            </button>
          </div>
        </div>
        <div className={styles.listContainer}>
          {!loading && (
            <ul className={styles.list}>
              {users.map((item) => (
                <li className={styles.item} key={item.userId}>
                  <div className={styles.info}>
                    <h1 className={styles.name}>
                      {item.firstname} {item.lastname}
                    </h1>
                    <p className={styles.email}>{item.email}</p>
                  </div>
                  <div className={styles.group}>
                    <button
                      className={styles.button}
                      onClick={() => handleEditButton(item.userId)}
                    >
                      <FiEdit3 />
                    </button>
                    <button
                      className={styles.button}
                      onClick={() => handleDeleteButton(item.userId)}
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
  );
};

export default Users;
