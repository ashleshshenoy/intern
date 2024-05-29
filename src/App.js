import { Draw } from '@mui/icons-material'
import React from 'react'
import Create from './components/Create'
import Drawer from './components/Drawer'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import View from './components/View';
import SingleView from './components/SingleView';
export default function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Drawer/>}></Route>
          <Route exact path='/viewOne/:id' element={<SingleView/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
