import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Search from './components/Search'
import AddAddress from './components/AddAddress'
import AddressPage from './components/AddressPage'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/add" element={<AddAddress />} />
        <Route path=":id" element={<AddressPage />} />
      </Routes>
    </div>
  )
}

export default App
