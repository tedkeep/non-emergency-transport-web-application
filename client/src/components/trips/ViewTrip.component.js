import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  FormFeedback,
  Spinner
} from "reactstrap";
import { connect } from "react-redux";
import { getPatient } from "../../redux/actions/patient.actions";
import { getTrip, editTrip } from "../../redux/actions/trip.actions";
import { useForm } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";

function ViewTrip(props) {
  const [disabled, updateDisabled] = useState(true);

  const { register, handleSubmit, errors } = useForm();
  const { id } = useParams();
  const history = useHistory();
  let date_time = null;
  let date = "";
  let time = "";

  useEffect(() => {
    props.getTrip(id);
  }, []);

  useEffect(() => {
    if (props.trip != null) {
      props.getPatient(props.trip.patient);
    }
  }, [props.trip]);

  const onSubmit = data => {
    const time_date = data.trip_date + "T" + data.origin_time;

    const trip = {
      origin_address: {
        street: data.origin_street,
        town: data.origin_town,
        county: data.origin_county,
        postcode: data.origin_postcode
      },
      destination_address: {
        street: data.destination_street,
        town: data.destination_town,
        county: data.destination_county,
        postcode: data.destination_postcode
      },
      time_type: data.time_type,
      date_time: time_date,
      patient: props.trip.patient,
      requirements: {
        wheelchair: data.question1,
        stretcher: data.question2
      },
      additional_notes: data.question3
    };

    props.editTrip(JSON.stringify(trip), props.trip._id);

    history.push("/trips");
  };

  if (props.trip != null) {
    date_time = new Date(props.trip.date_time);
    date = date_time.toISOString().slice(0, 10);
    time = date_time.toLocaleTimeString();
  }

  return (
    <Container>
      <Button
        onClick={() =>
          disabled ? updateDisabled(false) : updateDisabled(true)
        }
        style={{ marginBottom: "1rem" }}
        color={disabled ? "secondary" : "danger"}
      >
        {disabled ? "Edit" : "Cancel"}
      </Button>
      {props.tripLoading ? (
        <Spinner />
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col sm={12} md={6}>
              <Card>
                <CardHeader>Patient</CardHeader>
                <CardBody>
                  <FormGroup>
                    <Label for="first_name">First Name</Label>
                    <Input
                      type="text"
                      name="first_name"
                      value={
                        props.patient != null ? props.patient.first_name : ""
                      }
                      disabled
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="last_name">Last Name</Label>
                    <Input
                      type="text"
                      name="last_name"
                      value={
                        props.patient != null ? props.patient.last_name : ""
                      }
                      disabled
                    />
                  </FormGroup>
                </CardBody>
              </Card>

              <br />
              <Row>
                <Col>
                  <Card>
                    <CardHeader>destination Address</CardHeader>
                    <CardBody>
                      <FormGroup>
                        <Label for="origin_street">Street</Label>
                        <Input
                          type="text"
                          name="origin_street"
                          defaultValue={
                            props.trip != null
                              ? props.trip.origin_address.street
                              : ""
                          }
                          innerRef={register({ required: true })}
                          invalid={errors.origin_street}
                          disabled={disabled}
                        />
                        <FormFeedback>Input must be filled</FormFeedback>
                      </FormGroup>
                      <Row>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="origin_town">Town</Label>
                            <Input
                              type="text"
                              name="origin_town"
                              defaultValue={
                                props.trip != null
                                  ? props.trip.origin_address.town
                                  : ""
                              }
                              innerRef={register({ required: true })}
                              invalid={errors.origin_town}
                              disabled={disabled}
                            />
                            <FormFeedback>Input must be filled</FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="origin_county">County</Label>
                            <Input
                              type="text"
                              name="origin_county"
                              defaultValue={
                                props.trip != null
                                  ? props.trip.origin_address.county
                                  : ""
                              }
                              innerRef={register}
                              disabled={disabled}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="origin_postcode">Postcode</Label>
                            <Input
                              type="text"
                              name="origin_postcode"
                              defaultValue={
                                props.trip != null
                                  ? props.trip.origin_address.postcode
                                  : ""
                              }
                              innerRef={register({ required: true })}
                              invalid={errors.origin_postcode}
                              disabled={disabled}
                            />
                            <FormFeedback>Input must be filled</FormFeedback>
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <Card>
                    <CardHeader>Destination Address</CardHeader>
                    <CardBody>
                      <FormGroup>
                        <Label for="destination_street">Street</Label>
                        <Input
                          type="text"
                          name="destination_street"
                          defaultValue={
                            props.trip != null
                              ? props.trip.destination_address.street
                              : ""
                          }
                          innerRef={register({ required: true })}
                          invalid={errors.destination_street}
                          disabled={disabled}
                        />
                        <FormFeedback>Input must be filled</FormFeedback>
                      </FormGroup>
                      <Row>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="destination_town">Town</Label>
                            <Input
                              type="text"
                              name="destination_town"
                              defaultValue={
                                props.trip != null
                                  ? props.trip.destination_address.town
                                  : ""
                              }
                              innerRef={register({ required: true })}
                              invalid={errors.destination_town}
                              disabled={disabled}
                            />
                            <FormFeedback>Input must be filled</FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="destination_county">County</Label>
                            <Input
                              type="text"
                              name="destination_county"
                              defaultValue={
                                props.trip != null
                                  ? props.trip.destination_address.county
                                  : ""
                              }
                              innerRef={register}
                              disabled={disabled}
                            />
                            <FormFeedback>Input must be filled</FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="destination_postcode">Postcode</Label>
                            <Input
                              type="text"
                              name="destination_postcode"
                              defaultValue={
                                props.trip != null
                                  ? props.trip.destination_address.postcode
                                  : ""
                              }
                              innerRef={register({ required: true })}
                              invalid={errors.destination_postcode}
                              disabled={disabled}
                            />
                            <FormFeedback>Input must be filled</FormFeedback>
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col>
              <Card>
                <CardHeader>Time/Date</CardHeader>
                <CardBody>
                  <FormGroup>
                    <Label for="date">Date</Label>
                    <Input
                      type="date"
                      name="trip_date"
                      defaultValue={props.trip != null ? date : ""}
                      innerRef={register({ required: true })}
                      invalid={errors.trip_date}
                      disabled={disabled}
                    />
                    <FormFeedback>Date is required</FormFeedback>
                  </FormGroup>
                  <hr />
                  <FormGroup>
                    <FormGroup>
                      <Label for="origin_time">Time</Label>
                      <Input
                        type="time"
                        name="origin_time"
                        defaultValue={props.trip != null ? time : ""}
                        innerRef={register({ required: true })}
                        invalid={errors.origin_time}
                        disabled={disabled}
                      />
                      <FormFeedback>Time is required</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <br />
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="time_type"
                            value="Leave origin address by"
                            innerRef={register}
                            disabled={disabled}
                          />
                          Leave origin address by
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="time_type"
                            value="Arrive at destination addresss by"
                            defaultChecked
                            innerRef={register}
                            disabled={disabled}
                          />
                          Arrive at destination addresss by
                        </Label>
                      </FormGroup>
                    </FormGroup>
                  </FormGroup>
                </CardBody>
              </Card>
              <br />
              <Card>
                <CardHeader>Patient Questions</CardHeader>
                <CardBody>
                  <FormGroup>
                    <Label for="question1">
                      Does the patient require a wheelchair?
                    </Label>
                    <Input
                      type="select"
                      name="question1"
                      innerRef={register}
                      disabled={disabled}
                    >
                      <option
                        defaultValue={
                          props.trip != null
                            ? props.trip.requirements.wheelchair
                              ? false
                              : true
                            : ""
                        }
                        value="false"
                      >
                        No
                      </option>
                      <option
                        defaultValue={
                          props.trip != null
                            ? props.trip.requirements.wheelchair
                              ? true
                              : false
                            : ""
                        }
                        value="true"
                      >
                        Yes
                      </option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="question2">
                      Does the patient require a stretcher?
                    </Label>
                    <Input
                      type="select"
                      name="question2"
                      innerRef={register}
                      disabled={disabled}
                    >
                      <option
                        defaultValue={
                          props.trip != null
                            ? props.trip.requirements.stretcher
                              ? false
                              : true
                            : ""
                        }
                        value="false"
                      >
                        No
                      </option>
                      <option
                        defaultValue={
                          props.trip != null
                            ? props.trip.requirements.stretcher
                              ? true
                              : false
                            : ""
                        }
                        value="true"
                      >
                        Yes
                      </option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="question3">Additional Information?</Label>
                    <Input
                      type="textarea"
                      name="question3"
                      defaultValue={
                        props.trip != null ? props.trip.additional_notes : ""
                      }
                      innerRef={register}
                      disabled={disabled}
                    />
                  </FormGroup>
                </CardBody>
              </Card>
              <br />
              {!disabled ? (
                <Button style={{ marginTop: "1rem" }} color="primary">
                  Update Trip
                </Button>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </Form>
      )}
    </Container>
  );
}

const mapStateToProps = state => ({
  trip: state.trip.trip,
  tripLoading: state.trip.loading,
  patient: state.patient.patient,
  patientLoading: state.patient.loading
});

export default connect(mapStateToProps, { getTrip, getPatient, editTrip })(
  ViewTrip
);
