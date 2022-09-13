import React from "react";
import * as ActionTypes from "../../basic/constants/actionTypes";

const initialState = {
  error: null,
  userLoading: false,
  usersList: [],
  userDetailsLoading: false,
  userDetails: [],
  usersIds: [],
};

const setUsersIds = (userId) => {
  if (initialState.usersIds.length === 0) {
    initialState.usersIds.push(userId);
    return true;
  } else if (!initialState.usersIds.includes(userId)) {
    initialState.usersIds.push(userId);
    return true;
  } else {
    return false;
  }
};

// User List Operations
const getUserListRequest = (state, action) => ({
  ...state,
  userLoading: true,
  userDetailsLoading: true,
  error: null,
});
const getUserListSuccess = (state, action) => {
  let payload = {};
  if (action.payload.usersList) {
    payload = { usersList: action.payload.usersList };
  } else if (action.payload.userDetails) {
    const updateUserDetails = setUsersIds(action.payload.userDetails.id);
    payload = updateUserDetails && {
      userDetails: [...state.userDetails, action.payload.userDetails],
    };
  }
  if (action.payload) {
    return {
      ...state,
      ...payload,
      error: null,
      userDetailsLoading: false,
      userLoading: false,
    };
  }
};
const getUserListFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    userLoading: false,
    userDetailsLoading: false,
  };
};

export default function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_USERS_LIST_REQUEST:
      return getUserListRequest(state, action);

    case ActionTypes.GET_USERS_LIST_SUCCESS:
      return getUserListSuccess(state, action);

    case ActionTypes.GET_USERS_LIST_FAIL:
      return getUserListFail(state, action);

    default:
      return state;
  }
}
