import {
  LOADING_SKILL,
  ADD_SKILL,
  GET_ALL_SKILLS,
  DELETE_SKILL
} from "../actions/actionTypes";

const initialState = {
  skills: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_SKILL:
      return {
        ...state,
        loading: true
      };
    case GET_ALL_SKILLS:
    case ADD_SKILL:
    case DELETE_SKILL:
      return {
        ...state,
        skills: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
