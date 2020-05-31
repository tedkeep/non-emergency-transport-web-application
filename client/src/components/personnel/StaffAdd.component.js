import React, { useState } from "react";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";

import StaffForm from "./StaffForm.component";

const StaffAdd = () => {
  const history = useHistory();

  // had to create an empty model because the form currently requires an
  // employee to be used for default values
  const employee = {
    first_name: "",
    last_name: "",
    available: "",
    staff_number: "",
    shifts: "",
    unavailable: "",
    stationed_at: "",
    skills: ""
  };

  const onCancel = () => {
    history.push("/staff");
  };

  return (
    <div>
      <div className="actionsSection">
        <Button outline color="danger" onClick={onCancel}>
          Cancel
        </Button>
      </div>
      <div className="formSection">
        <StaffForm employee={employee} />
      </div>
    </div>
  );
};

export default StaffAdd;
