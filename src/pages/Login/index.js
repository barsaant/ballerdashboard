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
        props.notify({
          success: false,
          message: err.response.data.error.message,
        });
        setLoading(false);
      });
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
    <div className={`${styles.LoginBox}`}>
      <BrowserRouter>
        <div className={`field`}>
          <label className={`label is-uppercase ${styles.label}`}>
            Email хаяг
          </label>
          <div className={`control`}>
            <input
              className={`input ${styles.input}`}
              type={`text`}
              onChange={handleTypeEmail}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <div className={`field`}>
          <label className={`label is-uppercase ${styles.label}`}>
            Нууц үг
          </label>
          <div className={`control`}>
            <input
              className={`input ${styles.input}`}
              type={`password`}
              onChange={handleTypePassword}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <div className={`field`}>
          <label className={`label`}></label>
          <button
            className={`button is-fullwidth is-uppercase ${styles.btn}`}
            onClick={() => handleSubmit()}
          >
            {" "}
            {loading === false ? <>Нэвтрэх</> : <Loader />}
          </button>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Login;
