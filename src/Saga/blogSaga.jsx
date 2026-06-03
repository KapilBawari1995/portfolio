import { call, put, takeLatest } from 'redux-saga/effects';
import { supabase } from '../supabaseClient';
import { fetchBlogsSuccess, fetchBlogsFailure } from '../Slice/blogSlice';

function* fetchBlogsSaga() {
  try {
    const { data, error } = yield call(() => 
      supabase.from('blogs').select('*').order('created_at', { ascending: false })
    );
    if (error) throw error;
    yield put(fetchBlogsSuccess(data));
  } catch (error) {
    yield put(fetchBlogsFailure(error.message));
  }
}

export default function* watchBlogs() {
  yield takeLatest('blogs/fetchBlogsRequest', fetchBlogsSaga);
}