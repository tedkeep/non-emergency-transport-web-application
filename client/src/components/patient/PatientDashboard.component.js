import React, { useState, useEffect, useLayoutEffect } from "react";
import { Button, Row, Col } from "reactstrap";
import { useRouteMatch, useHistory } from "react-router-dom";
import useApi from "../../hooks/useApi.hook";

import TableList from "../general/table/TableList.component";

const PatientDashboard = () => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const [{ data }, doFetch] = useApi();

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    doFetch("get", "/api/patients/");
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
    console.log(JSON.stringify(data));
    data.map((val, index) => {
      if (val.first_name != undefined) {
        sortedData.push({
          id: val._id,
          name: `${val.first_name} ${val.last_name}`,
          address: val.address.street
        });
      }
    });
    setTableData(sortedData);
  };

  return (
    <div>
      <div className="actionsSection">
        <Button outline color="primary" onClick={() => loadAddComponent()}>
          Add Patient
        </Button>
      </div>
      <div className="cardSection">
        <Row>
          <Col xs="4">
            <TableList dataType="patient" data={tableData} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PatientDashboard;
