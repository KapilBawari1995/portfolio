import { call, put, takeLatest } from 'redux-saga/effects';
import { supabase } from '../supabaseClient';
import { fetchProjectsSuccess, fetchProjectsFailure } from '../Slice/projectSlice';

function* fetchProjectsSaga() {
  try {
    const { data, error } = yield call(() => 
      supabase.from('projects').select('*').eq('status', 'active')
    );
    if (error) throw error;
    yield put(fetchProjectsSuccess(data || []));
  } catch (error) {
    yield put(fetchProjectsFailure(error.message));
  }
}

export default function* watchProjects() {
  yield takeLatest('projects/fetchProjectsRequest', fetchProjectsSaga);
}