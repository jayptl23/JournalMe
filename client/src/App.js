import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Journals from './components/dashboard/Journals';
import Notes from './components/notes/Notes';
import NoteForm from './components/notes/NoteForm';
import EditNote from './components/notes/EditNote';
import PrivateRoute from './components/routing/PrivateRoute';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './store';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className='container'>
          <Alert />
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/journals' component={Journals} />
            <PrivateRoute exact path='/notes/:id' component={Notes} />
            <PrivateRoute exact path='/note/:journalId' component={NoteForm} />
            <PrivateRoute
              exact
              path='/note/:journalId/:noteId'
              component={EditNote}
            />
          </Switch>
        </section>
      </Router>
    </Provider>
  );
}

export default App;
