import React from "react";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";

import TripForm from "./TripForm.component";

const TripAdd = () => {
  const history = useHistory();

  // had to create an empty model because the form currently requires an
  // object to be used for default values
  const trip = {
    patient: "",
    to_address: "",
    from_address: "",
    date: "",
    time: "",
    reason: "",
    equipment: "",
    requirements: "",
    return: "",
    return_time: "",
    notes: "",
    estimated_journey_time: {
      text: "",
      value: ""
    }
  };

  const onCancel = () => {
    history.push("/trips");
  };

  return (
    <div>
      <div className="actionsSection">
        <Button outline color="danger" onClick={onCancel}>
          Cancel
        </Button>
      </div>
      <div className="formSection">
        <TripForm trip={trip} />
      </div>
    </div>
  );
};

export default TripAdd;
