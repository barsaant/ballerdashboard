import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { BrowserRouter, Route } from "react-router-dom";
import Notification from "../../components/Zaal/Notification";
import styles from "./_.module.css";
import { v4 as uuidv4 } from "uuid";
import ZaalControl from "../../components/Zaal/Controls/ZaalControl";
import PutZaal from "../../components/Zaal/PutZaal";
import { ToastContainer, toast } from "react-toastify";
import Login from "../Login";
import axios from "../../axios";
import Loader from "../../components/Loader";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [notifies, setNotifies] = useState([]);

  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);

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
            toast.error(err.message);
          } else {
            toast.error(err.response.data.error.message);
          }
          setLoading(false);
        });
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);

  // const getNotification = (newNotification) => {
  //   const note = {
  //     success: newNotification.success,
  //     message: newNotification.message,
  //     id: uuidv4(),
  //   };
  //   setNotifies([...notifies, note]);
  // };

  // const delNotification = (id) => {
  //   const deleted = notifies.filter((item) => item.id !== id);
  //   setNotifies(deleted);
  // };
  // const haha = (id) => {
  //   console.log(notifies.find((item) => item.id === id));
  // };

  return (
    <div className={styles.body}>
      <BrowserRouter>
        {loading === false ? (
          <>
            <ToastContainer
              hideProgressBar
              position='bottom-right'
              autoClose={3000}
            />
            {login === true ? (
              <>
                <div className={styles.sidebar}>
                  {/* <Sidebar notify={getNotification} /> */}
                  <Sidebar />
                </div>
                {/* <div className={styles.notifications}>
        <Notification
          notifications={notifies}
          delete={delNotification}
          haha={haha}
        />
      </div> */}
                <div className={styles.zaal}>
                  <Route exact path='/' component={ZaalControl} />
                  <div className={`container is-max-desktop ${styles.putZaal}`}>
                    <Route exact path='/sporthalls/:id' component={PutZaal} />
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
