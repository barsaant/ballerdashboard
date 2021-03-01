import React,{ useState } from "react";
import Sidebar from "../../components/Sidebar";
import Notification from "../../components/Zaal/Notification";
import styles from "./_.module.css";
import {v4 as uuidv4} from 'uuid';
import ZaalControl from '../../components/Zaal/Controls/ZaalControl';

const App = () => {
  const [notifies,setNotifies] = useState([]);

  const getNotification = (newNotification) => {
    const note = {
      success: newNotification.success,
      message: newNotification.message,
      id: uuidv4()
    };
    setNotifies([...notifies,note]);
  };

  const delNotification = (id) => {
    const deleted = notifies.filter((item) => item.id!==id);
    setNotifies(deleted);
  };
  const haha = (id) => {
    console.log(notifies.find((item) => item.id===id));
  }


  return (
    <div className={styles.body}>
      <div className={styles.sidebar}>
        <Sidebar notify={getNotification} />
      </div>
      <div className={styles.notifications}>
        <Notification notifications={notifies} delete={delNotification} haha={haha} />
      </div>
      <div className={styles.zaal} >
        <ZaalControl />
      </div>
    </div>
  );
};

export default App;
