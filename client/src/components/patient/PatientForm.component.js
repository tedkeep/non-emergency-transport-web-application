import React, { useEffect, useState } from "react";
import { Button, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { useParams, Redirect } from "react-router-dom";
import useApi from "../../hooks/useApi.hook";

import SingleInput from "../general/form/SingleInput.component";
import NameCard from "../general/form/NameCard.component";
import AddressCard from "../general/form/AddressCard.component";

const PatientForm = props => {
  const { patient, edit } = props;
  const [redirect, setRedirect] = useState(false);
  const [{ data }, doFetch] = useApi();
  const { id } = useParams();
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      first_name: patient.first_name,
      last_name: patient.last_name,
      nhs_number: patient.nhs_number,
      address: patient.address
    }
  });

  useEffect(() => {
    if (data != undefined) setRedirect(true);
  }, [data]);

  const onSubmit = data => {
    if (edit != undefined && patient != undefined) {
      doFetch("put", "/api/patients/" + id, data);
    } else {
      doFetch("post", "/api/patients/", data);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {redirect && <Redirect to="/patients" />}
      <div>
        <NameCard
          register={register}
          errors={errors}
          disabled={edit != undefined ? !edit : ""}
        />
        <SingleInput
          label="NHS number"
          name="nhs_number"
          register={register}
          errors={errors}
          disabled={edit != undefined ? !edit : ""}
          required={true}
        />
        <AddressCard
          name="address"
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

export default PatientForm;
