import React from "react";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";

import VehicleForm from "./VehicleForm.component";

const VehicleAdd = () => {
  const history = useHistory();

  // had to create an empty model because the form currently requires an
  // object to be used for default values
  const vehicle = {
    reg_num: "",
    available: "",
    stationed_at: "",
    type: ""
  };

  const onCancel = () => {
    history.push("/vehicle");
  };

  return (
    <div>
      <div className="actionsSection">
        <Button outline color="danger" onClick={onCancel}>
          Cancel
        </Button>
      </div>
      <div className="formSection">
        <VehicleForm vehicle={vehicle} />
      </div>
    </div>
  );
};

export default VehicleAdd;
