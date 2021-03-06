import { take, put, call, select, takeEvery } from 'redux-saga/effects';
import { setTokenApi, clearTokenApi, registration, login } from '../../api';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registrationFailure,
  registrationSuccess,
  registrationRequest,
  logout
} from './actions';
import { getTokenFromLocalStorage, setTokenToLocalStorage, removeTokenFromLocalStorage } from '../../localStorage';
import { getIsAuthorized } from './selector';

export function* registrationFlow() {
  yield takeEvery(registrationRequest, function*(action) {
    try {
      const response = yield call(registration, action.payload);
      const token = response.data.jwt;
      yield call(setTokenToLocalStorage, token);
      yield call(setTokenApi, token);
      yield put(registrationSuccess());
    } catch (e) {
      yield put(registrationFailure(e));
    }
  });
}

export function* loginFlow() {
  yield takeEvery(loginRequest, function*(action) {
    try {
      const response = yield call(login, action.payload);
      const token = response.data.jwt;
      yield call(setTokenToLocalStorage, token);
      yield call(setTokenApi, token);
      yield put(loginSuccess());
    } catch (e) {
      yield put(loginFailure(e));
    }
  });
}

export function* authFlow() {
  while (true) {
    const isAuthorized = yield select(getIsAuthorized);
    const localStorageToken = yield call(getTokenFromLocalStorage);

    if (!isAuthorized && localStorageToken) {
      yield call(setTokenApi, localStorageToken);
      yield put(loginSuccess());
    }

    yield take(logout);

    yield call(removeTokenFromLocalStorage);
    yield call(clearTokenApi);
  }
}
