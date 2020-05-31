import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";
import { useHistory, Route, Link } from "react-router-dom";

import CreateTrip from "./CreateTrip.component";
import ViewTrips from "./ViewTrips.component";
import ViewTrip from "./ViewTrip.component";

export default function Trips(props) {
  const history = useHistory();

  const loadAddTripComponent = () => {
    history.push("/trips/add");
  };

  return (
    <Container>
      <Route path="/trips/add">
        <h1>Create new trip</h1>
        <hr />
        <CreateTrip />
      </Route>
      <Route path="/trips" exact>
        <h1>Trips</h1>
        <hr />
        <Button color="primary" onClick={() => loadAddTripComponent()}>
          Create Trip
        </Button>
        <ViewTrips />
        <Row></Row>
      </Route>
      <Route path="/trips/:id">
        <h1>Trip Details</h1>
        <hr />
        <ViewTrip />
      </Route>
    </Container>
  );
}
