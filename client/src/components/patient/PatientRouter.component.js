import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";

import PatientDetails from "./PatientDetails.component";
import PatientAdd from "./PatientAdd.component";
import PatientDashboard from "./PatientDashboard.component";

const PatientRouter = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact>
        <PatientDashboard />
      </Route>

      <Route path={`${path}/add`}>
        <PatientAdd />
      </Route>

      <Route path={`${path}/view/:id`}>
        <PatientDetails />
      </Route>
    </Switch>
  );
};

export default PatientRouter;
