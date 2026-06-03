import { call, put, takeLatest } from 'redux-saga/effects';
import { supabase } from '../supabaseClient';
import { 
  adminFetchExperienceSuccess, 
  adminUpdateExperienceSuccess, 
  adminExperienceFailure 
} from '../adminSlice/adminExperienceSlice';

function* adminFetchExperienceSaga() {
  try {
    const { data, error } = yield call(() => 
      supabase.from('experience').select('*').order('start_date', { ascending: false })
    );
    if (error) throw error;
    yield put(adminFetchExperienceSuccess(data || []));
  } catch (e) { yield put(adminExperienceFailure(e.message)); }
}

function* adminUpdateExperienceSaga(action) {
  try {
    const { id, payload } = action.payload;
    const { data, error } = yield call(() => 
      supabase.from('experience').update(payload).eq('id', id).select().single()
    );
    if (error) throw error;
    yield put(adminUpdateExperienceSuccess(data));
    alert("Experience Updated Successfully!");
  } catch (e) { yield put(adminExperienceFailure(e.message)); }
}

export default function* watchAdminExperience() {
  yield takeLatest('adminExperience/adminFetchExperienceRequest', adminFetchExperienceSaga);
  yield takeLatest('adminExperience/adminUpdateExperienceRequest', adminUpdateExperienceSaga);
}