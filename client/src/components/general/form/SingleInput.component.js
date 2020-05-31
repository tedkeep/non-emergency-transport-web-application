import React from "react";
import {
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from "reactstrap";

const SingleInput = props => {
  const { label, name, data, register, required, errors, disabled } = props;

  return (
    <Card>
      <CardBody>
        <FormGroup>
          <Label for={name}>{label}</Label>
          <Input
            name={name}
            type="text"
            defaultValue={data != undefined ? data : ""}
            innerRef={required ? register({ required: true }) : register}
            invalid={errors[name]}
            disabled={disabled != undefined ? disabled : false}
          />
          <FormFeedback>Input required</FormFeedback>
        </FormGroup>
      </CardBody>
    </Card>
  );
};

export default SingleInput;
