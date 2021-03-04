import React from "react";
import styles from "./_.module.css";
import Zaal from "./Zaal";
import Home from "./Home";

const MainBody = (props) => {
  let content;
  if (props.section === "home") {
    content = <Home />;
  } else if (props.section === "zaal") {
      content = <Zaal />;
  }

  return <div className={styles.container}>{content}</div>;
};

export default MainBody;
