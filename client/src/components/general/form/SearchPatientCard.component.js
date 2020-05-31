import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  FormGroup,
  Label,
  Alert,
  FormFeedback,
  Input,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import useApi from "../../../hooks/useApi.hook";

const SearchPatientCard = props => {
  const { errors, disabled, register, patient } = props;
  const [{ data }, doFetch] = useApi();

  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState();
  const [patients, setPatients] = useState([]);
  const [patientId, setPatientId] = useState();

  useEffect(() => {
    doFetch("get", "/api/patients/");
    if (patient != undefined) {
      setPatientId(patient._id);
      setSelectedPatient(`${patient.first_name} ${patient.last_name}`);
    }
  }, []);

  useEffect(() => {
    if (data != undefined) {
      setPatients(data);
    }
  }, [data]);

  const filterPatients = e => {
    if (e.target.value === "") {
      setFilteredPatients([]);
    } else {
      console.log("here");
      const list = patients.filter(patient => {
        console.log("inside");
        if (
          patient.first_name !== undefined &&
          patient.last_name !== undefined
        ) {
          if (
            patient.first_name
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            patient.last_name
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
          ) {
            console.log("true");
            return true;
          }
        }
        console.log("false");
        return false;
      });
      console.log(list);
      setFilteredPatients(list);
    }
  };

  const setPatient = (id, last_name, first_name) => {
    setPatientId(id);
    setSelectedPatient(`${first_name} ${last_name}`);
  };

  return (
    <Card>
      <CardBody>
        <FormGroup>
          <Label for="patientSearch">Search for a patient</Label>
          <Input
            type="text"
            name="patientSearch"
            onChange={e => filterPatients(e)}
            invalid={errors.start_time}
            disabled={disabled != undefined ? disabled : false}
          />
          <Input
            type="hidden"
            name="patient"
            innerRef={register({ required: true })}
            invalid={errors.patient}
            value={patientId}
          />
          <FormFeedback>A patient needs to be selected</FormFeedback>
        </FormGroup>
        {selectedPatient != undefined && (
          <Alert color="primary">Selected patient: {selectedPatient}</Alert>
        )}
        <ListGroup className="patient_list">
          {filteredPatients.map(({ _id, first_name, last_name }) => (
            <ListGroupItem
              action
              onClick={() => setPatient(_id, last_name, first_name)}
              className="listGroupItemPatient"
            >
              {last_name}, {first_name}
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default SearchPatientCard;
