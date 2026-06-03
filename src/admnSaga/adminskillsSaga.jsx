import { call, put, takeLatest } from 'redux-saga/effects';
import { supabase } from '../supabaseClient';
import { 
  fetchSkillsSuccess, 
  updateSkillsSuccess, 
  skillsFailure 
} from '../adminSlice/adminskillsSlice'; 

function* fetchSkillsSaga() {
  try {
    const { data, error } = yield call(() => 
      supabase.from('profile').select('*').eq('id', 2).maybeSingle()
    );
    if (error) throw error;
    
    // UI ke liye data format
    yield put(fetchSkillsSuccess({
      languages: data?.skills_languages?.join(', ') || '',
      databases: data?.skills_databases?.join(', ') || '',
      tools: data?.skills_tools?.join(', ') || '',
      frameworks: data?.skills_frameworks?.join(', ') || '',
      other: data?.skills_other?.join(', ') || ''
    }));
  } catch (e) { yield put(skillsFailure(e.message)); }
}

function* updateSkillsSaga(action) {
  try {
    const payload = {
      skills_languages: action.payload.languages.split(',').map(s => s.trim()),
      skills_databases: action.payload.databases.split(',').map(s => s.trim()),
      skills_tools: action.payload.tools.split(',').map(s => s.trim()),
      skills_frameworks: action.payload.frameworks.split(',').map(s => s.trim()),
      skills_other: action.payload.other.split(',').map(s => s.trim()),
    };

    const { error } = yield call(() => 
      supabase.from('profile').update(payload).eq('id', 2)
    );

    if (error) throw error;
    yield put(updateSkillsSuccess(action.payload));
  } catch (e) { yield put(skillsFailure(e.message)); }
}

export default function* watchSkills() {
  yield takeLatest('skills/fetchSkillsRequest', fetchSkillsSaga);
  yield takeLatest('skills/updateSkillsRequest', updateSkillsSaga);
}