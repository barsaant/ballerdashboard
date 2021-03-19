import React, { useState, useEffect } from "react";
import styles from "../user.module.css";
import axios from "../../../../axios";
import Loader from "../../../Loader";
import { BrowserRouter, useHistory } from "react-router-dom";

const CreateUser = (props) => {
  const [loading, setLoading] = useState(false);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState("user");

  const history = useHistory();

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRole = (e) => {
    setRole(e.target.value);
  };

  const handleClick = () => {
    setLoading(true);
    axios
      .post(`/users`, {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
      })
      .then((result) => {
        props.notify({
          success: true,
          message: result.data.message,
        });
        history.push("/users");
      })
      .catch((err) => {
        props.notify({
          success: false,
          message: err.response.data.error.message,
        });
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    document.title = "User";
  },[]);

  return (
    <div className={styles.mainContainer}>
      <BrowserRouter>
        {!loading && (
          <div className={styles.container}>
            <div className={styles.field}>
              <h1 className={styles.label}>Овог</h1>
              <input
                className={styles.input}
                type={`text`}
                onChange={handleLastName}
              />
            </div>
            <div className={styles.field}>
              <h1 className={styles.label}>Нэр</h1>
              <input
                className={styles.input}
                type={`text`}
                onChange={handleFirstName}
              />
            </div>
            <div className={styles.field}>
              <h1 className={styles.label}>Email</h1>
              <input
                className={styles.input}
                type={`email`}
                onChange={handleEmail}
              />
            </div>
            <div className={styles.field}>
              <h1 className={styles.label}>Нууц үг</h1>
              <input
                className={styles.input}
                type={`password`}
                onChange={handlePassword}
              />
            </div>
            <div className={styles.field}>
              <h1 className={styles.label}>Role</h1>
              <select
                className={styles.select}
                onChange={handleRole}
                value={role}
              >
                <option value="user">Хэрэглэгч</option>
                <option value="publisher">Нийтлэгч</option>
                <option value="admin">Админ</option>
                <option value="superadmin">Суперадмин</option>
              </select>
            </div>
            <div className={styles.field}>
              <button className={styles.button} onClick={() => handleClick()}>
                Хадгалах
              </button>
            </div>
          </div>
        )}
        {loading && <Loader />}
      </BrowserRouter>
    </div>
  );
};
export default CreateUser;
