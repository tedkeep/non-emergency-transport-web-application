import axios from "axios";
import {
  LOADING_PATIENTS,
  GET_PATIENTS,
  VIEW_PATIENT,
  EDIT_PATIENT,
  DELETE_PATIENT,
  ADD_PATIENT
} from "./actionTypes";

export const getPatients = () => (dispatch, getState) => {
  dispatch({ type: LOADING_PATIENTS });

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

  axios.get("/api/patients/", config).then(res => {
    dispatch({
      type: GET_PATIENTS,
      payload: res.data
    });
  });
};

export const getPatient = id => (dispatch, getState) => {
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

  axios.get("/api/patients/" + id, config).then(res => {
    dispatch({
      type: VIEW_PATIENT,
      payload: res.data
    });
  });
};

export const editPatient = patient => (dispatch, getState) => {
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

  const { _id, first_name, last_name, nhs_number, address } = patient;

  const body = JSON.stringify({ first_name, last_name, nhs_number, address });

  axios.put("/api/patients/" + _id, body, config).then(res => {
    dispatch({
      type: EDIT_PATIENT,
      payload: res.data
    });
  });
};

export const addPatient = patient => (dispatch, getState) => {
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

  axios.post("/api/patients/", patient, config).then(res => {
    dispatch({
      type: ADD_PATIENT,
      payload: res.data
    });
  });
};

export const deletePatient = id => (dispatch, getState) => {
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

  axios.delete("/api/patients/" + id, config).then(res => {
    dispatch({
      type: DELETE_PATIENT,
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
