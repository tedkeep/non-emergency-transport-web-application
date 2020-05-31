import axios from "axios";
import {
  LOADING_STATION,
  ADD_STATION,
  GET_ALL_STATIONS,
  DELETE_STATION
} from "./actionTypes";
import { setHeader } from "./functions.js";

export const getAllStations = () => (dispatch, getState) => {
  dispatch({ type: LOADING_STATION });
  const header = setHeader(getState);
  axios.get("/api/station", header).then(res => {
    dispatch({
      type: GET_ALL_STATIONS,
      payload: res.data
    });
  });
};

export const addStation = station => (dispatch, getState) => {
  const header = setHeader(getState);
  axios.post("/api/station", station, header).then(res => {
    dispatch({
      type: ADD_STATION,
      payload: res.data
    });
  });
};

export const deleteStation = id => (dispatch, getState) => {
  const header = setHeader(getState);
  axios.delete("/api/station" + id, header).then(res => {
    dispatch({
      type: DELETE_STATION,
      payload: res.data
    });
  });
};
