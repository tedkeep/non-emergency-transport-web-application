import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";

import StaffDetails from "./StaffDetails.component";
import StaffAdd from "./StaffAdd.component";
import StaffDashboard from "./StaffDashboard.component";

const Staff = props => {
  const { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact>
        <StaffDashboard />
      </Route>

      <Route path={`${path}/add`}>
        <StaffAdd />
      </Route>

      <Route path={`${path}/view/:id`}>
        <StaffDetails />
      </Route>
    </Switch>
  );
};

export default Staff;
