import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 10px;
  margin-${props => props.margin}: 10px;
  background-color: white;
`;

const Trip = props => {
  const { trip, index } = props;

  const formatAddress = unformattedAddress => {
    if (unformattedAddress.includes(",")) {
      const sections = unformattedAddress.split(",");
      return `${sections[0]}, ${sections[1]}`;
    } else {
      return unformattedAddress;
    }
  };

  const formatTime = (unformattedTime, journeyTime) => {
    const timeArray = unformattedTime.split(":");

    let time = new Date();
    time.setHours(timeArray[0]);
    time.setMinutes(timeArray[1]);
    time = new Date(time.getTime() + journeyTime * 1000);

    return `${time.getHours()}:${
      time.getMinutes() < 10 ? "0" : ""
    }${time.getMinutes()}`;
  };

  return (
    <Draggable draggableId={trip._id} index={index}>
      {provided => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          margin={props.margin}
        >
          <h5>
            <b>
              {trip.time} -{" "}
              {formatTime(trip.time, trip.estimated_journey_time.value)}
            </b>{" "}
            ({trip.estimated_journey_time.text})
          </h5>
          <h6>
            <b>{formatAddress(trip.from_address)}</b> to
          </h6>
          <h6>
            <b>{formatAddress(trip.to_address)}</b>
          </h6>
          <p>
            {trip.patient.first_name} {trip.patient.last_name}
          </p>
        </Container>
      )}
    </Draggable>
  );
};

export default Trip;
