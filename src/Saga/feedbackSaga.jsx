import { call, put, takeLatest } from 'redux-saga/effects';
import { supabase } from '../supabaseClient';
import { submitFeedbackSuccess, submitFeedbackFailure } from '../Slice/feedbackSlice';

function* handleFeedbackSaga(action) {
  try {
    const { error } = yield call(() => supabase.from('feedbacks').insert([action.payload]));
    if (error) throw error;
    yield put(submitFeedbackSuccess());
  } catch (error) {
    yield put(submitFeedbackFailure(error.message));
  }
}

export default function* watchFeedback() {
  yield takeLatest('feedback/submitFeedbackRequest', handleFeedbackSaga);
}