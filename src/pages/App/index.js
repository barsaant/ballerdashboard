import React from "react";
import Sidebar from "../../components/Sidebar";
import styles from "./_.module.css";

const App = () => {
  return (
    <div>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
    </div>
  );
};

export default App;
