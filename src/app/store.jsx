import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import projectReducer from '../Slice/projectSlice';
import watchProjects from '../saga/projectSaga';

import profileReducer from '../Slice/profileSlice';
import profileSaga from '../Saga/profileSaga';



import heroReducer from '../Slice/heroSlice';
import heroSaga from '../Saga/heroSaga';

import quoteReducer from '../Slice/quoteSlice';
import qouteSaga from '../Saga/quoteSaga';


import experienceReducer from '../Slice/experienceSlice';
import experienceSaga from '../Saga/experienceSaga';
import skillsReducer from '../Slice/skillsSlice';
import skillSaga from '../Saga/skillsSaga';
import blogsReducer from '../Slice/blogSlice';
import blogsSaga from '../Saga/blogSaga';
import feedbackReducer from '../Slice/feedbackSlice';
import feedbackSaga from '../Saga/feedbackSaga';


import adminloginReducer from '../adminSlice/adminloginslice';
import adminloginSaga from '../admnSaga/adminsaga';




import dashboardReducer from '../adminSlice/dashboardSlice';
import dashboardSaga from '../admnSaga/dashboardSaga';


import adminprojectsReducer from '../adminSlice/adminprojectsSlice';
import adminprojectsSaga from '../admnSaga/adminprojectsSaga';

import adminProfileReducer from '../adminSlice/adminProfileSlice';
import adminProfileSaga from '../admnSaga/adminProfileSaga';


import adminBlogsReducer from '../adminSlice/adminBlogSlice';
import adminBlogsSaga from '../admnSaga/adminBlogSaga';



import adminExperienceReducer from '../adminSlice/adminExperienceSlice';
import adminExperienceSaga  from '../admnSaga/adminExperienceSaga';


import adminSkillsReducer from '../adminSlice/adminskillsSlice';
import adminadminSkillsSaga from '../admnSaga/adminskillsSaga';



const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    profile: profileReducer,

    hero: heroReducer,
    quote: quoteReducer,
    experience: experienceReducer,
    skills: skillsReducer,
    blogs: blogsReducer,
    feedback: feedbackReducer,
    adminlogin: adminloginReducer,
    dashboard: dashboardReducer,
    adminprojects: adminprojectsReducer,
    adminProfile: adminProfileReducer,
    adminBlogs: adminBlogsReducer,
    adminSkills: adminSkillsReducer,

    adminExperience: adminExperienceReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// सागा रन करें
sagaMiddleware.run(watchProjects);
sagaMiddleware.run(profileSaga);
sagaMiddleware.run(heroSaga);
sagaMiddleware.run(qouteSaga);
sagaMiddleware.run(experienceSaga);
sagaMiddleware.run(skillSaga);
sagaMiddleware.run(blogsSaga);
sagaMiddleware.run(feedbackSaga);

sagaMiddleware.run(adminloginSaga);
sagaMiddleware.run(dashboardSaga);
sagaMiddleware.run(adminprojectsSaga);
sagaMiddleware.run(adminProfileSaga);
sagaMiddleware.run(adminBlogsSaga);
sagaMiddleware.run(adminExperienceSaga);


sagaMiddleware.run(adminadminSkillsSaga);










