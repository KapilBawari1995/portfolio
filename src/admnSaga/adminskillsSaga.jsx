import { call, put, takeLatest } from 'redux-saga/effects';
import { supabase } from '../supabaseClient';
import { 
  adminFetchSkillsSuccess, 
  adminUpdateSkillsSuccess, 
  adminSkillsFailure, 
  adminFetchSkillsRequest 
} from '../adminSlice/adminSkillsSlice';

const parseToSupabaseArray = (input) => {
  if (Array.isArray(input)) return input;
  if (typeof input === 'string') return input.split(',').map(s => s.trim()).filter(Boolean);
  return [];
};

// 1. Fetch Saga (Cleaned)
function* adminFetchSkillsSaga() {
  try {
    const { data, error } = yield call(() => 
      supabase
        .from('profile')
        .select('skills_languages, skills_databases, skills_tools, skills_frameworks, skills_other')
        .eq('id', 2)
        .maybeSingle()
    );
    
    if (error) throw error;

    yield put(adminFetchSkillsSuccess({
      languages: data?.skills_languages?.join(', ') || '',
      databases: data?.skills_databases?.join(', ') || '',
      tools: data?.skills_tools?.join(', ') || '',
      frameworks: data?.skills_frameworks?.join(', ') || '',
      other: data?.skills_other?.join(', ') || ''
    }));
  } catch (e) { 
    yield put(adminSkillsFailure(e.message)); 
  }
}

// 2. Update Saga
function* adminUpdateSkillsSaga(action) {
  try {
    const { languages, databases, tools, frameworks, other } = action.payload;
    const payload = {
      skills_languages: parseToSupabaseArray(languages),
      skills_databases: parseToSupabaseArray(databases),
      skills_tools: parseToSupabaseArray(tools),
      skills_frameworks: parseToSupabaseArray(frameworks),
      skills_other: parseToSupabaseArray(other),
    };

    console.log("DEBUG: Sending payload to Supabase:", payload);

    const { error } = yield call(() => 
      supabase
        .from('profile')
        .update(payload)
        .eq('id', 2)
    );

    if (error) throw error;
    console.error("DEBUG: SUPABASE ERROR DETAILS:", error);
    yield put(adminFetchSkillsRequest()); 
    yield put(adminUpdateSkillsSuccess(action.payload));
  } catch (e) { 
    console.error("DEBUG: Update Error:", e);
    yield put(adminSkillsFailure(e.message)); 
  }
}

// 3. Watcher (Sahi Action Types ke saath)
export default function* watchAdminSkills() {
yield takeLatest('adminSkills/adminFetchSkillsRequest', adminFetchSkillsSaga);
  yield takeLatest('adminSkills/adminUpdateSkillsRequest', adminUpdateSkillsSaga);
}