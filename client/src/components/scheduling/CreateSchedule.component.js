import React, { useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  FormFeedback
} from "reactstrap";
import { connect } from "react-redux";
import { getVehicles } from "../../redux/actions/vehicle.actions";
import { getPersonnel } from "../../redux/actions/personnel.actions";
import { getTrips } from "../../redux/actions/trip.actions";
import { addSchedule } from "../../redux/actions/schedule.actions";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

function CreateTrip(props) {
  const [filteredTrips, setFilteredTrips] = useState([]);

  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  useEffect(() => {
    props.getVehicles();
    props.getPersonnel();
    props.getTrips();
  }, []);

  const changeDate = e => {
    const selectedDate = e.target.value;

    const tempList = props.trips.filter(trip => {
      return (
        selectedDate === new Date(trip.date_time).toISOString().substr(0, 10)
      );
    });
    setFilteredTrips(tempList);
  };

  const onSubmit = data => {
    var tripsFormatted = [];
    var i = 1;
    data.trips.map(trip => {
      tripsFormatted.push({ tripId: trip, order: i });
      i++;
    });

    const schedule = {
      vehicle: data.vehicle,
      date: new Date(data.date).toISOString(),
      personnel: data.personnel,
      trips: tripsFormatted
    };
    alert(JSON.stringify(schedule));
    props.addSchedule(schedule);

    history.push("/schedules");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col sm={12} md={6}>
            <Card>
              <CardHeader>Vehicle</CardHeader>
              <CardBody>
                <FormGroup>
                  <Input
                    type="select"
                    name="vehicle"
                    innerRef={register({ required: true })}
                    invalid={errors.vehicle}
                  >
                    {props.vehicles.map(({ reg_num, _id, available }) =>
                      available ? (
                        <option key={reg_num} value={_id}>
                          {reg_num}
                        </option>
                      ) : (
                        ""
                      )
                    )}
                  </Input>
                  <FormFeedback>A vehicle must be selected</FormFeedback>
                </FormGroup>
              </CardBody>
            </Card>
            <br />
            <Card>
              <CardHeader>Date</CardHeader>
              <CardBody>
                <FormGroup>
                  <Input
                    type="date"
                    name="date"
                    onChange={e => changeDate(e)}
                    defaultValue={new Date().toISOString().substr(0, 10)}
                    innerRef={register({ required: true })}
                    invalid={errors.date}
                  />
                  <FormFeedback>A date must be selected</FormFeedback>
                </FormGroup>
              </CardBody>
            </Card>
            <br />
            <Card>
              <CardHeader>Personnel</CardHeader>
              <CardBody>
                <FormGroup>
                  <Input
                    type="select"
                    name="personnel"
                    innerRef={register({ required: true })}
                    invalid={errors.personnel}
                    multiple
                  >
                    {props.personnel.map(({ _id, first_name, last_name }) =>
                      first_name != null ? (
                        <option key={_id} value={_id}>
                          {first_name} {last_name}
                        </option>
                      ) : (
                        ""
                      )
                    )}
                  </Input>
                  <FormFeedback>An employee must be selected</FormFeedback>
                </FormGroup>
              </CardBody>
            </Card>
            <br />
            <Card>
              <CardHeader>Trips</CardHeader>
              <CardBody>
                <FormGroup>
                  <Input
                    type="select"
                    name="trips"
                    innerRef={register({ required: true })}
                    invalid={errors.trips}
                    multiple
                  >
                    {filteredTrips.map(
                      ({
                        _id,
                        origin_address,
                        destination_address,
                        date_time
                      }) => (
                        <option key={_id} value={_id}>
                          {origin_address.street} ->{" "}
                          {destination_address.street} @{" "}
                          {new Date(date_time).toLocaleTimeString()}
                        </option>
                      )
                    )}
                  </Input>
                  <FormFeedback>
                    At least one trip must be added to a schedule
                  </FormFeedback>
                </FormGroup>
              </CardBody>
            </Card>
            <br />

            <Button color="primary">Create Schedule</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

const mapStateToProps = state => ({
  vehicles: state.vehicle.vehicles,
  personnel: state.personnel.personnel,
  trips: state.trip.trips
});

export default connect(mapStateToProps, {
  getVehicles,
  addSchedule,
  getPersonnel,
  getTrips
})(CreateTrip);
