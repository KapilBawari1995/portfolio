import { call, put, takeLatest } from 'redux-saga/effects';
import { supabase } from '../supabaseClient';
import { fetchHeroSuccess, fetchHeroFailure } from '../Slice/heroSlice';

function* fetchHeroSaga() {
  try {
    const { data, error } = yield call(() => supabase.from('profile').select('*').single());
    if (error) throw error;
    yield put(fetchHeroSuccess(data));
  } catch (error) {
    yield put(fetchHeroFailure(error.message));
  }
}

export default function* watchHero() {
  yield takeLatest('hero/fetchHeroRequest', fetchHeroSaga);
}