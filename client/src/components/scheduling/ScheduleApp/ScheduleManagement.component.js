import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Button,
  Popover,
  PopoverBody,
  PopoverHeader,
  Input,
  Alert
} from "reactstrap";

const Container = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
  grid-template-rows: 20% 80%;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  background-color: ${props => (props.isDraggingOver ? "skyblue" : "inherit")};
`;

const Title = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
`;

const Actions = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
  text-align: center;
`;

const ScheduleManagement = props => {
  const { data, addSchedule } = props;

  const [addOpen, setAddOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState();
  const [availableVehicles, setAvailableVehicles] = useState([]);
  const [error, setError] = useState({
    status: false,
    message: ""
  });

  useEffect(() => {
    const vehicles = [];
    for (const vehicleId in data.vehicles) {
      let vehicleFound = false;
      for (const scheduleId in data.schedules) {
        if (data.schedules[scheduleId].vehicle === vehicleId) {
          vehicleFound = true;
          break;
        }
      }
      if (!vehicleFound) {
        vehicles.push(data.vehicles[vehicleId]);
      }
    }
    setAvailableVehicles(vehicles);
  }, [data]);

  const toggle = () => setAddOpen(!addOpen);

  const onAddSchedule = () => {
    if (selectedVehicle == undefined) {
      setError({
        status: true,
        message: "A vehicle needs to be selected"
      });
    } else {
      addSchedule(selectedVehicle);
      setAddOpen(false);
      setError({
        status: false,
        message: ""
      });
    }
  };

  const populateSelect = () => {
    availableVehicles = [];
    for (const vehicleId in data.vehicles) {
      const vehicleFound = false;
      for (const schedule in data.schedules) {
        if (data.schedules[schedule].vehicle === vehicleId) {
          vehicleFound = true;
          console.log(vehicleFound);
          break;
        }
      }
      if (!vehicleFound) {
        availableVehicles.push(data.vehicles[vehicleId].reg_num);
      }
    }

    if (availableVehicles.length === 0) {
      return <p>No available vehicles left for this date.</p>;
    } else {
      return <div></div>;
    }
  };

  return (
    <Container>
      <Title>
        <h4 style={{ textAlign: "center" }}>Schedules</h4>
      </Title>
      <Actions>
        <Button style={{ marginRight: "1rem" }} outline colour="secondary">
          Filter
        </Button>
        <Button id="Add" outline colour="primary">
          +
        </Button>
        <Popover
          placement="bottom"
          isOpen={addOpen}
          target="Add"
          toggle={toggle}
        >
          <PopoverHeader>Add schedule</PopoverHeader>
          <PopoverBody>
            {error.status && <Alert color="danger">{error.message}</Alert>}
            <Input
              type="select"
              onChange={e => setSelectedVehicle(data.vehicles[e.target.value])}
              defaultValue="undefined"
            >
              <option disabled value="undefined">
                Choose vehicle
              </option>
              {availableVehicles.map((vehicle, index) => {
                return (
                  <option key={index} id={index} value={vehicle._id}>
                    {vehicle.reg_num}
                  </option>
                );
              })}
            </Input>
            <Button onClick={() => onAddSchedule()} color="primary">
              Add schedule
            </Button>
          </PopoverBody>
        </Popover>
      </Actions>
    </Container>
  );
};

export default ScheduleManagement;
