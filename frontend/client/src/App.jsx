import  { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import SpaceDetails from './pages/SpaceDetails/SpaceDetails';
import SearchPage from './components/Search/SearchPage';
import Layout from './pages/ListOwner/Layout';
import AddListing from './pages/ListOwner/AddListing';
import AllListing from './pages/ListOwner/AllListing';

const App = () => {

  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <div>
      {!isOwnerPath && <Navbar />}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/rooms/:id' element={<SpaceDetails/>}/>
          <Route path="/search" element={<SearchPage />} />
          <Route path='/owner' element={<Layout/>}>
              <Route index element={<AddListing/>}/>
              <Route path="list-room" element={<AllListing/>}/>

          </Route>
          
        </Routes>

      </div>
      {!isOwnerPath && <Footer />}
      
    </div>
  )
}

export default App;
