import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import MainBody from "../../components/MainBody";
import Notification from "../../components/Notification";
import styles from "./_.module.css";
import { v4 as uuidv4 } from "uuid";
import Login from "../Login";
import axios from "../../axios";
import Loader from "../../components/Loader";
import { BrowserRouter, Route } from "react-router-dom";
import PutZaal from "../../components/MainBody/Zaal/PutZaal";

const App = () => {
  const [section, setSection] = useState("home");
  const [notifies, setNotifies] = useState([]);
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const getNotification = (newNotification) => {
    const note = {
      success: newNotification.success,
      message: newNotification.message,
      id: uuidv4(),
    };
    setNotifies([...notifies, note]);
  };
  const delNotification = (id) => {
    const deleted = notifies.filter((item) => item.id !== id);
    setNotifies(deleted);
  };

  const checkLogin = () => {
    if (document.cookie) {
      setLoading(true);
      axios
        .post(`/users/checklogin`)
        .then((result) => {
          setLogin(true);
          setLoading(false);
        })
        .catch((err) => {
          if (err.message) {
            getNotification({ success: false, message: err.message });
          } else {
            getNotification({
              success: false,
              message: err.response.data.error.message,
            });
          }
          setLoading(false);
        });
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div className={styles.body}>
      <BrowserRouter>
        {!loading ? (
          <>
            <div className={styles.notifications}>
              <Notification notifications={notifies} delete={delNotification} />
            </div>
            {login ? (
              <>
                <div className={styles.mainContainer}>
                  <div className={styles.sidebar}>
                    <Sidebar
                      notify={getNotification}
                      setSection={setSection}
                      section={section}
                    />
                  </div>
                  <div className={styles.mainBody}>
                    <Route exact path="/">
                      <MainBody section={section} />
                    </Route>
                    <Route exact path="/sporthalls/:id">
                      <div className={`${styles.putZaal} container is-max-desktop`}>
                        <PutZaal />
                      </div>
                    </Route>
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.Login}>
                <Login />
              </div>
            )}
          </>
        ) : (
          <Loader />
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
