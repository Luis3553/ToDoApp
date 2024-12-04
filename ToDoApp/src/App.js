import { useEffect } from 'react';
import Home from './Components/public/homePage';
import LoginPage from './Components/public/LoginPage';
import RegisterPage from './Components/public/registerPage';
import DashBoard from './Components/private/dashboardPage';
import Modal from './Components/private/modal'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Authenticate from './Components/shared/authentication';

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/dashboard')) {
      const circles = document.getElementsByClassName('light-blue-circle');
      Array.from(circles).forEach(circle => {
        circle.style.background = 'rgba(229, 255, 252, 0.44)';
      })
      document.getElementById('root').style.background = `linear-gradient(
        to bottom,
        #62D2C3 0%,
        #62D2C3 30%,
        #E5E5E5 30%,
        #E5E5E5 100%
    )`;
    } else {
      document.getElementById('root').style.background = '#E5E5E5';
    }
  }, [location]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route element={<Authenticate />}>
          <Route path='/dashboard' element={<DashBoard />}>
            <Route path='new' element={<Modal />} />
            <Route path='tasks/:id' element={<Modal />} />
          </Route>
        </Route>
        <Route path='/*' element={<Navigate to='/home' />} />
      </Routes>
    </>
  );
}

export default App;