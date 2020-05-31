import axios from "axios";
import {
  LOADING_TRIP,
  GET_TRIPS,
  VIEW_TRIP,
  EDIT_TRIP,
  DELETE_TRIP,
  ADD_TRIP
} from "./actionTypes";

export const getTrips = () => (dispatch, getState) => {
  dispatch({ type: LOADING_TRIP });

  const token = getState().auth.token;

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
  axios.get("/api/trips/", config).then(res => {
    dispatch({
      type: GET_TRIPS,
      payload: res.data
    });
  });
};

export const getTrip = id => (dispatch, getState) => {
  dispatch({ type: LOADING_TRIP });

  const token = getState().auth.token;

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

  axios.get("/api/trips/" + id, config).then(res => {
    dispatch({
      type: VIEW_TRIP,
      payload: res.data
    });
  });
};

export const editTrip = (trip, _id) => (dispatch, getState) => {
  const token = getState().auth.token;

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

  axios.put("/api/trips/" + _id, trip, config).then(res => {
    dispatch({
      type: EDIT_TRIP,
      payload: res.data
    });
  });
};

export const addTrip = trip => (dispatch, getState) => {
  const token = getState().auth.token;

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

  // const body = JSON.stringify({ first_name, last_name, nhs_number, address });

  axios.post("/api/trips/", trip, config).then(res => {
    dispatch({
      type: ADD_TRIP,
      payload: res.data
    });
  });
};

export const deleteTrip = id => (dispatch, getState) => {
  const token = getState().auth.token;

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

  axios.delete("/api/trips/" + id, config).then(res => {
    dispatch({
      type: DELETE_TRIP,
      payload: res.data
    });
  });
};

const getHeader = () => getState => {
  const token = getState().auth.token;

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

  return config;
};
