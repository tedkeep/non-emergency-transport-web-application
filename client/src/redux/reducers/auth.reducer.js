import {
  GET_USER_BEGIN,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE
} from "../actions/actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: false,
  user: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_BEGIN:
    case LOGIN_USER_BEGIN:
      return {
        ...state,
        loading: true
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case LOGIN_USER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        loading: false,
        isAuthenticated: true
      };

    case GET_USER_FAILURE:
    case LOGIN_USER_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,
        loading: false,
        user: null,
        isAuthenticated: false
      };

    default:
      return state;
  }
}
