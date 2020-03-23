import React, { useContext } from 'react';
// Packages
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// Components
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard';
import { NoMatch } from './components/NoMatch';
import { Navbar } from './components/Navbar';
import { UserContext } from './contexts/UserContext';

const App = () => {
    const { auth } = useContext(UserContext);
    const loggedIn = auth.loggedIn;

    return (
        <Router>
            <Navbar />

            {loggedIn ? <Redirect to='/dashboard' /> : <Redirect to='/' />}

            <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/register' component={Register} />
                <Route exact component={NoMatch} />
            </Switch>
        </Router>
    );
};

export default App;
