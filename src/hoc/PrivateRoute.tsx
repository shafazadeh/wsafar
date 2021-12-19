import React, { useEffect } from "react";
import { navigate } from "hookrouter";
import MainContainer from "../containers/MainContainer"

type PrivateRouteProps = {
  children: React.ReactElement;
};

const PrivateRoute = (props: PrivateRouteProps) => {

  useEffect(() => {
    if (!MainContainer.state.isLogin) {
      navigate("/login");
    }
  }, []);
  
  return MainContainer.state.isLogin ? props.children : null;
};

export default PrivateRoute;
