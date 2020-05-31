import React, { useEffect, useState } from "react";
import { Button, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { useParams, Redirect } from "react-router-dom";
import useApi from "../../hooks/useApi.hook";

import AvailableCard from "../general/form/AvailableCard.component";
import SingleInput from "../general/form/SingleInput.component";
import StationedAtCard from "../general/form/StationedAtCard.component";
import VehicleTypeCard from "../general/form/VehicleTypeCard.component";

const VehicleForm = props => {
  const { vehicle, edit } = props;
  const [redirect, setRedirect] = useState(false);
  const [{ data }, doFetch] = useApi();
  const { id } = useParams();
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      reg_num: vehicle.reg_num,
      available: vehicle.available,
      stationed_at: vehicle.stationed_at,
      type: vehicle.type
    }
  });

  useEffect(() => {
    if (data != undefined) setRedirect(true);
  }, [data]);

  const onSubmit = data => {
    if (edit != undefined && vehicle != undefined) {
      doFetch("put", "/api/vehicle/" + id, data);
    } else {
      doFetch("post", "/api/vehicle/", data);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {redirect && <Redirect to="/vehicles" />}
      <div>
        <SingleInput
          label="Reg number"
          name="reg_num"
          register={register}
          errors={errors}
          disabled={edit != undefined ? !edit : ""}
          required={true}
        />
        <AvailableCard
          register={register}
          errors={errors}
          disabled={edit != undefined ? !edit : ""}
        />
        <StationedAtCard
          register={register}
          errors={errors}
          disabled={edit != undefined ? !edit : ""}
        />
        <VehicleTypeCard
          register={register}
          errors={errors}
          disabled={edit != undefined ? !edit : ""}
        />
        {edit != undefined ? (
          edit ? (
            <Button outline color="primary">
              Update
            </Button>
          ) : (
            ""
          )
        ) : (
          <Button outline color="primary">
            Add
          </Button>
        )}
      </div>
    </Form>
  );
};

export default VehicleForm;
