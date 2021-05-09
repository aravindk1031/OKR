import {getOkrResults} from './okr-saga';
import {GET_OKRS} from "../actions/types";
import {takeEvery} from 'redux-saga/effects';

export default function* rootSaga() {
  yield takeEvery(GET_OKRS, getOkrResults)
}
