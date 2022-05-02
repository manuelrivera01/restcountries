import './index.css';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CountryDetails from './pages/CountryDetails';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search/:countrysearch' element={<Home />} />
          <Route path='/countrydetails/:cca2' element={<CountryDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
