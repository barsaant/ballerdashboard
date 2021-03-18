import React, { useState } from "react";
import styles from "./_.module.css";
import DistrictControl from "./Controls/DistrictControl";
import KhorooControl from "./Controls/KhorooControl";
import TagControl from "./Controls/TagsControl";

const Zaal = (props) => {
  const [section, setSection] = useState("home");
  const [id, setId] = useState();

  const sectionHandler = (prop) => {
    setSection(prop);
  };

  let content;
  if (section === "home") {
    content = (
      <>
        <div className={styles.heading}>Sporthalls</div>
        <button
          className={styles.button}
          onClick={sectionHandler.bind(this, "districts")}
        >
          Байршил
        </button>
        <button
          className={styles.button}
          onClick={sectionHandler.bind(this, "tags")}
        >
          Таг
        </button>
      </>
    );
  } else if (section === "districts") {
    content = (
      <DistrictControl
        notify={props.notify}
        jump={sectionHandler}
        getId={setId}
      />
    );
  } else if (section === "khoroos") {
    content = (
      <KhorooControl notify={props.notify} jump={sectionHandler} id={id} />
    );
  } else if (section === "tags") {
    content = <TagControl notify={props.notify} jump={sectionHandler} />;
  }

  return <div className={styles.container}>{content}</div>;
};

export default Zaal;
