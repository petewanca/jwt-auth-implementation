import React from 'react';
// Packages
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Context Providers
import { UserContextProvider } from './contexts/UserContext';
// Components
import { Login } from './components/Login';
import { Protected } from './components/Protected';
import { NoMatch } from './components/NoMatch';

const App = () => {
    return (
        <UserContextProvider>
            <Router>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/dash' component={Protected} />
                    <Route exact component={NoMatch} />
                </Switch>
            </Router>
        </UserContextProvider>
    );
};

export default App;
