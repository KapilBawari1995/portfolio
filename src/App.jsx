import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

// Layouts & Guards
import ProtectedRoute from './ProtectedRoute';
import PublicOnlyRoute from './PublicOnlyRoute';
import MainLayout from './components/layout/MainLayout';
import AdminPanel from './AdminPanel';

// Public Pages
import PortfolioHero from './PortfolioHero';
import AllBlogsPage from './AllBlogsPage';
import SingleBlogPage from './SingleBlogPage';
import PublicNotFound from './components/PublicNotFound'; 

// Admin Pages
import AdminLogin from './AdminLogin';
import DashboardView from './components/admin/DashboardView';
import ProjectsManager from './components/admin/ProjectsManager';
import AddProject from './components/admin/AddProject';
import AboutManager from './components/admin/AboutManager';
import SkillsManager from './components/admin/SkillsManager';
import ContactManager from './components/admin/ContactManager';
import FooterManager from './components/admin/FooterManager';
import EditFooter from './components/admin/EditFooter';
import FeedbackView from './components/admin/FeedbackView';
import BlogManager from './components/admin/BlogManager';
import BlogForm from './components/admin/BlogForm';
import EditAbote from './components/admin/EditAbout';
import EditSkills from './components/admin/EditSkills';
import EditContact from './components/admin/EditContact';
import ExperienceManager from './components/admin/ExperienceManager';
import EditExperience from './components/admin/EditExperience';
import AdminNotFound from './components/admin/AdminNotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          
      
          <Route element={<PublicOnlyRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<PortfolioHero />} />
              <Route path="/all-blogs" element={<AllBlogsPage />} />
              <Route path="/blog/:id" element={<SingleBlogPage />} />
            </Route>
            
            <Route path="*" element={<PublicNotFound />} />
          </Route>

  
          <Route path="/login" element={<AdminLogin />} />

        
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminPanel />}>
              <Route index element={<DashboardView />} />
              <Route path="dashboard" element={<DashboardView />} />
              <Route path="projects" element={<ProjectsManager />} />
              <Route path="add-project" element={<AddProject />} />
              <Route path="edit-project/:id" element={<AddProject />} />
              <Route path="about" element={<AboutManager />} />
              <Route path="edit-about" element={<EditAbote />} />
              <Route path="skills" element={<SkillsManager />} />

              <Route path="eite-skils" element={<EditSkills />} />
              <Route path="contacts" element={<ContactManager />} />
              <Route path="edit-contacts" element={<EditContact />} />
              <Route path="feedback" element={<FeedbackView />} />
              <Route path="blog" element={<BlogManager />} />
              <Route path="add-blog" element={<BlogForm />} />
                            <Route path="edit-blog/:id" element={<BlogForm />} />


              <Route path="edit-experience/:id" element={<EditExperience />} />
            <Route path="add-experience" element={<EditExperience />} />

               <Route path="experience" element={<ExperienceManager />} />


              
              <Route path="footer" element={<FooterManager />} />
              <Route path="edit-footer" element={<EditFooter />} />
              
              <Route path="*" element={<AdminNotFound />} />
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>
  );
}