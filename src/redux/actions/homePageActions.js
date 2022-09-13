import * as ActionTypes from "../../basic/constants/actionTypes";

export function getUsersList(payload) {
  return {
    type: ActionTypes.GET_USERS_LIST_REQUEST,
    payload,
  };
}
