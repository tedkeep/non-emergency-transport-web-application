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
  ListGroup,
  ListGroupItem,
  Button,
  FormFeedback
} from "reactstrap";
import { connect } from "react-redux";
import { getPatients } from "../../redux/actions/patient.actions";
import { addTrip } from "../../redux/actions/trip.actions";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

function CreateTrip(props) {
  const [patient, setPatient] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const { patients } = props;
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  useEffect(() => {
    props.getPatients();
  });

  const filterPatients = e => {
    if (e.target.value === "") {
      setFilteredPatients([]);
    } else {
      const list = patients.filter(patient => {
        if (
          patient.first_name !== undefined &&
          patient.last_name !== undefined
        ) {
          if (
            patient.first_name
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            patient.last_name
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
          ) {
            return true;
          }
        }
        return false;
      });
      setFilteredPatients(list);
    }
  };

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
      patient,
      requirements: {
        wheelchair: data.question1,
        stretcher: data.question2
      },
      additional_notes: data.question3
    };

    props.addTrip(JSON.stringify(trip));

    history.push("/trips");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col sm={12} md={6}>
            <Card>
              <CardHeader>Patient</CardHeader>
              <CardBody>
                <FormGroup>
                  <Label for="patient_search">Search</Label>
                  <Input
                    type="text"
                    name="patient_search"
                    onChange={e => filterPatients(e)}
                  />
                </FormGroup>
                <ListGroup className="patient_list">
                  {filteredPatients.map(({ _id, first_name, last_name }) => (
                    <ListGroupItem action onClick={() => setPatient(_id)}>
                      {last_name}, {first_name}
                    </ListGroupItem>
                  ))}
                </ListGroup>
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
                        id="origin_street"
                        innerRef={register({ required: true })}
                        invalid={errors.origin_street}
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
                            innerRef={register({ required: true })}
                            invalid={errors.origin_town}
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
                            id="origin_county"
                            innerRef={register}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="origin_postcode">Postcode</Label>
                          <Input
                            type="text"
                            name="origin_postcode"
                            id="origin_postcode"
                            // onChange={e => updateOriginAddress(e)}
                            innerRef={register({ required: true })}
                            invalid={errors.origin_postcode}
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
                        id="destination_street"
                        innerRef={register({ required: true })}
                        invalid={errors.destination_street}
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
                            id="destination_town"
                            innerRef={register({ required: true })}
                            invalid={errors.destination_town}
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
                            id="destination_county"
                            innerRef={register}
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
                            id="destination_postcode"
                            innerRef={register({ required: true })}
                            invalid={errors.destination_postcode}
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
                    innerRef={register({ required: true })}
                    invalid={errors.trip_date}
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
                      placeholder="time placeholder"
                      innerRef={register({ required: true })}
                      invalid={errors.origin_time}
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
                          defaultChecked
                          innerRef={register}
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
                          innerRef={register}
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
                  <Input type="select" name="question1" innerRef={register}>
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="question2">
                    Does the patient require a stretcher??
                  </Label>
                  <Input type="select" name="question2" innerRef={register}>
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="question3">Additional Information?</Label>
                  <Input type="textarea" name="question3" innerRef={register} />
                </FormGroup>
              </CardBody>
            </Card>
            <br />
            <Button color="primary">Create Trip</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

const mapStateToProps = state => ({ patients: state.patient.patients });

export default connect(mapStateToProps, { getPatients, addTrip })(CreateTrip);
