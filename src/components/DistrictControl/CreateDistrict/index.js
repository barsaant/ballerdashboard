import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import axios from "axios";
import config from "../../../config/config.json";

import styles from "./_.module.css";

const CreateDistrictComp = () => {
  const [state, setState] = useState({
    districtName: null,
    loading: false,
    message: null,
    error: null,
  });

  const history = useHistory();

  const handleChange = (e) => {
    setState({
      districtName: e.target.value,
      loading: false,
      error: null,
    });
  };

  const postDistrict = () => {
    setState({ loading: true });
    axios
      .post(`${config.SERVER_URL}/districts/`, {
        districtName: state.districtName,
      })
      .then((result) => {
        setState({
          loading: false,
          message: result.data.message,
        });
        console.log(result.data.message);
        history.goBack();
      })
      .catch((err) => {
        setState({
          error: err.response.data.error.message,
          loading: false,
        });
      });
  };

  const handleSubmit = (e) => {
    postDistrict();
  };

  const districtCreateSection = () => {
    if (state.loading == false) {
      return (
        <div>
          <div className='field'>
            <label className='label'>Дүүргийн нэр</label>
            <input
              className='input'
              name='districtName'
              type='text'
              onChange={handleChange}
            />
          </div>
          <div className='field'>
            <button
              className='button is-success is-fullwidth'
              onClick={handleSubmit}
            >
              Хадгалах
            </button>
          </div>
          {state.error && (
            <div className={`notification is-danger`}>{state.error}</div>
          )}
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  return districtCreateSection();
};

export default CreateDistrictComp;
