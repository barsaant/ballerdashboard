import React, { useState } from "react";
import { useHistory, BrowserRouter } from "react-router-dom";
import styles from "../_.module.css";
import { FiLogOut } from "react-icons/fi";
import axios from "../../../axios";

const Logout = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const handleLogout = () => {
    setLoading(true);
    axios
      .post(`users/signout`)
      .then((result) => {
        history.push("/");
        history.go(0);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div>
      <BrowserRouter>
        <div className={styles.button} onClick={handleLogout}>
          {!loading ? <FiLogOut className={styles.icon} /> : <Loader />}
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Logout;
