import { call, put, takeLatest, all } from 'redux-saga/effects';
import axiosInstance from '../utils/axiosInstance';
import { showResponseToast } from '../utils/toastHandler';
import { 
  adminFetchProjectsSuccess, 
  adminFetchProjectsRequest, 
  adminOperationSuccess, 
  adminOperationFailure 
} from '../adminSlice/adminprojectsSlice';

function* fetchProjectsSaga() {
  try {
    const response = yield call(() => axiosInstance.get('/projects'));
    yield put(adminFetchProjectsSuccess(response.data || []));
  } catch (e) {
    yield put(adminOperationFailure(e.message));
    showResponseToast(e.response?.status);
  }
}

function* addProjectSaga(action) {
  try {
    const response = yield call(() => axiosInstance.post('/projects', action.payload));
    showResponseToast(response.status);
    yield put(adminOperationSuccess());
    yield put(adminFetchProjectsRequest());
  } catch (e) {
const status = e.response?.status || 500;
    showResponseToast(status);
    yield put(adminOperationFailure(e.message));  }
}

function* updateProjectSaga(action) {
  try {
    const response = yield call(() => 
      axiosInstance.patch(`/projects?id=eq.${action.payload.id}`, action.payload)
    );
    showResponseToast(response.status);
    yield put(adminOperationSuccess());
    yield put(adminFetchProjectsRequest());
  } catch (e) {
    yield put(adminOperationFailure(e.message));
    showResponseToast(e.response?.status);
  }
}

function* deleteProjectSaga(action) {
  try {
    const response = yield call(() => 
      axiosInstance.delete(`/projects?id=eq.${action.payload}`)
    );
    showResponseToast(response.status);
    yield put(adminOperationSuccess());
    yield put(adminFetchProjectsRequest());
  } catch (e) {
    yield put(adminOperationFailure(e.message));
    showResponseToast(e.response?.status);
  }
}

export default function* watchProjects() {
  yield all([
    takeLatest('adminprojects/adminFetchProjectsRequest', fetchProjectsSaga),
    takeLatest('adminprojects/adminAddProjectRequest', addProjectSaga),
    takeLatest('adminprojects/adminUpdateProjectRequest', updateProjectSaga),
    takeLatest('adminprojects/adminDeleteProjectRequest', deleteProjectSaga),
  ]);
}