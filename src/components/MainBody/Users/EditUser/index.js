import React, { useState, useEffect } from "react";
import styles from "../user.module.css";
import axios from "../../../../axios";
import axiosCancel from "axios";
import Loader from "../../../Loader";
import { BrowserRouter, useHistory, useParams } from "react-router-dom";

const EditUser = (props) => {
  const [loading, setLoading] = useState(true);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [changeEmail, setChangeEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [role, setRole] = useState("user");
  const history = useHistory();
  const params = useParams();

  const getUser = (source) => {
    setLoading(true);
    axios
      .get(`/users/${params.id}`,{
        cancelToken: source.token
      })
      .then((result) => {
        console.log(result);
        setLastName(result.data.user.lastname);
        setFirstName(result.data.user.firstname);
        setEmail(result.data.user.email);
        setRole(result.data.user.role);
      })
      .catch(function (err) {
        if (axiosCancel.isCancel(err)) {
        } else {
          console.log(err);
        }                       
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const CancelToken = axiosCancel.CancelToken;
    const source = CancelToken.source();
    getUser(source);
    return () => {
      source.cancel();
    };
  }, []);

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

  const handleChangeEmail = (e) => {
    setChangeEmail(e.target.checked);
  };

  const handleChangePassword = (e) => {
    setChangePassword(e.target.checked);
  };

  const handleClick = async () => {
    setLoading(true);
    if (changeEmail) {
      await axios
        .put(`/users/${params.id}`, {
          email: email,
        })
        .then((result) => {})
        .catch((err) => {
          if (err.response.data.error.message) {
            const note = {
              success: false,
              message: err.response.data.error.message,
            };
            props.notify(note);
          }
        });
    }
    if (changePassword) {
      await axios
        .put(`/users/${params.id}`, {
          password: password,
        })
        .then((result) => {})
        .catch((err) => {
          if (err.response.data.error.message) {
            const note = {
              success: false,
              message: err.response.data.error.message,
            };
            props.notify(note);
          }
        });
    }
    axios
      .put(`/users/${params.id}`, {
        firstname: firstName,
        lastname: lastName,
        role: role,
      })
      .then((result) => {
        const note = {
          success: true,
          message: result.data.message,
        };
        props.notify(note);
        history.push("/users");
      })
      .catch((err) => {
        if (err.response.data.error.message) {
          const note = {
            success: false,
            message: err.response.data.error.message,
          };
          props.notify(note);
        }
      });
  };

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
                value={lastName}
              />
            </div>
            <div className={styles.field}>
              <h1 className={styles.label}>Нэр</h1>
              <input
                className={styles.input}
                type={`text`}
                onChange={handleFirstName}
                value={firstName}
              />
            </div>
            <div className={styles.field}>
              <div className={styles.change}>
                <h1 className={styles.label}>Email</h1>
                <div>
                  <input
                    type='checkbox'
                    onChange={(e) => handleChangeEmail(e)}
                  />
                  <label className={styles.label}> Email өөрчлөх</label>
                </div>
              </div>
              {changeEmail ? (
                <input
                  className={styles.input}
                  type={`email`}
                  onChange={handleEmail}
                  value={email}
                />
              ) : (
                <div className={styles.input__inactive}>{email}</div>
              )}
            </div>
            <div className={styles.field}>
              <div className={styles.change}>
                <h1 className={styles.label}>Нууц үг</h1>
                <div>
                  <input
                    type='checkbox'
                    onChange={(e) => handleChangePassword(e)}
                  />
                  <label className={styles.label}> Нууц үг өөрчлөх</label>
                </div>
              </div>
              {changePassword ? (
                <input
                  className={styles.input}
                  type={`password`}
                  minlength='8'
                  onChange={handlePassword}
                />
              ) : (
                <div className={styles.input__inactive} />
              )}
            </div>

            <div className={styles.field}></div>

            <div className={styles.field}>
              <h1 className={styles.label}>Role</h1>
              <select
                className={styles.select}
                onChange={handleRole}
                value={role}
              >
                <option value='user'>Хэрэглэгч</option>
                <option value='publisher'>Нийтлэгч</option>
                <option value='admin'>Админ</option>
                <option value='superadmin'>Суперадмин</option>
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
export default EditUser;
