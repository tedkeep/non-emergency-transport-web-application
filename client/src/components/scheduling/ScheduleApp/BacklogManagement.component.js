import React from "react";
import styled from "styled-components";
import { Button } from "reactstrap";

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

const BacklogManagement = props => {
  const { data } = props;

  return (
    <Container>
      <Title>
        <h4 style={{ textAlign: "center" }}>Backlog</h4>
      </Title>
      <Actions>
        <Button style={{ marginRight: "1rem" }} outline colour="secondary">
          Filter
        </Button>
      </Actions>
    </Container>
  );
};

export default BacklogManagement;
