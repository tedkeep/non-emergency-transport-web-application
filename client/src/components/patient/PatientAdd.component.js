import React from "react";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";

import PatientForm from "./PatientForm.component";

const PatientAdd = () => {
  const history = useHistory();

  // had to create an empty model because the form currently requires an
  // object to be used for default values
  const patient = {
    first_name: "",
    last_name: "",
    nhs_number: "",
    address: ""
  };

  const onCancel = () => {
    history.push("/patient");
  };

  return (
    <div>
      <div className="actionsSection">
        <Button outline color="danger" onClick={onCancel}>
          Cancel
        </Button>
      </div>
      <div className="formSection">
        <PatientForm patient={patient} />
      </div>
    </div>
  );
};

export default PatientAdd;
