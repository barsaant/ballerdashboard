import React,{useState} from 'react';
import styles from './_.module.css';
import TagControl from './Controls/TagsControl';
import CategoryControl from './Controls/CategoryControl';

const Articles = (props) => {
  const [section, setSection] = useState("home");

  const sectionHandler = (prop) => {
      setSection(prop);
  };

  let content;
  if (section === "home") {
    content = (
      <div>
        <button className={styles.button} onClick={sectionHandler.bind(this,'categories')}>Ангилал</button>
        <button className={styles.button} onClick={sectionHandler.bind(this,'tags')}>Таг</button>
      </div>
    );
  } else if(section === "categories") {
      content = (<CategoryControl notify={props.notify} jump={sectionHandler}/>);
  } else if (section === "tags") {
      content = (<TagControl notify={props.notify} jump={sectionHandler} />);
  }

  return <div className={styles.container}>{content}</div>;
};

export default Articles;
