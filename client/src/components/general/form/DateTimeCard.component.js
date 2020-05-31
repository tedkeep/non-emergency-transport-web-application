import React from "react";
import {
  Card,
  CardBody,
  FormGroup,
  Input,
  Row,
  Col,
  FormFeedback,
  Label
} from "reactstrap";

const DateTimeCard = props => {
  const { register, errors, disabled } = props;

  return (
    <Card>
      <CardBody>
        <Row>
          <Col>
            <FormGroup>
              <Label for="date">Date</Label>
              <Input
                type="date"
                name="date"
                innerRef={register({ required: true })}
                disabled={disabled != undefined ? disabled : false}
                invalid={errors.date}
              />
              <FormFeedback>A date needs to be selected</FormFeedback>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="time">Time</Label>
              <Input
                type="time"
                name="time"
                innerRef={register({ required: true })}
                disabled={disabled != undefined ? disabled : false}
                invalid={errors.time}
              />
            </FormGroup>
            <FormFeedback>A time needs to be selected</FormFeedback>
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <FormGroup>
              <Label for="time_to">Time to</Label>
              <Input
                type="select"
                name="time_to"
                innerRef={register}
                disabled={disabled != undefined ? disabled : false}
                invalid={errors.time_to}
              >
                <option>Arrive at destination</option>
                <option selected>Pickup at origin</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default DateTimeCard;
