import React from "react";
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

const UnavailableCard = props => {
  const { register, errors, control, useFieldArray, disabled } = props;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "unavailable"
  });

  return (
    <Card>
      <CardBody>
        <FormGroup row>
          <Col sm="10">
            <Label>Unavailable dates</Label>
          </Col>
          <Col sm="2">
            <Button
              onClick={() =>
                append({
                  date: "",
                  note: ""
                })
              }
              disabled={disabled != undefined ? disabled : false}
              outline
              color="secondary"
            >
              Add
            </Button>
          </Col>
        </FormGroup>
        {fields.length != 0 ? (
          <ListGroup>
            {fields.map((date, index) => {
              return (
                <FormGroup row>
                  <Col sm="4">
                    <Label for={`unavailable[${index}].date`}>Start time</Label>
                    <Input
                      type="date"
                      name={`unavailable[${index}].date`}
                      innerRef={register({ required: true })}
                      invalid={errors.date}
                      disabled={disabled != undefined ? disabled : false}
                    />
                    <FormFeedback>Input required</FormFeedback>
                  </Col>
                  <Col sm="6">
                    <Label for={`unavilable[${index}].note`}>Reason</Label>
                    <Input
                      type="type"
                      name={`unavailable[${index}].note`}
                      innerRef={register}
                      disabled={disabled != undefined ? disabled : false}
                    />
                  </Col>
                  <Col sm="2">
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

export default UnavailableCard;
