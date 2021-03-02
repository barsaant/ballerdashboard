import React, { useState } from "react";
import Tags from "./Tags";
import Districts from "./Districts";
import styles from "./_.module.css";

const Zaal = (props) => {
  const [open, setOpen] = useState(false);

  const makeOpen = () => {
    setOpen(true);
  };
  const makeClose = () => {
    setOpen(false);
  };

  let content = (
    <button className={styles.button} onClick={makeOpen}>
      Заал
    </button>
  );

  if (open) {
    content = (
      <div>
        <Districts notify={props.notify} close={makeClose} />
        <Tags close={makeClose} />
      </div>
    );
  }

  return <div className={styles.container}>{content}</div>;
};

export default Zaal;
