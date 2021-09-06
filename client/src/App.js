import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Poll from './pages/Poll';

function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Navbar />
      <Router>
        <Switch>
          <Route path='/:id' children={<Poll />} />
          <Route path='/' children={<Home />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
