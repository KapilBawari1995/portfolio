import { call, put, takeLatest } from 'redux-saga/effects';
import { supabase } from '../supabaseClient';
import { fetchSkillsSuccess, fetchSkillsFailure } from '../Slice/skillsSlice';

function* fetchSkillsSaga() {
  try {
   
    const { data, error } = yield call(() => 
      supabase.from('profile').select('skills_languages, skills_databases, skills_tools, skills_other, skills_frameworks').single()
    );
    if (error) throw error;
    yield put(fetchSkillsSuccess(data));
  } catch (error) {
    yield put(fetchSkillsFailure(error.message));
  }
}

export default function* watchSkills() {
  yield takeLatest('skills/fetchSkillsRequest', fetchSkillsSaga);
}