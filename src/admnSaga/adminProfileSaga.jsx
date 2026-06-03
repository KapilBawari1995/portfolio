import { call, put, takeLatest } from 'redux-saga/effects';
import { supabase } from '../supabaseClient';
import { 
  adminFetchProfileSuccess, adminUpdateProfileSuccess, adminProfileFailure 
} from '../adminSlice/adminProfileSlice';

function* fetchAdminProfileSaga() {
  try {
    const { data, error } = yield call(() => supabase.from('profile').select('*').eq('id', 2).single())
    if (error) throw error;
    yield put(adminFetchProfileSuccess(data));
  } catch (e) { yield put(adminProfileFailure(e.message)); }
}

function* updateAdminProfileSaga(action) {
  try {
    const { data, error } = yield call(() => supabase.from('profile').update(action.payload).eq('id', 2).select().single());
    if (error) throw error;
    yield put(adminUpdateProfileSuccess(data));
    alert("Profile updated successfully!");
  } catch (e) { yield put(adminProfileFailure(e.message)); }
}

export default function* watchAdminProfile() {
  yield takeLatest('adminProfile/adminFetchProfileRequest', fetchAdminProfileSaga);
  yield takeLatest('adminProfile/adminUpdateProfileRequest', updateAdminProfileSaga);
}