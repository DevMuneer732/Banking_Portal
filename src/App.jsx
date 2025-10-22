
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './utils/PrivateRoute';
function App() {

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
        }}
      />

      <Router>
        <Routes>

          {/* Public Auth Routes */}
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />

          {/* Private Route */}

          <Route
            path='/'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route path="*" element={
            <div className='min-h-screen flex items-center justify-center bg-gray-100 text-2xl text-gray-700'>
              404 | Page Not Found
            </div>
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App
