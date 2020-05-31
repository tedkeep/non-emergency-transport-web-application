import React, { useEffect, useState } from "react";
import { Card, CardBody, FormGroup, CustomInput } from "reactstrap";

const AvailableCard = props => {
  const { register, available, disabled } = props;
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (available !== undefined) {
      setChecked(available);
    }
  }, [available]);

  const onclick = () => {
    setChecked(!checked);
  };

  return (
    <Card>
      <CardBody>
        <FormGroup>
          <CustomInput
            name="available"
            id="available"
            type="checkbox"
            label="Available?"
            onClick={() => onclick()}
            defaultChecked={available}
            innerRef={register}
            disabled={disabled !== undefined ? disabled : false}
          />
        </FormGroup>
      </CardBody>
    </Card>
  );
};

export default AvailableCard;
