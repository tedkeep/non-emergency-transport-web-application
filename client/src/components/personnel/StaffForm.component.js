import React, { useEffect, useState } from "react";
import { Button, Form } from "reactstrap";
import { useForm, useFieldArray } from "react-hook-form";
import { useParams, Redirect } from "react-router-dom";
import useApi from "../../hooks/useApi.hook";

import NameCard from "../general/form/NameCard.component";
import AvailableCard from "../general/form/AvailableCard.component";
import SingleInput from "../general/form/SingleInput.component";
import ShiftsCard from "../general/form/ShiftsCard.component";
import UnavailableCard from "../general/form/UnavailableCard.component";
import SkillsCard from "../general/form/SkillsCard.component";
import StationedAtCard from "../general/form/StationedAtCard.component";

const StaffForm = props => {
  const { employee, edit } = props;
  const [redirect, setRedirect] = useState(false);
  const [{ data }, doFetch] = useApi();
  const { id } = useParams();
  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {
      first_name: employee.first_name,
      last_name: employee.last_name,
      available: employee.available,
      staff_number: employee.staff_number,
      shifts: employee.shifts,
      unavailable: employee.unavailable,
      stationed_at: employee.stationed_at,
      skills: employee.skills
    }
  });

  useEffect(() => {
    if (data != undefined) setRedirect(true);
  }, [data]);

  const onSubmit = data => {
    if (edit != undefined && employee != undefined) {
      doFetch("put", "/api/personnel/" + id, data);
    } else {
      doFetch("post", "/api/personnel/", data);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {redirect && <Redirect to="/staff" />}
      <div>
        <NameCard
          register={register}
          errors={errors}
          disabled={edit != undefined ? !edit : ""}
        />
        <AvailableCard
          register={register}
          errors={errors}
          disabled={edit != undefined ? !edit : ""}
        />
        <SingleInput
          label="Staff number"
          name="staff_number"
          register={register}
          errors={errors}
          disabled={edit != undefined ? !edit : ""}
          required={true}
        />
        <ShiftsCard
          register={register}
          errors={errors}
          control={control}
          useFieldArray={useFieldArray}
          disabled={edit != undefined ? !edit : ""}
        />
        <UnavailableCard
          register={register}
          errors={errors}
          control={control}
          useFieldArray={useFieldArray}
          disabled={edit != undefined ? !edit : ""}
        />
        <SkillsCard
          register={register}
          errors={errors}
          control={control}
          useFieldArray={useFieldArray}
          disabled={edit != undefined ? !edit : ""}
        />
        <StationedAtCard
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

export default StaffForm;
