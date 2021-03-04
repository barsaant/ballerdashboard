import React from "react";
import { useHistory, BrowserRouter } from "react-router-dom";
import styles from "../_.module.css";
import { FiLogOut } from "react-icons/fi";

const Logout = () => {
  const history = useHistory();
  const handleLogout = () => {
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    history.push("/");
    history.go(0);
  };
  return (
    <div>
      <BrowserRouter>
        <div className={styles.button} onClick={handleLogout}>
          <FiLogOut className={styles.icon} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Logout;
