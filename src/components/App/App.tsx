import React, { useState, useEffect } from "react";
import { Provider } from "unstated";
import Router from "components/Router";
import Routes from "./App.routes";
import NotFound from "../NotFound";
import MainContainer from "containers/MainContainer";
import  "../../assests/style/style.css";

const App = () => {
  useEffect(() => {
    if(localStorage.getItem("LOGINTOKEN")){
      MainContainer.setIsLogin(true)
    }
  },[])
  return (
    <Provider>
      <div className="container-fluid">
        <Router
              routes={Routes}
              whenNotFound={NotFound}
              redirect={{ from: "/", to: "/" }}
            />
      </div>
    </Provider>
  );
};

export default App;
