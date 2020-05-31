import React, { useState, useEffect, useLayoutEffect } from "react";
import { Button, Row, Col } from "reactstrap";
import { useRouteMatch, useHistory } from "react-router-dom";
import useApi from "../../hooks/useApi.hook";

import TableList from "../general/table/TableList.component";

const VehicleDashboard = () => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const [{ data }, doFetch] = useApi();

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    doFetch("get", "/api/vehicle/");
  });

  useLayoutEffect(() => {
    if (data != undefined) {
      formatTableData();
    }
  }, [data]);

  useEffect(() => {}, []);

  const loadAddComponent = () => {
    history.push(`${url}/add`);
  };

  const formatTableData = () => {
    const sortedData = [];
    data.map((val, index) => {
      if (val.reg_num != undefined) {
        sortedData.push({
          id: val._id,
          reg_num: val.reg_num,
          type: val.type.code,
          stationed_at: val.stationed_at.name
        });
      }
    });
    setTableData(sortedData);
  };

  return (
    <div>
      <div className="actionsSection">
        <Button outline color="primary" onClick={() => loadAddComponent()}>
          Add vehicle
        </Button>
      </div>
      <div className="cardSection">
        <Row>
          <Col xs="4">
            <TableList dataType="vehicle" data={tableData} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default VehicleDashboard;
