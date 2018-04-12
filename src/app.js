import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bulma';

import PrivateRoute from './lib/PrivateRoute';

import FlashMessages from './components/common/FlashMessages';
import Navbar from './components/common/Navbar';

import HomeRoute from './components/Rivae/HomeRoute';
import UserRoute from './components/Rivae/UserRoute';
import EditTransactionRoute from './components/Rivae/EditTransactionRoute';
import TransactionsRoute from './components/Rivae/TransactionsRoute';
import BudgetRoute from './components/Rivae/BudgetRoute';

import RegisterRoute from './components/auth/Register';
import LoginRoute from './components/auth/Login';

import RivaeMain from './assets/styledComponents/RivaeMain';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <RivaeMain>
          <Navbar />
          <FlashMessages />

          <Switch>
            <PrivateRoute path="/users/:id/budget" component={BudgetRoute} />
            <PrivateRoute path="/users/:id/transaction/:transactionId/edit" component={EditTransactionRoute} />
            <PrivateRoute path="/users/:id/transactions" component={TransactionsRoute} />
            <PrivateRoute path="/users/:id" component={UserRoute} />
            <Route path="/register" component={RegisterRoute} />
            <Route path="/login" component={LoginRoute} />
            <Route path="/" component={HomeRoute} />
          </Switch>

        </RivaeMain>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
