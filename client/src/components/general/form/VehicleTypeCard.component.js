import React, { useEffect } from "react";
import { Card, CardBody, FormGroup, Label, Input } from "reactstrap";
import useApi from "../../../hooks/useApi.hook";

const VehicleTypeCard = props => {
  const { register, errors, disabled } = props;

  const [{ data }, doFetch] = useApi();

  useEffect(() => {
    doFetch("get", "/api/vehicle_type");
  }, []);

  return (
    <Card>
      <CardBody>
        <FormGroup>
          <Label for="type">Vehicle type</Label>
          {data != undefined ? (
            <Input
              name="type"
              type="select"
              innerRef={register}
              invalid={errors.stationed_at}
              disabled={disabled != undefined ? disabled : false}
            >
              {data.map((type, index) => {
                return (
                  <option key={type._id} value={type._id}>
                    {type.name}
                  </option>
                );
              })}
            </Input>
          ) : (
            ""
          )}
        </FormGroup>
      </CardBody>
    </Card>
  );
};

export default VehicleTypeCard;
