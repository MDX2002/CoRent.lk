import  { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import SpaceDetails from './pages/SpaceDetails/SpaceDetails';

const App = () => {

  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <div>
      {!isOwnerPath && <Navbar />}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/rooms/:id' element={<SpaceDetails/>}/>

        </Routes>

      </div>
      <Footer />
      
    </div>
  )
}

export default App
