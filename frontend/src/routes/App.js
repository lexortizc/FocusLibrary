import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../containers/Layuot';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

function App() {
  console.log(process.env.REACT_APP_LABEL);
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path='/' element={<Login/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route element={<NotFound/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App;
