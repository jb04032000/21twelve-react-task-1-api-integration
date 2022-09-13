import { call, fork, put, takeEvery } from "redux-saga/effects";
import * as ActionTypes from "../../basic/constants/actionTypes";
import { getUsersList } from "../services/homepage.service";

// worker for get users List.
function* workerGetUsersList(action) {
  try {
    const response = yield call(getUsersList, action.payload);
    const res_body = response ? response : {};
    const res_status = res_body.success;

    if (res_status) {
      const payload = action.payload
        ? { userDetails: res_body.data }
        : { usersList: res_body.data };
      yield put({
        type: ActionTypes.GET_USERS_LIST_SUCCESS,
        payload,
      });
    } else {
      yield put({
        type: ActionTypes.GET_USERS_LIST_FAIL,
        payload: res_body,
      });
    }
  } catch (err) {
    yield put({ type: ActionTypes.GET_USERS_LIST_FAIL, message: err.message });
  }
}

// watch for get users List.
function* watchGetUsersList() {
  yield takeEvery(ActionTypes.GET_USERS_LIST_REQUEST, workerGetUsersList);
}

// running homepage related sagas.
const homePageSagas = [fork(watchGetUsersList)];

export default homePageSagas;
