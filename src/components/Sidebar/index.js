import React, { useState } from "react";
import styles from "./_.module.css";
import { FiMenu, FiHome, FiDribbble, FiEdit, FiFolder, FiUser } from "react-icons/fi";
import { CSSTransition } from "react-transition-group";
import Logout from "./Logout";
import { Link, useParams } from "react-router-dom";
import Zaal from "./Zaal";
import Articles from "./Articles";

const Sidebar = (props) => {
  const [open, setOpen] = useState(true);
  const params = useParams();

  let content;
  if(props.section === 'home') {
    content = <div></div>
  } else if (props.section === 'sporthalls') {
    content = <Zaal />
  } else if (props.section === 'articles') {
    content = <Articles />
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
            style={{border: props.section === 'home' ? '1px solid #949be3' : ''}}
          >
            <FiHome className={styles.icon} />
          </div>
        </Link>
        <div className={styles.buttonContainer}>
          <Link to="/sporthalls">
            <div
              className={styles.button}
              style={{border: props.section === 'sporthalls' ? '1px solid #949be3' : ''}}
            >
              <FiDribbble className={styles.icon} />
            </div>
          </Link>
          <Link to="/articles">
            <div
              className={styles.button}
              style={{border: props.section === 'articles' ? '1px solid #949be3' : ''}}
            >
              <FiEdit className={styles.icon} />
            </div>
          </Link>
          <Link to="/media">
            <div
              className={styles.button}
              style={{border: props.section === 'media' ? '1px solid #949be3' : ''}}
            >
              <FiFolder className={styles.icon} />
            </div>
          </Link>
          <Link to="/users">
            <div
              className={styles.button}
              style={{border: props.section === 'users' ? '1px solid #949be3' : ''}}
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
           <Zaal />
        </div>
      </CSSTransition>
    </div>
  );
};

export default Sidebar;
