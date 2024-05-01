import './index.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Home from './pages/Home';
import Preview from './pages/Preview';
import Solve from './pages/Solve'
import NotFound from './pages/NotFound';

import favicon from './assets/brain-32x32.png'
const TITLE = 'Logic Is Blind';

function App() {
  return (
    <Router>
      <Helmet>
        <title>{TITLE}</title>
        <link rel="icon" type="image/png" href={favicon} />
      </Helmet>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/solve" element={<Solve />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
