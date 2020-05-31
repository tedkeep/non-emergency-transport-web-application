import React from "react";
import {
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from "reactstrap";

const NameCard = props => {
  const { register, errors, disabled } = props;

  return (
    <Card>
      <CardBody>
        <FormGroup>
          <Label for="first_name">First name</Label>
          <Input
            name="first_name"
            type="text"
            defaultValue={props.first_name != undefined ? props.first_name : ""}
            innerRef={register({ required: true })}
            invalid={errors.first_name}
            disabled={disabled != undefined ? disabled : false}
          />
          <FormFeedback>Input required</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="last_name">Last name</Label>
          <Input
            name="last_name"
            type="text"
            defaultValue={props.last_name != undefined ? props.last_name : ""}
            innerRef={register({ required: true })}
            invalid={errors.last_name}
            disabled={disabled != undefined ? disabled : false}
          />
          <FormFeedback>Input required</FormFeedback>
        </FormGroup>
      </CardBody>
    </Card>
  );
};

export default NameCard;
