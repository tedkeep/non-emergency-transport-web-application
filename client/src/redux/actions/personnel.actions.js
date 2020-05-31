import axios from "axios";
import {
  LOADING_PERSONNEL,
  GET_PERSONNEL,
  VIEW_PERSONNEL,
  EDIT_PERSONNEL,
  DELETE_PERSONNEL,
  ADD_PERSONNEL
} from "./actionTypes";

export const getPersonnel = () => (dispatch, getState) => {
  dispatch({ type: LOADING_PERSONNEL });

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

  axios.get("/api/personnel/", config).then(res => {
    dispatch({
      type: GET_PERSONNEL,
      payload: res.data
    });
  });
};

export const getPerson = id => (dispatch, getState) => {
  dispatch({ type: LOADING_PERSONNEL });

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

  axios.get("/api/personnel/" + id, config).then(res => {
    dispatch({
      type: VIEW_PERSONNEL,
      payload: res.data
    });
  });
};

export const editPerson = (id, data) => (dispatch, getState) => {
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

  axios.put("/api/personnel/" + id, data, config).then(res => {
    dispatch({
      type: EDIT_PERSONNEL,
      payload: res.data
    });
  });
};

export const addPersonnel = person => (dispatch, getState) => {
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

  axios.post("/api/personnel/", person, config).then(res => {
    dispatch({
      type: ADD_PERSONNEL,
      payload: res.data
    });
  });
};

export const deletePersonnel = id => (dispatch, getState) => {
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

  axios.delete("/api/personnel/" + id, config).then(res => {
    dispatch({
      type: DELETE_PERSONNEL,
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
