import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import DriversLogForm from "./driversLogForm";
import DriversLog from "./driversLog";
import Login from "./login";
import Register from "./register";
import Logout from "./logout";
import NotFound from "./notFound";
import Home from "./home";
import ProtectedRoute from "./common/protectedRoute";

const Routes = () => {
  return (
    <Switch>
      <ProtectedRoute path="/drivers-log/:id" component={DriversLogForm} />
      <ProtectedRoute path="/drivers-log" component={DriversLog} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/logout" component={Logout} />
      <Route path="/not-found" component={NotFound} />
      <Route path="/" exact component={Home} />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
