import React, { useState } from "react";
import styles from "./_.module.css";
import {
  FiMenu,
  FiHome,
  FiDribbble,
  FiEdit,
  FiFolder,
  FiUser,
} from "react-icons/fi";
import { CSSTransition } from "react-transition-group";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import Zaal from "./Zaal";
import Articles from "./Articles";
const Sidebar = (props) => {
  const [open, setOpen] = useState(true);

  let content;
  if (props.section === "home") {
    content = <div></div>;
  } else if (props.section === "sporthalls") {
    content = <Zaal notify={props.notify} />;
  } else if (props.section === "articles") {
    content = <Articles notify={props.notify} />;
  }
  const openHandler = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.button} onClick={openHandler}>
          <FiMenu className={styles.icon} />
        </div>
        <Link to="/">
          <div
            className={styles.button}
            style={{
              color: props.section === "home" ? "white" : "",
              backgroundColor: props.section === "home" ? "#949be3" : ""
            }}
          >
            <FiHome className={styles.icon} />
          </div>
        </Link>
        <div className={styles.buttonContainer}>
          <Link to="/sporthalls">
            <div
              className={styles.button}
              style={{
                color: props.section === "sporthalls" ? "white" : "",
                backgroundColor: props.section === "sporthalls" ? "#949be3" : ""
              }}
            >
              <FiDribbble className={styles.icon} />
            </div>
          </Link>
          <Link to="/articles">
            <div
              className={styles.button}
              style={{
                color: props.section === "articles" ? "white" : "",
                backgroundColor: props.section === "articles" ? "#949be3" : ""
              }}
            >
              <FiEdit className={styles.icon} />
            </div>
          </Link>
          <Link to="/media">
            <div
              className={styles.button}
              style={{
                color: props.section === "medias" ? "white" : "",
                backgroundColor: props.section === "medias" ? "#949be3" : ""
              }}
            >
              <FiFolder className={styles.icon} />
            </div>
          </Link>
          <Link to="/users">
            <div
              className={styles.button}
              style={{
                color: props.section === "users" ? "white" : "",
                backgroundColor: props.section === "users" ? "#949be3" : ""
              }}
            >
              <FiUser className={styles.icon} />
            </div>
          </Link>
        </div>
        <Logout />
      </div>
      <CSSTransition
        in={open}
        appear={true}
        timeout={200}
        classNames="subSidebar"
      >
        <div className={styles.subContainer}>
          {content}
        </div>
      </CSSTransition>
    </div>
  );
};

export default Sidebar;
