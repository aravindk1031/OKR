import {put, call} from 'redux-saga/effects';
import {getOkrs} from '../api/okr-results';
import {updateOkrs, updateLoaderStatus} from '../actions';

export const getOkrResults = function* () {
  try {
    yield put(updateLoaderStatus(true))
    const okrResults = yield call(getOkrs);
    yield put(updateOkrs(okrResults.data));
    yield put(updateLoaderStatus(false))
  } catch (error) {
    console.log('error')
    yield put(updateLoaderStatus(false))
    yield put(updateOkrs([]));
  }
};
