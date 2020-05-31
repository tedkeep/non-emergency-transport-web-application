import axios from "axios";
import {
  LOADING_SCHEDULE,
  GET_SCHEDULES,
  VIEW_SCHEDULE,
  EDIT_SCHEDULE,
  DELETE_SCHEDULE,
  ADD_SCHEDULE
} from "./actionTypes";

export const getSchedules = () => (dispatch, getState) => {
  dispatch({ type: LOADING_SCHEDULE });

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
  axios.get("/api/schedule/", config).then(res => {
    dispatch({
      type: GET_SCHEDULES,
      payload: res.data
    });
  });
};

export const getSchedule = id => (dispatch, getState) => {
  dispatch({ type: LOADING_SCHEDULE });

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

  axios.get("/api/schedule/" + id, config).then(res => {
    dispatch({
      type: VIEW_SCHEDULE,
      payload: res.data
    });
  });
};

export const editSchedule = (schedule, _id) => (dispatch, getState) => {
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

  axios.put("/api/schedule/" + _id, schedule, config).then(res => {
    dispatch({
      type: EDIT_SCHEDULE,
      payload: res.data
    });
  });
};

export const addSchedule = schedule => (dispatch, getState) => {
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

  axios.post("/api/schedule/", schedule, config).then(res => {
    dispatch({
      type: ADD_SCHEDULE,
      payload: res.data
    });
  });
};

export const deleteSchedule = id => (dispatch, getState) => {
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

  axios.delete("/api/schedule/" + id, config).then(res => {
    dispatch({
      type: DELETE_SCHEDULE,
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
