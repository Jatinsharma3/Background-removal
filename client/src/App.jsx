import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Result from './pages/result'
import BuyCredit from './pages/buyCredit'
import Navbar from './components/Navbar'


const App = () => {
  return (
    <div className='min-h-screen bg-slate-50'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/result' element={<Result/>}/>
        <Route path='/buy' element={<BuyCredit/>}/>
      </Routes>
    </div>
  )
}

export default App
