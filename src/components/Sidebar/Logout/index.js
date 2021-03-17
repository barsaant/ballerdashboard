import React from "react";
import { useHistory, BrowserRouter } from "react-router-dom";
import styles from "../_.module.css";
import { FiLogOut } from "react-icons/fi";
import axiosLogin from "../../../axiosLogin";

const Logout = () => {
  const history = useHistory();
  const handleLogout = () => {
    axiosLogin
      .post(`/users/signout`)
      .then((result) => {
        history.push("/");
        history.go(0);
      })
      .catch((err) => {
        console.log(err);
      });
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
