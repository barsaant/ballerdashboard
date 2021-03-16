import React, { useState, useEffect } from "react";
import axios from "../../../../../axios";
import axiosCancel from "axios";
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
  const [operation, setOperation] = useState(0);

  const getCategories = (source) => {
    setLoading(true);
    axios
      .get(`/categories`, {
        cancelToken: source.token,
      })
      .then((result) => {
        setCategories(result.data.categories);
        setTemp(result.data.categories);
      })
      .catch(function (err) {
        if (axiosCancel.isCancel(err)) {
          console.log("req fail", err.message);
        } else {
          console.log(err);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const CancelToken = axiosCancel.CancelToken;
    const source = CancelToken.source();
    getCategories(source);
    return () => {
      source.cancel();
    };
  }, [operation]);

  return (
    <div className={styles.container}>
      {!loading && (
        <>
          <div className={styles.head}>
            <SidebarSearch
              search={setTemp}
              origin={categories}
              level={"category"}
            />
            <AddCategory
              notify={props.notify}
              loading={setLoading}
              refresh={setOperation}
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
                    refresh={setOperation}
                    name={item.categoryName}
                    id={item.categoryId}
                  />
                  <DeleteCategory
                    notify={props.notify}
                    loading={setLoading}
                    refresh={setOperation}
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
