import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Page from './components/Page';
import Detail from './components/Detail';


// import './App.css'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/" element={<Page />} />
      </Routes>
    </Router>
  )
}

export default App
