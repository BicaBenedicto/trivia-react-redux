import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import store from './store';
import Game from './pages/Game';

export default function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route path="/game" component={ Game } />
          <Route path="/" component={ Login } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
