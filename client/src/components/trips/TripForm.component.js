import React, { useEffect, useState } from "react";
import { Button, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { useParams, Redirect } from "react-router-dom";
import useApi from "../../hooks/useApi.hook";

import SingleInput from "../general/form/SingleInput.component";
import AddressCard from "../general/form/AddressCard.component";
import DateTimeCard from "../general/form/DateTimeCard.component";
import ReturnTripCard from "../general/form/ReturnTripCard.component";
import SearchPatientCard from "../general/form/SearchPatientCard.component";
import TextboxCard from "../general/form/TextboxCard.component";
import JourneyTimeCard from "../general/form/JourneyTimeCard.component";

import TripCard from "../general/form/TripCard.component";

const TripForm = props => {
  const { trip, edit } = props;
  const [redirect, setRedirect] = useState(false);
  const [{ data }, doFetch] = useApi();
  const { id } = useParams();
  const { register, handleSubmit, errors, getValues } = useForm({
    defaultValues: {
      ...trip
    }
  });

  useEffect(() => {
    if (data != undefined) setRedirect(true);
  }, [data]);

  const onSubmit = data => {
    // alert(JSON.stringify(data));
    if (edit != undefined) {
      doFetch("put", "/api/trips/" + id, data);
    } else {
      doFetch("post", "/api/trips/", data);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {redirect && <Redirect to="/trips" />}
      <div>
        <SearchPatientCard
          patient={trip.patient}
          register={register}
          errors={errors}
          disabled={edit != undefined ? !edit : ""}
        />
        <SingleInput
          label="Reason"
          name="reason"
          register={register}
          errors={errors}
          disabled={edit != undefined ? !edit : ""}
          required={true}
        />
        <TripCard
          register={register}
          errors={errors}
          disabled={edit != undefined ? !edit : ""}
          trip={trip.from_address !== "" && trip}
        />
        <ReturnTripCard
          register={register}
          errors={errors}
          disabled={edit != undefined ? !edit : ""}
          getValues={getValues}
        />
        <TextboxCard
          label="Notes"
          name="notes"
          register={register}
          errors={errors}
          disabled={edit != undefined ? !edit : ""}
          required={false}
        />
        {edit != undefined ? (
          edit && (
            <Button outline color="primary">
              Update
            </Button>
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

export default TripForm;
