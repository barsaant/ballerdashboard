import React from "react";
import styles from "./_.module.css";
import { FiCheck, FiX } from "react-icons/fi";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Notification = (props) => {
  return (
      <TransitionGroup className={styles.container}>
        {props.notifications.map((item) => (
          <CSSTransition key={item.id} timeout={300} classNames="notification" onEntered={() => setTimeout(props.haha.bind(this,item.id),5500)}>
            <div className={styles.notification}>
              <div className={styles.iconContainer}>
                {item.success && <FiCheck className={styles.icon} style={{color: 'green'}}/>}
                {!item.success && <FiX className={styles.icon} style={{color: 'red'}}/>}
              </div>
              <p className={styles.message}>{item.message}</p>
              <button className={styles.button} onClick={props.delete.bind(this, item.id)} >
                <FiX className={styles.icon} />
              </button>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
  );
};

export default Notification;
