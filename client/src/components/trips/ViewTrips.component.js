import React, { useEffect } from "react";
import { Container, Table, Spinner } from "reactstrap";
import { connect } from "react-redux";
import { getTrips } from "../../redux/actions/trip.actions";
import { useHistory } from "react-router-dom";

function ViewTrips(props) {
  const history = useHistory();

  useEffect(() => {
    props.getTrips();
  }, []);

  return (
    <Container>
      <br />
      {props.isLoading ? (
        <Spinner color="primary" />
      ) : (
        <Table striped>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {props.trips.map(
              (
                {
                  _id,
                  origin_address,
                  destination_address,
                  patient,
                  date_time
                },
                index
              ) => (
                <tr
                  key={index}
                  onClick={() => {
                    if (patient != undefined) history.push("/trips/" + _id);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    {patient.first_name} {patient.last_name}
                  </td>
                  <td>
                    {origin_address.street}, {origin_address.town}
                  </td>
                  <td>
                    {destination_address.street}, {destination_address.town}
                  </td>
                  <td>{date_time}</td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

const mapStateToProps = state => ({
  trips: state.trip.trips,
  isLoading: state.trip.loading
});

export default connect(mapStateToProps, { getTrips })(ViewTrips);
