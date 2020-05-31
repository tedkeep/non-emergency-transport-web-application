import React, { useState, useEffect, useLayoutEffect } from "react";
import { Button, Row, Col } from "reactstrap";
import { useRouteMatch, useHistory } from "react-router-dom";
import useApi from "../../hooks/useApi.hook";

import TableList from "../general/table/TableList.component";

const StaffDashboard = () => {
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const [{ data, isLoading, isError, errorMessage }, doFetch] = useApi();

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    doFetch("get", "/api/personnel/");
  });

  useLayoutEffect(() => {
    if (data != undefined) {
      formatTableData();
    }
  }, [data]);

  useEffect(() => {}, []);

  const loadAddStaffComponent = () => {
    history.push(`${url}/add`);
  };

  const formatTableData = () => {
    const sortedData = [];
    data.map((val, index) => {
      if (val.first_name != undefined) {
        sortedData.push({
          id: val._id,
          first_name: val.first_name,
          last_name: val.last_name
        });
      }
    });
    setTableData(sortedData);
  };

  return (
    <div>
      <div className="actionsSection">
        <Button outline color="primary" onClick={() => loadAddStaffComponent()}>
          Add staff
        </Button>
      </div>
      <div className="cardSection">
        <Row>
          <Col xs="4">
            <TableList dataType="employee" data={tableData} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default StaffDashboard;
