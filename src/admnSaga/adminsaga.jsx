import { call, put, takeLatest } from 'redux-saga/effects';
import { supabase } from '../supabaseClient';
import { loginSuccess, loginFailure } from '../adminSlice/adminloginslice';

function* handleLoginSaga(action) {
  try {
    const { email, password } = action.payload;
    const { data, error } = yield call(() => 
      supabase.auth.signInWithPassword({ email, password })
    );
    
    if (error) throw error;
    yield put(loginSuccess(data.user));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

export default function* watchAuth() {
  yield takeLatest('auth/loginRequest', handleLoginSaga);
}