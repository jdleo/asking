import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Poll from './pages/Poll';

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Switch>
          <Route path='/' children={Home} />
          <Route path='/:id' children={Poll} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
