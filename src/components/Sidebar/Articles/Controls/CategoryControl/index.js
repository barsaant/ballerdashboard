import React, { useState, useEffect } from "react";
import axios from "../../../../../axios";
import styles from "../Style/_.module.css";
import Loader from "../../../../Loader";
import AddCategory from "./addCategory";
import EditCategory from "./editCategory";
import DeleteCategory from "./deleteCategory";
import SidebarSearch from "../SidebarSearch";
import { FiArrowLeft } from "react-icons/fi";

const CategoryControl = (props) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [temp, setTemp] = useState([]);

  const getCategories = () => {
    setLoading(true);
    axios
      .get(`/categories`)
      .then((result) => {
        setCategories(result.data.categories);
        setTemp(result.data.categories);
      })
      .catch((err) => {
        props.notify({ success: false, message: err.response.data.error.message });
      })
      .finally(() => setLoading(false));
  };
  const searchHandler = (arr) => {
    setTemp(arr);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className={styles.container}>
      {!loading && (
        <>
          <div className={styles.head}>
            <SidebarSearch search={searchHandler} origin={categories} level={'category'}/>
            <AddCategory
              notify={props.notify}
              loading={setLoading}
              refresh={getCategories}
            />
          </div>
          <ul className={styles.list}>
            {temp.map((item) => (
              <li className={styles.items} key={item.categoryId}>
                <p className={styles.name}>{item.categoryName}</p>
                <div className={styles.group}>
                  <EditCategory
                    notify={props.notify}
                    loading={setLoading}
                    refresh={getCategories}
                    name={item.categoryName}
                    id={item.categoryId}
                  />
                  <DeleteCategory
                    notify={props.notify}
                    loading={setLoading}
                    refresh={getCategories}
                    id={item.categoryId}
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.backButtonContainer}>
            <button
              className={styles.backButton}
              onClick={props.jump.bind(this, "home")}
            >
              <FiArrowLeft />
            </button>
          </div>
        </>
      )}
      {loading && <Loader />}
    </div>
  );
};

export default CategoryControl;
