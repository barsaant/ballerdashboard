import React, { useState, useEffect } from "react";

import { useHistory, useParams } from "react-router-dom";

import axios from "axios";
import config from "../../../config/config.json";

import styles from "./_.module.css";

const UpdateDistrictComp = () => {
  const [state, setState] = useState({
    districtName: null,
    loading: true,
    message: null,
    error: null,
  });

  const params = useParams();

  const history = useHistory();

  const getDistrict = () => {
    axios
      .get(`${config.SERVER_URL}/districts/${params.id}`)
      .then((result) =>
        setState({
          districtName: result.data.district.districtName,
          loading: false,
          message: result.data.message,
          error: null,
        })
      )
      .catch((err) => setState({ error: err }))
      .finally(() => setState({ loading: false }));
  };

  useEffect(() => {
    getDistrict();
  }, []);

  const handleChange = (e) => {
    setState({
      districtName: e.target.value,
      loading: false,
      error: null,
    });
  };

  const putDistrict = () => {
    axios
      .put(`${config.SERVER_URL}/districts/${params.id}`, {
        districtName: state.districtName,
      })
      .then((result) => {
        setState({
          loading: false,
          message: result.data.message,
        });
        console.log(result.data.message);
        history.push("/districts");
      })
      .catch((err) => {
        setState({
          error: err.response.data.error.message,
          loading: false,
        });
      });
  };

  const handleSubmit = (e) => {
    putDistrict();
  };

  const districtUpdateSection = () => {
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
              value={state.districtName}
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

  return districtUpdateSection();
};

export default UpdateDistrictComp;
