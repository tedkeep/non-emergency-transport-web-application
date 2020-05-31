import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Button,
  Col,
  ListGroup
} from "reactstrap";

const ShiftsCard = props => {
  const { register, errors, control, useFieldArray, disabled, data } = props;
  const { fields, append, remove } = useFieldArray({ control, name: "shifts" });

  return (
    <Card>
      <CardBody>
        <FormGroup row>
          <Col sm="10">
            <Label>Shifts</Label>
          </Col>
          <Col sm="2">
            <Button
              onClick={() =>
                append({
                  start_time: "",
                  finish_time: "",
                  day: ""
                })
              }
              outline
              color="secondary"
              disabled={disabled != undefined ? disabled : false}
            >
              Add
            </Button>
          </Col>
        </FormGroup>
        {fields.length != 0 ? (
          <ListGroup>
            {fields.map((shift, index) => {
              return (
                <FormGroup row>
                  <Col sm="3">
                    <Label for={`shifts[${index}].start_time`}>
                      Start time
                    </Label>
                    <Input
                      type="time"
                      name={`shifts[${index}].start_time`}
                      innerRef={register({ required: true })}
                      invalid={errors.start_time}
                      disabled={disabled != undefined ? disabled : false}
                    />
                    <FormFeedback>Input required</FormFeedback>
                  </Col>
                  <Col sm="3">
                    <Label for={`shifts[${index}].finish_time`}>
                      Finish time
                    </Label>
                    <Input
                      type="time"
                      name={`shifts[${index}].finish_time`}
                      innerRef={register({ required: true })}
                      invalid={errors.finish_time}
                      disabled={disabled != undefined ? disabled : false}
                      defaultValue={shift.finish_time}
                    />
                    <FormFeedback>Input required</FormFeedback>
                  </Col>
                  <Col sm="4">
                    <Label for={`shifts[${index}].day`}>Day</Label>
                    <Input
                      type="select"
                      name={`shifts[${index}].day`}
                      innerRef={register({ required: true })}
                      invalid={errors.day}
                      disabled={disabled != undefined ? disabled : false}
                      defaultValue={shift.day}
                    >
                      <option value="" disabled selected>
                        Select a day
                      </option>
                      <option>Monday</option>
                      <option>Tuesday</option>
                      <option>Wednesday</option>
                      <option>Thursday</option>
                      <option>Friday</option>
                      <option>Saturday</option>
                      <option>Sunday</option>
                    </Input>
                  </Col>
                  <Col sm="2">
                    {index != 0 ? (
                      <Button
                        size="sm"
                        className="shiftRemove"
                        outline
                        color="danger"
                        onClick={() => remove(index)}
                        disabled={disabled != undefined ? disabled : false}
                      >
                        X
                      </Button>
                    ) : (
                      ""
                    )}
                  </Col>
                </FormGroup>
              );
            })}
          </ListGroup>
        ) : (
          ""
        )}
      </CardBody>
    </Card>
  );
};

export default ShiftsCard;
