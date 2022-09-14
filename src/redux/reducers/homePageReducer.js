import * as ActionTypes from "../../basic/constants/actionTypes";

const initialState = {
  error: null,
  userLoading: false,
  usersList: [],
  userDetailsLoading: false,
  userDetails: [],
};

// User List Operations
const getUserListRequest = (state, action) => {
  return {
    ...state,
    userLoading: true,
    userDetailsLoading: true,
    error: null,
  };
};
const getUserListSuccess = (state, action) => {
  let payload = {};
  if (action.payload.usersList) {
    payload = {
      usersList: action.payload.usersList,
      userDetails: [],
    };
  } else if (action.payload.userDetails) {
    payload = {
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
