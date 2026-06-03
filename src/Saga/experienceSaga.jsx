import { call, put, takeLatest } from 'redux-saga/effects';
import { supabase } from '../supabaseClient';
import { fetchExperienceSuccess, fetchExperienceFailure } from '../Slice/experienceSlice';

function* fetchExperienceSaga() {
  try {
    const { data, error } = yield call(() => 
      supabase.from('experience').select('*').eq('status', 'active').order('id', { ascending: false })
    );
    if (error) throw error;
    yield put(fetchExperienceSuccess(data || []));
  } catch (error) {
    yield put(fetchExperienceFailure(error.message));
  }
}

export default function* watchExperience() {
  yield takeLatest('experience/fetchExperienceRequest', fetchExperienceSaga);
}