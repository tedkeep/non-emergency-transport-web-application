import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import { useRouteMatch, useHistory } from "react-router-dom";

const TableList = props => {
  const { data, dataType } = props;
  const { url } = useRouteMatch();
  const history = useHistory();

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const renderTableHead = () => {
    if (tableData[0] !== undefined) {
      let head = Object.keys(tableData[0]);
      return head.map((key, index) => {
        if (key !== "_id" && key !== "id")
          return <th key={index}>{key.toUpperCase()}</th>;
      });
    }
  };

  const renderTableData = () => {
    return tableData.map((val, index) => {
      let col = Object.keys(val);
      return (
        <tr key={val.id}>
          {col.map((key, index) => {
            if (key !== "_id" && key !== "id")
              return (
                <td onClick={() => sendToDetailsPage(val.id)} key={index}>
                  {val[col[index]]}
                </td>
              );
          })}
        </tr>
      );
    });
  };

  const renderTitle = () => {
    let title = "";
    if (tableData.length === 1) {
      title = `Showing 1 ${dataType}`;
    } else {
      title = `Showing ${tableData.length} ${dataType}s`;
    }
    return title;
  };

  const sendToDetailsPage = id => {
    history.push(`${url}/view/${id}`);
  };

  return (
    <Card>
      <CardBody>
        <CardTitle>{renderTitle()}</CardTitle>
        <Table hover size="sm">
          <thead>
            <tr>{renderTableHead()}</tr>
          </thead>
          <tbody>{renderTableData()}</tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default TableList;
