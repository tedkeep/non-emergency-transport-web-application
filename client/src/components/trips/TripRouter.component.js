import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";

import TripDetails from "./TripDetails.component";
import TripAdd from "./TripAdd.component";
import TripDashboard from "./TripDashboard.component";

const TripRouter = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact>
        <TripDashboard />
      </Route>

      <Route path={`${path}/add`}>
        <TripAdd />
      </Route>

      <Route path={`${path}/view/:id`}>
        <TripDetails />
      </Route>
    </Switch>
  );
};

export default TripRouter;
