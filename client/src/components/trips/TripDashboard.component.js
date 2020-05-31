import React, { useState, useEffect, useLayoutEffect } from "react";
import { Button, Row, Col } from "reactstrap";
import { useRouteMatch, useHistory } from "react-router-dom";
import useApi from "../../hooks/useApi.hook";

import TableList from "../general/table/TableList.component";

const TripDashboard = () => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const [{ data }, doFetch] = useApi();

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    doFetch("get", "/api/trips/");
  });

  useLayoutEffect(() => {
    if (data != undefined) {
      formatTableData();
    }
  }, [data]);

  const loadAddComponent = () => {
    history.push(`${url}/add`);
  };

  const formatTableData = () => {
    const sortedData = [];
    data.map((val, index) => {
      if (val.to_address != undefined) {
        let date = new Date(val.date);
        sortedData.push({
          id: val._id,
          reason: val.reason,
          patient: `${val.patient.first_name} ${val.patient.last_name}`,
          from: val.from_address,
          to: val.to_address,
          date: date.toDateString()
        });
      }
    });
    setTableData(sortedData);
  };

  return (
    <div>
      <div className="actionsSection">
        <Button outline color="primary" onClick={() => loadAddComponent()}>
          Add trip
        </Button>
      </div>
      <div className="cardSection">
        <Row>
          <Col xs="6">
            <TableList dataType="trip" data={tableData} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TripDashboard;
