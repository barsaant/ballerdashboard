import React, { useState, useEffect } from "react";
import styles from "./_.module.css";
import axios from "../../../axios";
import { FiPlus, FiSearch, FiEdit3, FiTrash2 } from "react-icons/fi";
import Loader from "../../Loader";
import { Link } from "react-router-dom";

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const getImages = () => {
    axios
      .get(`/users`)
      .then((result) => {
        setUsers(result.data.users);
        console.log(result.data.users);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getImages();
  }, []);
  return (
    <div className={styles.container}>
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
                  <button className={styles.button}>
                    <FiEdit3 />
                  </button>
                  <button className={styles.button}>
                    <FiTrash2 />
                  </button>
                </div>
              </li>
            ))}
            <button className={styles.addButton}>
              <FiPlus className={styles.icon} />
            </button>
          </ul>
        )}
        {loading && <Loader />}
      </div>
    </div>
  );
};

export default Users;
