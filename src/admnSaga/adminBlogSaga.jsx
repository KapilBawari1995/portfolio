import { call, put, takeLatest } from 'redux-saga/effects';
import { supabase } from '../supabaseClient';
import { 
  adminFetchBlogsSuccess, 
  adminFetchBlogsFailure 
} from '../adminSlice/adminBlogSlice';

function* adminFetchBlogsWorker() {
  try {
    const { data, error } = yield call(() => 
      supabase.from('blogs').select('*').order('created_at', { ascending: false })
    );

    if (error) throw error;
    yield put(adminFetchBlogsSuccess(data));
  } catch (error) {
    yield put(adminFetchBlogsFailure(error.message));
  }
}

export default function* watchAdminBlogs() {
  yield takeLatest('adminBlogs/adminFetchBlogsRequest', adminFetchBlogsWorker);
}