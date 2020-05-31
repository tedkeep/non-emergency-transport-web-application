import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Row,
  Col
} from "reactstrap";
import {
  GoogleMap,
  Autocomplete,
  useLoadScript,
  DirectionsService,
  DirectionsRenderer,
  DistanceMatrixService
} from "@react-google-maps/api";

let originAc = null;
let destinationAc = null;

const TripCard = props => {
  const { register, errors, disabled, trip } = props;
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAstrPPLT2ALymfreksSLSEQ8-TnClANYc",
    libraries: ["places"]
  });

  const [mapCenter, setMapCenter] = useState({
    lat: 54.8,
    lng: -4.6
  });
  const [mapZoom, setMapZoom] = useState(5);
  const [originPlace, setOriginPlace] = useState();
  const [destPlace, setDestPlace] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [directions, setDirections] = useState();
  const [journeyTime, setJourneyTime] = useState();

  useEffect(() => {
    if (trip.from_address !== "") {
      setOriginPlace(trip.from_address);
      setDestPlace(trip.to_address);
      setDate(trip.date);
      setTime(trip.value);
    }
  }, []);

  const onLoadOrigin = autocomplete => (originAc = autocomplete);
  const onLoadDestination = autocomplete => (destinationAc = autocomplete);
  const onOriginChanged = () => {
    setOriginPlace(originAc.getPlace().formatted_address);
    setJourneyTime();
    setDirections(undefined);
  };
  const onDestinationChanged = () => {
    setDestPlace(destinationAc.getPlace().formatted_address);
    setDirections(undefined);
    setJourneyTime();
  };
  const directionsCallback = response => {
    if (response !== null) {
      if (response.status === "OK") {
        setDirections(response);
      } else {
        console.log("response: ", response);
      }
    }
  };
  const updateTime = value => {
    setTime(value);
  };

  const updateDate = value => {
    setDate(value);
  };

  const updateJourneyTime = response => {
    if (response.rows[0]) {
      let status = response.rows[0].elements[0].status;
      if (status === "OK") {
        setJourneyTime(response.rows[0].elements[0].duration);
      }
    }
  };

  return (
    <Card>
      {isLoaded && (
        <div>
          <CardBody>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="from_address">Origin address</Label>
                  <Autocomplete
                    onLoad={onLoadOrigin}
                    onPlaceChanged={onOriginChanged}
                    restrictions={{ country: "uk" }}
                  >
                    <Input
                      name="from_address"
                      type="text"
                      placeholder="Choose an origin address"
                      innerRef={register({ required: true })}
                      disabled={disabled != undefined ? disabled : false}
                      invalid={errors.from_address}
                    />
                  </Autocomplete>
                </FormGroup>
                <FormGroup>
                  <Label for="to_address">Destination address</Label>
                  <Autocomplete
                    onLoad={onLoadDestination}
                    onPlaceChanged={onDestinationChanged}
                    restrictions={{ country: "uk" }}
                  >
                    <Input
                      name="to_address"
                      type="text"
                      placeholder="Choose a destination address"
                      innerRef={register({ required: true })}
                      disabled={disabled != undefined ? disabled : false}
                      invalid={errors.to_address}
                    />
                  </Autocomplete>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="date">Date</Label>
                  <Input
                    type="date"
                    name="date"
                    innerRef={register({ required: true })}
                    disabled={disabled != undefined ? disabled : false}
                    invalid={errors.date}
                    onChange={e => updateDate(e.target.value)}
                  />
                  <FormFeedback>A date needs to be selected</FormFeedback>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="time">Time</Label>
                  <Input
                    type="time"
                    name="time"
                    innerRef={register({ required: true })}
                    disabled={disabled != undefined ? disabled : false}
                    invalid={errors.time}
                    onChange={e => updateTime(e.target.value)}
                  />
                </FormGroup>
                <FormFeedback>A time needs to be selected</FormFeedback>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="estimated_journey_time.text">
                    Estimated journey time
                  </Label>
                  <Input
                    type="text"
                    name="estimated_journey_time.text"
                    innerRef={register({ required: true })}
                    invalid={errors["estimated_journey_time.text"]}
                    value={journeyTime !== undefined && journeyTime.text}
                    disabled
                  />
                  <Input
                    type="hidden"
                    name="estimated_journey_time.value"
                    innerRef={register({ required: true })}
                    invalid={errors["estimated_journey_time.value"]}
                    value={journeyTime !== undefined && journeyTime.value}
                  />
                  <FormFeedback>Input required</FormFeedback>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="time_to">Time to</Label>
                  <Input
                    type="select"
                    name="time_to"
                    innerRef={register}
                    disabled={disabled != undefined ? disabled : false}
                    invalid={errors.time_to}
                  >
                    <option>Arrive at destination</option>
                    <option selected>Pickup at origin</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </CardBody>

          <GoogleMap
            id="searchbox-example"
            mapContainerStyle={{
              height: "400px"
            }}
            zoom={mapZoom}
            center={mapCenter}
          >
            {originPlace !== undefined &&
              destPlace !== undefined &&
              directions === undefined && (
                <DirectionsService
                  options={{
                    origin: originPlace,
                    destination: destPlace,
                    travelMode: "DRIVING"
                  }}
                  callback={directionsCallback}
                />
              )}
            {directions !== undefined && (
              <div>
                <DirectionsRenderer
                  options={{
                    directions: directions
                  }}
                />
                {time !== undefined &&
                  date !== undefined &&
                  journeyTime === undefined && (
                    <DistanceMatrixService
                      options={{
                        origins: [originPlace],
                        destinations: [destPlace],
                        travelMode: "DRIVING",
                        drivingOptions: {
                          departureTime: new Date(`${date} ${time}`)
                        }
                      }}
                      callback={updateJourneyTime}
                    />
                  )}
              </div>
            )}
          </GoogleMap>
        </div>
      )}
    </Card>
  );
};

export default TripCard;
