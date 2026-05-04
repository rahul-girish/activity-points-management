import { Routes, Route, Navigate } from "react-router-dom";
import { getData } from '../context/userContext.jsx';
import NavigationBar from "../components/NavigationBar.jsx"
import ProtectedRoute from '../components/ProtectedRoute';
import About from "../pages/About.jsx";
import Activities from "../pages/Activities.jsx";
import AdminHome from "../pages/AdminHome.jsx";
import AuthSuccess from "../pages/AuthSuccess.jsx";
import CounselorHome from "../pages/CounselorHome.jsx";
import Login from "../pages/Login.jsx";
import Profile from "../pages/Profile.jsx";
import ServiceHome from "../pages/ServiceHome.jsx";
import StudentDetails from "../pages/StudentDetails.jsx";
import StudentProfile from "../pages/StudentProfile.jsx"
import StudentHome from "../pages/StudentHome.jsx";
import StudentsList from "../pages/StudentsList.jsx";
import Submissions from "../pages/Submissions.jsx";
import Events from "../pages/Events.jsx";
import AdminEvents from "../pages/AdminEvents.jsx";

function App() {
  const { user } = getData();
  return (
    <>
      <NavigationBar />
      <Routes>
        {/* Public Routes */}
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth-success" element={<AuthSuccess />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={
            user?.role === 'service' ? <ServiceHome /> :
            user?.role === 'admin' ? <Navigate to="/admin" replace /> :
            user?.role === 'counselor' ? <Navigate to="/counselor" replace /> :
            <Navigate to="/student" replace />
          } />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/events" element={<Events />} />
        </Route>

        {/* Student Only Routes */}
        <Route element={<ProtectedRoute requiredRole={['student', 'service']} />}>
          <Route path="/student" element={<StudentHome />} />
          <Route path="/activities" element={<Activities />} />
        </Route>

        {/* Admin Only Routes */}
        <Route element={<ProtectedRoute requiredRole={['admin', 'counselor', 'service']} />}>
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/students" element={<StudentsList />} />
          <Route path="/admin/students/:id" element={<StudentDetails />} />
          <Route path="/admin/submissions" element={<Submissions />} />
        </Route>

        {/* Counselor Only Routes */}
        <Route element={<ProtectedRoute requiredRole={['counselor', 'service']} />}>
          <Route path="/counselor" element={<CounselorHome />} />
          <Route path="/counselor/edit-student/:id" element={<StudentProfile />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App;