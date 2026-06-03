import { call, put, takeLatest } from 'redux-saga/effects';
import { supabase } from '../supabaseClient';
import { fetchCountsSuccess } from '../adminSlice/dashboardSlice';

function* fetchDashboardCountsSaga() {
  const { count: pCount } = yield call(() => supabase.from('projects').select('*', { count: 'exact', head: true }));
  const { count: sCount } = yield call(() => supabase.from('skills').select('*', { count: 'exact', head: true }));
  const { count: eCount } = yield call(() => supabase.from('experience').select('*', { count: 'exact', head: true }));
  
  yield put(fetchCountsSuccess({ projects: pCount || 0, skills: sCount || 0, experience: eCount || 0 }));
}

export default function* watchDashboard() {
  yield takeLatest('dashboard/fetchCountsRequest', fetchDashboardCountsSaga);
}