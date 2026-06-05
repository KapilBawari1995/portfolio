import { call, put, takeLatest } from 'redux-saga/effects';
import { supabase } from '../supabaseClient';
import { 
  adminFetchExperienceSuccess, adminAddExperienceSuccess,
  adminUpdateExperienceSuccess, adminExperienceFailure 
} from '../adminSlice/adminExperienceSlice';

function* adminAddExperienceSaga(action) {
  try {
    const { data, error } = yield call(() => supabase.from('experience').insert([action.payload]).select().single());
    if (error) throw error;
    yield put(adminAddExperienceSuccess(data));
  } catch (e) { yield put(adminExperienceFailure(e.message)); }
}

function* adminUpdateExperienceSaga(action) {
  try {
    const { id, payload } = action.payload;
    const { data, error } = yield call(() => supabase.from('experience').update(payload).eq('id', id).select().single());
    if (error) throw error;
    yield put(adminUpdateExperienceSuccess(data));
  } catch (e) { yield put(adminExperienceFailure(e.message)); }
}

export default function* watchAdminExperience() {
  yield takeLatest('adminExperience/adminAddExperienceRequest', adminAddExperienceSaga);
  yield takeLatest('adminExperience/adminUpdateExperienceRequest', adminUpdateExperienceSaga);
}