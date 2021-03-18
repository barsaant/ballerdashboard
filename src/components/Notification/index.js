import React from "react";
import styles from "./_.module.css";
import { FiCheck, FiX } from "react-icons/fi";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Notification = (props) => {
  return (
    <TransitionGroup className={styles.container}>
      {props.notifications.map((item) => (
        <CSSTransition
          key={item.id}
          timeout={300}
          classNames="notification"
          onEntered={() => {
            setTimeout(() => props.delete(item.id), 4000);
          }}
        >
          <div className={styles.notification}>
            <div className={styles.iconContainer}>
              {item.success && (
                <FiCheck className={styles.icon} style={{ color: "green" }} />
              )}
              {!item.success && (
                <FiX className={styles.icon} style={{ color: "red" }} />
              )}
            </div>
            <div className={styles.messageContainer}>
              {item.success && <h1 className={styles.success}>Амжилттай</h1>}
              {!item.success && <h1 className={styles.success}>Алдаа</h1>}
              <p className={styles.message}>{item.message}</p>
            </div>
            <button
              className={styles.button}
              onClick={() => {
                props.delete(item.id);
              }}
            >
              <FiX className={styles.icon} />
            </button>
          </div>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default Notification;
