import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import SpaceDetails from './pages/SpaceDetails/SpaceDetails';
import SearchPage from './components/Search/SearchPage';
import Layout from './pages/ListOwner/Layout';
import AddListing from './pages/ListOwner/AddListing';
import AllListing from './pages/ListOwner/AllListing';
import VerifyPage from './pages/VerifyPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import PrivateRoute from './components/PrivateRoute';

const App = () => {

  const isOwnerPath = useLocation().pathname.includes("owner");
  return (
    <div>
      {!isOwnerPath && <Navbar />}
      <div className='min-h-[70vh]'>
        <Routes>

          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path="/verify/:token" element={<VerifyPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

          {/* Private Routes */}

          <Route path='/rooms/:id' element={<PrivateRoute><SpaceDetails /></PrivateRoute>} />
          <Route path="/search" element={<PrivateRoute><SearchPage /></PrivateRoute>} />
          
          {/*<Route path="/search" element={<PrivateRoute><SearchPage /></PrivateRoute>} />*/}
          
          <Route path='/owner' element={<PrivateRoute><Layout /></PrivateRoute>}>
            
            <Route index element={<AddListing />} />
            <Route path="list-room" element={<AllListing />} />

          </Route>



        </Routes>

      </div>
      {!isOwnerPath && <Footer />}

    </div>
  )
}

export default App;
