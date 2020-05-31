import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Trip from "./Trip.component";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const Container = styled.div`
  margin: 10px;
  border: ${props =>
    props.error ? "2px solid #d9534f" : "1px solid lightgrey"};
  border-radius: 5px;
  display: flex;
  height: 150px;
  background-color: rgb(247, 248, 250);
`;

const Handle = styled.div`
  padding: 10px;
  width: 30%;
`;

const TripsList = styled.div`
  padding: 10px;
  display: flex;
  width: 100%;
  background-color: ${props => (props.isDraggingOver ? "skyblue" : "inherit")};
`;

const animatedComponents = makeAnimated();

const Schedule = props => {
  const {
    schedule,
    trips,
    index,
    employees,
    handleScheduleEmployeeChange
  } = props;
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState(null);

  useEffect(() => {
    const formattedEmployees = [];

    for (const id in employees) {
      const label = `${employees[id].first_name} ${employees[id].last_name}`;
      const object = {
        value: id,
        label: label
      };

      formattedEmployees.push(object);
    }

    setOptions(formattedEmployees);
  }, []);

  useEffect(() => {
    if (options.length !== 0) {
      const selectedEmployees = getSelectedOptions(schedule.staff);

      setSelectedOptions(selectedEmployees);
    }
  }, [options]);

  const getSelectedOptions = values => {
    const selectedEmployees = [];
    options.forEach((option, index) => {
      if (values.includes(option.value)) {
        selectedEmployees.push(options[index]);
      }
    });
    return selectedEmployees;
  };

  const handleEmployeeSelectChange = selectedData => {
    let values = undefined;
    if (Array.isArray(selectedData)) {
      values = selectedData.map(data => {
        return data.value;
      });
    } else {
      values = [selectedData];
    }
    console.log(values);

    setSelectedOptions(getSelectedOptions(values));
    handleScheduleEmployeeChange(values, schedule._id);
  };

  return (
    <Draggable draggableId={schedule._id} index={index}>
      {provided => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          error={schedule.error ? true : false}
        >
          <Handle {...provided.dragHandleProps}>
            <p>{schedule.reg_num}</p>
            <Select
              value={selectedOptions}
              placeholder="Select employees"
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={options}
              onChange={handleEmployeeSelectChange}
            />
          </Handle>
          <Droppable
            droppableId={schedule._id}
            direction="horizontal"
            type="trip"
          >
            {(provided, snapshot) => (
              <TripsList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {trips.map((trip, index) => (
                  <Trip
                    key={trip._id}
                    trip={trip}
                    index={index}
                    margin="right"
                  />
                ))}
                {provided.placeholder}
              </TripsList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};

export default Schedule;
