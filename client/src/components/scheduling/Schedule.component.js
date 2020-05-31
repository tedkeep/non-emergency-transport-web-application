import React from "react";
import { Container, Button } from "reactstrap";
import { useHistory, Route, useRouteMatch } from "react-router-dom";

import CreateSchedule from "./CreateSchedule.component";
import ViewSchedules from "./ViewSchedules.component";
// import ViewTrips from "./ViewTrips.component";
// import ViewTrip from "./ViewTrip.component";

export default function Schedule(props) {
  const history = useHistory();
  const { path, url } = useRouteMatch();

  const loadAddTripComponent = () => {
    history.push(`${url}/add`);
  };

  return (
    <Container>
      <Route path={path} exact>
        <h1>Schedules</h1>
        <hr />
        <Button color="primary" onClick={() => loadAddTripComponent()}>
          Create schedule
        </Button>
        <br />
        <ViewSchedules />
      </Route>
      <Route path={`${path}/add`}>
        <h1>Create new schedule</h1>
        <hr />
        <CreateSchedule />
      </Route>
      <Route path={`${path}/view/:id`}>
        <h1>Schedule Details</h1>
        <hr />
      </Route>
    </Container>
  );
}
