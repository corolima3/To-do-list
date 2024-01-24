import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./layout/Homepage";
import LoginPage from "./layout/Loginpage";
import TasksPage from "./layout/TasksPage";
import RegisterPage from "./layout/RegisterPage";
import TasksFormPage from "./layout/TasksFormPage";
import ProfilePage from "./layout/ProfilePage";
import { AuthProvider } from './context/AuthContext';

function App() {

  return (
    <>
      <AuthProvider>

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/add-tasks" element={<TasksFormPage />} />
            <Route path="/profile" element={<ProfilePage />} />

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
{/* <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <main className="container content-container mx-auto px-10 md:px-0">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/add-task" element={<TaskFormPage />} />
                <Route path="/tasks/:id" element={<TaskFormPage />} />
                <Route path="/profile" element={<h1>Profile</h1>} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider> */}