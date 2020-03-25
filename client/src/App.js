import React from 'react';
// Packages
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Components
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard';
import { NoMatch } from './components/NoMatch';
import { Navbar } from './components/Navbar';

const App = () => {
    return (
        <Router>
            <Navbar />

            <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/dashboard' component={Dashboard} />
                <Route exact path='/register' component={Register} />
                <Route exact component={NoMatch} />
            </Switch>
        </Router>
    );
};

export default App;
