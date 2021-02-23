import React from "react";
import styles from "./_.module.css";
import { BrowserRouter, Route } from "react-router-dom";
import Districts from "../DistrictPages/Districts";
import UpdateDistrict from "../DistrictPages/UpdateDistrict";
import CreateDistrict from "../DistrictPages/CreateDistrict/";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <div>
          <div className={styles.district}>
            <div className={`container is-max-desktop`}>
              <Route exact path='/districts' component={Districts} />
              <Route
                exact
                path='/districts/create'
                component={CreateDistrict}
              />
              <Route
                exact
                path='/district/:id'
                component={UpdateDistrict}
              />
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
