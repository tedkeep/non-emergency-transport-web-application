import axios from "axios";
import {
  GET_USER_BEGIN,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE
} from "./actionTypes";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: GET_USER_BEGIN });

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

  axios
    .get("/api/auth/user", config)
    .then(res =>
      dispatch({
        type: GET_USER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USER_FAILURE
      })
    );
};

export const login = ({ email, password }) => dispatch => {
  dispatch({ type: LOGIN_USER_BEGIN });

  // headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post("/api/auth", body, config)
    .then(res =>
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      // dispatch(
      //   returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      // );
      dispatch({
        type: LOGIN_USER_FAILURE
      });
    });
};
