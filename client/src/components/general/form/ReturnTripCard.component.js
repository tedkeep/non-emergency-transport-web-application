import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  FormGroup,
  Input,
  CustomInput,
  Row,
  Col,
  FormFeedback,
  Label
} from "reactstrap";

const ReturnTripCard = props => {
  const { register, errors, disabled, getValues } = props;

  const [showReturnTime, setShowReturnTime] = useState(false);

  useEffect(() => {
    if (getValues().return_time == true) {
      setShowReturnTime(true);
    }
  }, []);

  const onSelect = e => {
    if (e.target.checked) {
      setShowReturnTime(true);
    } else {
      setShowReturnTime(false);
    }
  };

  return (
    <Card>
      <CardBody>
        <Row>
          <Col>
            <FormGroup>
              <Label for="return">Return Trip?</Label>
              <CustomInput
                type="switch"
                name="return"
                id="return"
                onClick={e => onSelect(e)}
                innerRef={register}
                disabled={disabled != undefined ? disabled : false}
                invalid={errors.return}
              />
            </FormGroup>
          </Col>
          <Col>
            {showReturnTime && (
              <FormGroup>
                <Label for="return_time">Return time</Label>
                <Input
                  type="time"
                  name="return_time"
                  innerRef={register({ required: true })}
                  disabled={disabled != undefined ? disabled : false}
                  invalid={errors.return_time}
                />
                <FormFeedback>A time needs to be selected</FormFeedback>
              </FormGroup>
            )}
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default ReturnTripCard;
