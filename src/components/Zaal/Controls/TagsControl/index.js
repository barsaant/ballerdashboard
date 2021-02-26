import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../../../config/config.json";
import styles from "../Style/_.module.css";
import Loader from "../../../Loader";
import AddTag from "./addTag";
import EditTag from "./editTag";
import DeleteTag from "./deleteTag";
import SidebarSearch from "../SidebarSearch";

const TagControl = (props) => {

  const [tag, setTag] = useState({
    tags: [],
    error: null,
    loading: true,
    message: null,
  });


  const getTags = () => {
    axios
      .get(`${config.SERVER_URL}/tagshalls`)
      .then((result) => {
        setTag({ tags: result.data.tags, loading: false });
      })
      .catch((err) => console.log(err.response.data));
  };

  useEffect(() => {
    getTags();
  }, []);


  if (!tag.loading) {
    return (
      <div className={styles.container}>
        <div className={styles.head}>
          <SidebarSearch />
          <AddTag loading={setTag} refresh={getTags} />
        </div>
        <ul className={styles.list}>
          {tag.tags.map((item) => (
            <li className={styles.items} key={item.tagId}>
              <p className={styles.name}>{item.tagName}</p>
              <div className={styles.group}>
                <EditTag loading={setTag} refresh={getTags} name={item.tagName} id={item.tagtId} />
                <DeleteTag loading={setTag} refresh={getTags} id={item.tagId} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return <Loader />;
};

export default TagControl;
