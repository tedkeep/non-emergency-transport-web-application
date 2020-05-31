import React from "react";
import { Input, Button } from "reactstrap";
import styled from "styled-components";

const Container = styled.div`
  // display: grid;
  // grid-template-columns: 80% 20%;
  // grid-template-rows: 20% 80%;
  // grid-column-gap: 10px;
  // grid-row-gap: 10px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  background-color: ${props => (props.isDraggingOver ? "skyblue" : "inherit")};
`;

const AppManagement = props => {
  const { dateChange, onSubmit } = props;

  return (
    <Container>
      <Input
        type="date"
        onChange={e => dateChange(e.target.value)}
        defaultValue={() => {
          const today = new Date();
          return today.toISOString().substring(0, 10);
        }}
      />
      <Button outline color="primary" onClick={onSubmit}>
        Submit schedules
      </Button>
    </Container>
  );
};

export default AppManagement;
