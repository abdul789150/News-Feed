import React from 'react';
import NewsFeed from './pages/NewsFeed';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<NewsFeed />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
