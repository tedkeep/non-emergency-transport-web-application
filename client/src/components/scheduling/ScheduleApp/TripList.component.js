import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

import Trip from "./Trip.component";

const TripList = props => {
  const { data } = props;

  const Container = styled.div`
    padding: 10px;
    width: 100%;
    flex-grow: 1;
    height: 100%;
    border: 1px solid lightgrey;
    border-radius: 5px;
    background-color: ${props =>
      props.isDraggingOver ? "skyblue" : "inherit"};
  `;

  return (
    <Droppable droppableId="backlog" type="trip">
      {(provided, snapshot) => (
        <Container
          {...provided.droppableProps}
          ref={provided.innerRef}
          isDraggingOver={snapshot.isDraggingOver}
        >
          {data.backlog.trips.map((tripId, index) => {
            const trip = data.trips[tripId];

            return (
              <Trip key={trip._id} trip={trip} index={index} margin="bottom" />
            );
          })}
          {provided.placeholder}
        </Container>
      )}
    </Droppable>
  );
};

export default TripList;
