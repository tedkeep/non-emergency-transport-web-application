import {
  LOADING_SCHEDULE,
  GET_SCHEDULES,
  VIEW_SCHEDULE,
  EDIT_SCHEDULE,
  DELETE_SCHEDULE,
  ADD_SCHEDULE
} from "../actions/actionTypes";

const initialState = {
  schedules: [],
  schedule: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_SCHEDULE:
      return {
        ...state,
        loading: true
      };
    case EDIT_SCHEDULE:
    case GET_SCHEDULES:
    case ADD_SCHEDULE:
    case DELETE_SCHEDULE:
      return {
        ...state,
        schedules: action.payload,
        loading: false
      };
    case VIEW_SCHEDULE:
      return {
        ...state,
        schedule: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
