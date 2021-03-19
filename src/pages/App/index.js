import React, { useState, useEffect, lazy, Suspense, Switch } from "react";
import Sidebar from "../../components/Sidebar";
import Notification from "../../components/Notification";
import styles from "./_.module.css";
import { v4 as uuidv4 } from "uuid";
import Login from "../Login";
import axios from "../../axios";
import Loader from "../../components/Loader";
import { BrowserRouter, Route } from "react-router-dom";
import PutZaal from "../../components/MainBody/Zaal/PutZaal";
import Home from "../../components/MainBody/Home";
import Articles from "../../components/MainBody/Articles";
import Zaal from "../../components/MainBody/Zaal";
import Media from "../../components/MainBody/Media";
import PutArticle from "../../components/MainBody/Articles/PutArticle";

const User = lazy(() => {
  return import("../../components/MainBody/Users");
});
const EditUser = lazy(() => {
  return import("../../components/MainBody/Users/EditUser");
});
const CreateUser = lazy(() => {
  return import("../../components/MainBody/Users/CreateUser");
});

const App = () => {
  const [notifies, setNotifies] = useState([]);
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState("");

  const getNotification = (newNotification) => {
    const note = {
      success: newNotification.success,
      message: newNotification.message,
      id: uuidv4(),
    };
    setNotifies([...notifies, note]);
  };
  const delNotification = (id) => {
    setNotifies(notifies.filter((item) => item.id !== id));
  };
  const check = () => {
    console.log(notifies);
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
              <Notification
                notifications={notifies}
                delete={delNotification}
              />
            </div>
            <Suspense fallback={<div></div>}>
              {login ? (
                <>
                  <div className={styles.sidebar}>
                    <Sidebar notify={getNotification} section={section} />
                  </div>
                  <div className={styles.mainBody}>
                    <Route exact path="/">
                      <Home changeSection={setSection.bind(this, "home")} />
                    </Route>
                    <Route exact path="/sporthalls">
                      <Zaal
                        changeSection={setSection.bind(this, "sporthalls")}
                      />
                    </Route>
                    <Route exact path="/media">
                      <Media
                        notify={getNotification}
                        changeSection={setSection.bind(this, "medias")}
                        type={"medias"}
                        button={false}
                      />
                    </Route>
                    <Route exact path="/users">
                      <User changeSection={setSection.bind(this, "users")} />
                    </Route>
                    <Route exact path="/articles/">
                      <Articles
                        changeSection={setSection.bind(this, "articles")}
                      />
                    </Route>
                    <Route exact path="/sporthalls/:id">
                      <PutZaal
                        notify={getNotification}
                        changeSection={setSection.bind(this, "sporthalls")}
                      />
                    </Route>
                    <Route exact path="/articles/:id">
                      <PutArticle
                        notify={getNotification}
                        changeSection={setSection.bind(this, "articles")}
                      />
                    </Route>
                    <Route exact path="/user/:id">
                      <EditUser
                        notify={getNotification}
                        changeSection={setSection.bind(this, "users")}
                      />
                    </Route>
                    <Route exact path="/users/create">
                      <CreateUser
                        changeSection={setSection.bind(this, "users")}
                      />
                    </Route>
                  </div>
                </>
              ) : (
                <div className={styles.Login}>
                  <Login notify={getNotification} />
                </div>
              )}
            </Suspense>
          </>
        ) : (
          <Loader />
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
