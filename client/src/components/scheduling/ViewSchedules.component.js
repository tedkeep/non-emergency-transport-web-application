import React, { useEffect, useState, getState } from "react";
import { Container, Table } from "reactstrap";
import { connect } from "react-redux";
import { getSchedules } from "../../redux/actions/schedule.actions";
import { getVehicle } from "../../redux/actions/vehicle.actions";
import axios from "axios";

function ViewSchedules(props) {
  const [list, setList] = useState([]);

  useEffect(() => {
    var tempList = [];
    async function fetchData() {
      await props.getSchedules();

      const token = localStorage.getItem("token");

      // Headers
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      };

      // If token, add to headers
      if (token) {
        config.headers["x-auth-token"] = token;
      }
      console.log(tempList);
      await props.schedules.map((schedule, index) => {
        const vehicle = axios.get("/api/vehicles/" + schedule.vehicle, config);
        tempList.push({
          index,
          date: new Date(schedule.date).toISOString().substr(0, 10),
          reg_num: vehicle.reg_num,
          personnel: schedule.personnel.length,
          trips: schedule.trips.length
        });
      });
      console.log(tempList);
      setList(tempList);
    }
    fetchData();
  }, []);

  return (
    <Container>
      <Table striped>
        <thead>
          <tr>
            <th>Date</th>
            <th>Vehicle</th>
            <th>Num. of staff</th>
            <th>Num. of trips</th>
          </tr>
        </thead>
        <tbody>
          {list.map(schedule => (
            <tr key={schedule.index}>
              <td>{schedule.date}</td>
              <td>{schedule.reg_num}</td>
              <td>{schedule.personnel}</td>
              <td>{schedule.trips}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

const mapStateToProps = state => ({
  schedules: state.schedule.schedules,
  vehicle: state.vehicle.vehicle,
  token: state.auth.token
});

export default connect(mapStateToProps, { getSchedules, getVehicle })(
  ViewSchedules
);
