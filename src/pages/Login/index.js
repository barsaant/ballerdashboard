import React, { useState } from "react";
import axios from "../../axios";
import { useHistory, BrowserRouter } from "react-router-dom";
import styles from "./_.module.css";
import Loader from "../../components/Loader";
import { FiUser, FiLock } from "react-icons/fi";

const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const login = () => {
    setLoading(true);
    axios
      .post(`/users/signin`, {
        email,
        password,
      })
      .then((result) => {
        history.go(0);
      })
      .catch((err) => {
        if (err.response.data.error.message) {
          const note = {
            success: false,
            message: err.response.data.error.message,
          };
          props.notify(note);
        }
      })
      .finally(() => setLoading(false));
  };

  const handleTypeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleTypePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    login();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      login();
    }
  };

  return (
    <div className={styles.LoginBox}>
      <BrowserRouter>
        <div className={styles.inputContainer}>
          <FiUser className={styles.icon} />
          <input
            placeholder='EMAIL'
            className={styles.input}
            type='text'
            onChange={handleTypeEmail}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className={styles.inputContainer}>
          <FiLock className={styles.icon} />
          <input
            placeholder='PASSWORD'
            className={styles.input}
            type='password'
            onChange={handleTypePassword}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => handleSubmit()}>
            НЭВТРЭХ
            {loading ? (
              <div className={styles.loader}>
                <Loader style={{ color: "#949BE3" }} />
              </div>
            ) : (
              <div className={styles.empty}></div>
            )}
          </button>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Login;
