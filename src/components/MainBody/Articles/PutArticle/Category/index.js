import React, { useState, useEffect } from "react";
import styles from "../_.module.css";
import axios from "../../../../../axios";
import axiosCancel from "axios";
import Loader from "../../../../Loader";
import { CSSTransition } from "react-transition-group";
import msStyle from "./_.module.css";
import { FiX } from "react-icons/fi";

const Category = (props) => {
  const [dropdown, setDropdown] = useState(true);
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(props.current);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [unSelectedCategories, setUnselectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [temp, setTemp] = useState([]);

  const addCategory = (newCategory) => {
    setSelectedCategories([...selectedCategories, newCategory]);
    setCategoryId([...categoryId, newCategory.categoryId]);
  };
  const removeCategory = (newCategory) => {
    const removed = selectedCategories.filter(
      (item) => item.categoryId !== newCategory.categoryId
    );
    const idRemoved = categoryId.filter(
      (item) => item !== newCategory.categoryId
    );
    setSelectedCategories(removed);
    setCategoryId(idRemoved);
  };
  const getCategories = (source) => {
    setLoading(true);
    axios
      .get(`/categories`, {
        cancelToken: source.token,
      })
      .then((result) => {
        setCategories(result.data.categories);
        setUnselectedCategories(
          result.data.categories.filter(
            (item) => !categoryId.includes(item.categoryId)
          )
        );
        setSelectedCategories(
          result.data.categories.filter((item) =>
            categoryId.includes(item.categoryId)
          )
        );
        setTemp(
          result.data.categories.filter(
            (item) => !categoryId.includes(item.categoryId)
          )
        );
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
  const handleSearch = (e) => {
    if (e.target.value === "") {
      setTemp(unSelectedCategories);
    } else {
      setTemp(
        unSelectedCategories.filter((item) =>
          item.categoryName.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };
  useEffect(() => {
    const CancelToken = axiosCancel.CancelToken;
    const source = CancelToken.source();
    getCategories(source);
    return () => {
      source.cancel();
    };
  }, []);
  useEffect(() => {
    setTemp(categories.filter((item) => !categoryId.includes(item.categoryId)));
    setSelectedCategories(
      categories.filter((item) => categoryId.includes(item.categoryId))
    );
    props.change(categoryId);
  }, [categoryId]);

  return (
    <div className={styles.field}>
      <h1 className={styles.label}>Ангилал</h1>
      {!loading && (
        <div className={msStyle.container}>
          {selectedCategories.map((item) => (
            <div className={msStyle.selected} key={item.categoryId}>
              {item.categoryName}
              <button
                className={msStyle.button}
                onClick={removeCategory.bind(this, item)}
              >
                <FiX />
              </button>
            </div>
          ))}
          <div className={msStyle.inputContainer}>
            <input
              className={msStyle.input}
              type={`text`}
              onFocus={() => setDropdown(false)}
              onBlur={() => setDropdown(true)}
              onChange={handleSearch}
            />
            <CSSTransition
              in={dropdown}
              appear={true}
              timeout={200}
              classNames="tagDropdown"
            >
              <div className={msStyle.dropdownContainer}>
                {temp.map((item) => (
                  <div
                    key={item.categoryId}
                    className={msStyle.option}
                    onClick={addCategory.bind(this, item)}
                  >
                    {item.categoryName}
                  </div>
                ))}
              </div>
            </CSSTransition>
          </div>
        </div>
      )}
      {loading && (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Category;
