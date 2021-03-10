import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Notification from "../../components/Notification";
import styles from "./_.module.css";
import { v4 as uuidv4 } from "uuid";
import Login from "../Login";
import axios from "../../axios";
import Loader from "../../components/Loader";
import { BrowserRouter, Route, useParams } from "react-router-dom";
import PutZaal from "../../components/MainBody/Zaal/PutZaal";
import Home from "../../components/MainBody/Home";
import Articles from "../../components/MainBody/Articles";
import Zaal from "../../components/MainBody/Zaal";
import Media from "../../components/MainBody/Media";
import User from "../../components/MainBody/Users";
import PutArticle from "../../components/MainBody/Articles/PutArticle";

const App = () => {
  const [notifies, setNotifies] = useState([]);
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState("home");

  const sectionHandler = (section) => {
    setSection(section);
  };

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
  };
  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <BrowserRouter>
        {!loading ? (
          <>
            <div className={styles.notifications}>
              <Notification notifications={notifies} delete={delNotification} />
            </div>
            {login ? (
              <>
                <div className={styles.sidebar}>
                  <Sidebar notify={getNotification} section={section} />
                </div>
                <div className={styles.mainBody}>
                  <Route exact path="/">
                    <Home changeSection={sectionHandler} />
                  </Route>
                  <Route exact path="/sporthalls">
                    <Zaal changeSection={sectionHandler}/>
                  </Route>
                  <Route exact path="/media">
                    <Media changeSection={sectionHandler}/>
                  </Route>
                  <Route exact path="/users">
                    <User changeSection={sectionHandler}/>
                  </Route>
                  <Route exact path='/articles/'>
                    <Articles changeSection={sectionHandler} />
                  </Route>
                  <Route exact path='/sporthalls/:id'>
                    <PutZaal changeSection={sectionHandler} />
                  </Route>
                  <Route exact path='/articles/:id'>
                    <PutArticle changeSection={sectionHandler} />
                  </Route>
                </div>
              </>
            ) : (
              <div className={styles.Login}>
                <Login notify={getNotification} />
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
