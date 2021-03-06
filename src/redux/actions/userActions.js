import * as types from "./actionTypes";
import * as userApi from "../../api/userApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadUsersSuccess(users) {
  return { type: types.LOAD_USERS_SUCCESS, users };
}

export function updateStats(chores) {
  return { type: types.UPDATE_USER_STATS, chores };
}

export function loadUsers() {
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return userApi
      .getUsers()
      .then((users) => {
        dispatch(loadUsersSuccess(users));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error; // this doesn't do anything other than highlight doing something with the error
      })
      .then(() => {
        dispatch(updateStats(getState().chores));
      });
  };
}
