import React from "react";
import {
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from "reactstrap";

const JourneyTimeCard = props => {
  const { register, errors, disabled } = props;

  return (
    <Card>
      <CardBody>
        <FormGroup>
          <Label for={"estimated_journey_time"}>
            Estimated journey time in minutes
          </Label>
          <Input
            type="number"
            name={"estimated_journey_time"}
            innerRef={register({ required: true })}
            invalid={errors.estimated_journey_time}
            disabled={disabled != undefined ? disabled : false}
          />
          <FormFeedback>Input required</FormFeedback>
        </FormGroup>
      </CardBody>
    </Card>
  );
};

export default JourneyTimeCard;
