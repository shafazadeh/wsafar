import React from "react";
import PrivateRoute from "hoc/PrivateRoute";

const LoadableHome = React.lazy(() => import("../../views/Home"));
const LoadableDashboard = React.lazy(() => import("../../views/Dashboard"));
const LoadableLogin = React.lazy(() => import("../../views/Login"));

const loading = "لطفا صبر کنید...";

const UserArea = () => (
  <React.Suspense fallback={loading}>
    <LoadableDashboard />
  </React.Suspense>
);



const Login = () => (
  <React.Suspense fallback={loading}>
    <LoadableLogin />
  </React.Suspense>
);

const Home = () => (
  <React.Suspense fallback={loading}>
    <LoadableHome />
  </React.Suspense>
);


const Routes = {
  "/login*": () => <Login />,
  "/dashboard*": () => (
    <PrivateRoute>
      <UserArea />
    </PrivateRoute>
  ),
  "/": () => ( 
    <Home />
  ),

 
};

export default Routes;
