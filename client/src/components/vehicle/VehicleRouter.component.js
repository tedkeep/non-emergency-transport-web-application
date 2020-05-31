import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";

import VehicleDetails from "./VehicleDetails.component";
import VehicleAdd from "./VehicleAdd.component";
import VehicleDashboard from "./VehicleDashboard.component";

const VehicleRouter = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact>
        <VehicleDashboard />
      </Route>

      <Route path={`${path}/add`}>
        <VehicleAdd />
      </Route>

      <Route path={`${path}/view/:id`}>
        <VehicleDetails />
      </Route>
    </Switch>
  );
};

export default VehicleRouter;
