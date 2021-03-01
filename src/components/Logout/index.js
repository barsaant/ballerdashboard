import React from "react";
import styles from "./_.module.css";
import { FiLogOut } from "react-icons/fi";
import { useHistory, BrowserRouter } from "react-router-dom";

const Logout = () => {
  const history = useHistory();
  const handleLogout = () => {
    console.log("daragdlaa");
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    history.push("/");
    history.go(0);
  };
  return (
    <div className={styles.container}>
      <BrowserRouter>
        <button className={styles.button} onClick={() => handleLogout()}>
          <FiLogOut className={styles.icon} />
          ГАРАХ
        </button>
      </BrowserRouter>
    </div>
  );
};

export default Logout;
