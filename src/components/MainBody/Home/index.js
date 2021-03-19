import React, { useEffect } from "react";
import styles from "./_.module.css";

const Home = (props) => {
  useEffect(() => {
    props.changeSection();
    document.title = "Dashboard";
  }, []);
  return (
    <div className={styles.container}>
      {/* <img className={styles.image} src={barsa}></img> */}
    </div>
  );
};

export default Home;
