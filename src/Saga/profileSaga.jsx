import { call, put, takeLatest } from 'redux-saga/effects';
import { supabase } from '../supabaseClient';
import { fetchProfileSuccess, fetchProfileFailure } from '../Slice/profileSlice';

function* fetchProfileSaga() {
  try {
    const { data, error } = yield call(() => supabase.from('profile').select('*').single());
    if (error) throw error;
    yield put(fetchProfileSuccess(data));
  } catch (error) {
    yield put(fetchProfileFailure(error.message));
  }
}

export default function* profileSaga() {
  yield takeLatest('profile/fetchProfileRequest', fetchProfileSaga);
}