import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

import Schedule from "./Schedule.component";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 5px;
  background-color: ${props => (props.isDraggingOver ? "skyblue" : "inherit")};
  height: 100%;
`;

const ScheduleList = props => {
  const { data, handleScheduleEmployeeChange } = props;

  return (
    <Droppable droppableId="all-schedules" type="schedule">
      {(provided, snapshot) => (
        <Container
          {...provided.droppableProps}
          ref={provided.innerRef}
          isDraggingOver={snapshot.isDraggingOver}
        >
          {data.scheduleOrder.map((scheduleId, index) => {
            // get the schedule data
            const schedule = data.schedules[scheduleId];
            // get the schedules trips data
            const trips = schedule.trips.map(tripId => data.trips[tripId]);

            return (
              <Schedule
                key={schedule._id}
                schedule={schedule}
                trips={trips}
                employees={data.employees}
                handleScheduleEmployeeChange={handleScheduleEmployeeChange}
                index={index}
              />
            );
          })}
          {provided.placeholder}
        </Container>
      )}
    </Droppable>
  );
};

export default ScheduleList;
