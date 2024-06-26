// src/App.js
import './index.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Home from './pages/Home';
import Preview from './pages/Preview';
import Solve from './pages/Solve';
import Settings from './pages/Settings';
import Solution from './pages/Solution';
import NotFound from './pages/NotFound';

import { PuzzleProvider } from './hooks/PreviewContext';
import favicon from './assets/brain-32x32.png';

const TITLE = 'Logic Is Blind';

function App() {
    return (
        <Router>
            <Helmet>
                <title>{TITLE}</title>
                <link rel="icon" type="image/png" href={favicon} />
            </Helmet>
            <PuzzleProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/preview" element={<Preview />} />
                    <Route path="/solve" element={<Solve />} />
                    <Route path="/solution" element={<Solution />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </PuzzleProvider>
        </Router>
    );
}

export default App;
