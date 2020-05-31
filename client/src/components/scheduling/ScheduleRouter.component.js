import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";

import ScheduleApp from "./ScheduleApp/ScheduleApp.component";
import ScheduleDashboard from "./ScheduleDashboard.component";

const ScheduleRouter = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact>
        <ScheduleApp />
      </Route>

      {/* <Route path={`${path}/create`}>
        
      </Route> */}

      {/* <Route path={`${path}/view/:id`}>
        <ScheduleDetails />
      </Route> */}
    </Switch>
  );
};

export default ScheduleRouter;
