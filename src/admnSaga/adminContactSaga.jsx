import { call, put, takeLatest } from 'redux-saga/effects';
import { supabase } from '../supabaseClient';
import { 
  adminFetchContactRequest, adminFetchContactSuccess, 
  adminUpdateContactRequest, adminUpdateContactSuccess, adminContactFailure 
} from '../adminSlice/adminContactSlice';

function* fetchContactSaga() {
  try {
    const { data, error } = yield call(() => 
      supabase.from('profile').select('*').eq('id', 2).maybeSingle()
    );
    if (error) throw error;
    yield put(adminFetchContactSuccess(data));
  } catch (error) {
    yield put(adminContactFailure(error.message));
  }
}

function* updateContactSaga(action) {
  try {
    const { data, error } = yield call(() => 
      supabase.from('profile').update(action.payload).eq('id', 2).select().single()
    );
    if (error) throw error;
    yield put(adminUpdateContactSuccess(data));
  } catch (error) {
    yield put(adminContactFailure(error.message));
  }
}

export default function* watchAdminContact() {
  yield takeLatest(adminFetchContactRequest.type, fetchContactSaga);
  yield takeLatest(adminUpdateContactRequest.type, updateContactSaga);
}