import { call, put, takeLatest } from 'redux-saga/effects';
import { supabase } from '../supabaseClient';
import { fetchQuoteSuccess, fetchQuoteFailure } from '../Slice/quoteSlice';

function* fetchQuoteSaga() {
  try {

    const { data, error } = yield call(() => supabase.from('profile').select('quote_text, quote_author').single());
    if (error) throw error;
    yield put(fetchQuoteSuccess(data));
  } catch (error) {
    yield put(fetchQuoteFailure(error.message));
  }
}

export default function* watchQuote() {
  yield takeLatest('quote/fetchQuoteRequest', fetchQuoteSaga);
}