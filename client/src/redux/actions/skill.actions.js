import axios from "axios";
import {
  LOADING_SKILL,
  ADD_SKILL,
  GET_ALL_SKILLS,
  DELETE_SKILL
} from "./actionTypes";
import { setHeader } from "./functions.js";

export const getAllSkills = () => (dispatch, getState) => {
  dispatch({ type: LOADING_SKILL });
  const header = setHeader(getState);
  axios.get("/api/skill", header).then(res => {
    dispatch({
      type: GET_ALL_SKILLS,
      payload: res.data
    });
  });
};

export const addSkill = skill => (dispatch, getState) => {
  const header = setHeader(getState);
  axios.post("/api/skill", skill, header).then(res => {
    dispatch({
      type: ADD_SKILL,
      payload: res.data
    });
  });
};

export const deleteSkill = id => (dispatch, getState) => {
  const header = setHeader(getState);
  axios.delete("/api/skill" + id, header).then(res => {
    dispatch({
      type: DELETE_SKILL,
      payload: res.data
    });
  });
};
