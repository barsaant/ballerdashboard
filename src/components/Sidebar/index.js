import React, { useState } from "react";
import styles from "./_.module.css";
import { FiMenu, FiHome, FiDribbble } from "react-icons/fi";
import { CSSTransition } from "react-transition-group";
import Zaal from "./Zaal";
import Logout from "./Logout";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  const [open, setOpen] = useState(true);

  const openHandler = () => {
    setOpen(!open);
  };

  let content;
  if (props.section === "home") {
    content = <div></div>;
  } else if (props.section === "zaal") {
    content = (
      <div className={styles.sub}>
        <Zaal notify={props.notify} />
      </div>
    );
  }

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
              border: props.section === "home" ? "1px solid #949BE3" : "",
            }}
            onClick={props.setSection.bind(this, "home")}
          >
            <FiHome className={styles.icon} />
          </div>
        </Link>
        <div className={styles.buttonContainer}>
          <div
            className={styles.button}
            style={{
              border: props.section === "zaal" ? "1px solid #949BE3" : "",
            }}
            onClick={props.setSection.bind(this, "zaal")}
          >
            <FiDribbble className={styles.icon} />
          </div>
        </div>
        <Logout />
      </div>
      <CSSTransition
        in={open}
        appear={true}
        timeout={200}
        classNames="subSidebar"
      >
        <div className={styles.subContainer}>{content}</div>
      </CSSTransition>
    </div>
  );
};

export default Sidebar;
