import React, { useEffect } from "react";
import { Card, CardBody, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import { getAllStations } from "../../../redux/actions/station.actions";

import useApi from "../../../hooks/useApi.hook";

const StationedAtCard = props => {
  const { register, errors, disabled } = props;

  const [{ data }, doFetch] = useApi();

  useEffect(() => {
    doFetch("get", "/api/station");
  }, []);

  return (
    <Card>
      <CardBody>
        <FormGroup>
          <Label for="stationed_at">Stationed at</Label>
          {data != undefined ? (
            <Input
              name="stationed_at"
              type="select"
              innerRef={register}
              invalid={errors.stationed_at}
              disabled={disabled != undefined ? disabled : false}
            >
              {data.map((station, index) => {
                return (
                  <option key={station._id} value={station._id}>
                    {station.name}
                  </option>
                );
              })}
            </Input>
          ) : (
            ""
          )}
        </FormGroup>
      </CardBody>
    </Card>
  );
};

const mapStateToProps = state => ({
  stations: state.station.stations,
  loading: state.station.loading
});

export default connect(mapStateToProps, { getAllStations })(StationedAtCard);
