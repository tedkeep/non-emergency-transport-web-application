import axios from "axios";
import {
  LOADING_VEHICLES,
  GET_VEHICLES,
  VIEW_VEHICLE,
  EDIT_VEHICLE,
  DELETE_VEHICLE,
  ADD_VEHICLE
} from "./actionTypes";

export const getVehicles = () => (dispatch, getState) => {
  dispatch({ type: LOADING_VEHICLES });

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

  axios.get("/api/vehicles/", config).then(res => {
    dispatch({
      type: GET_VEHICLES,
      payload: res.data
    });
  });
};

export const getVehicle = id => (dispatch, getState) => {
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

  axios.get("/api/vehicles/" + id, config).then(res => {
    dispatch({
      type: VIEW_VEHICLE,
      payload: res.data
    });
  });
};

export const editVehicle = vehicle => (dispatch, getState) => {
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

  const { _id, reg_num, available } = vehicle;

  const body = JSON.stringify({ reg_num, available });

  axios.put("/api/vehicles/" + _id, body, config).then(res => {
    dispatch({
      type: EDIT_VEHICLE,
      payload: res.data
    });
  });
};

export const addVehicle = vehicle => (dispatch, getState) => {
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

  axios.post("/api/vehicles/", vehicle, config).then(res => {
    dispatch({
      type: ADD_VEHICLE,
      payload: res.data
    });
  });
};

export const deleteVehicle = id => (dispatch, getState) => {
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

  axios.delete("/api/vehicles/" + id, config).then(res => {
    dispatch({
      type: DELETE_VEHICLE,
      payload: res.data
    });
  });
};

// const getHeader = () => getState => {
//   const token = getState().auth.token;

//   // Headers
//   const config = {
//     headers: {
//       "Content-type": "application/json"
//     }
//   };

//   // If token, add to headers
//   if (token) {
//     config.headers["x-auth-token"] = token;
//   }

//   return config;
// };
