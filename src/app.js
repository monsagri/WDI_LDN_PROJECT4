import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bulma';

import HomeRoute from './components/Rivae/HomeRoute';
import UserRoute from './components/Rivae/UserRoute';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          {/* <Navbar />
          <FlashMessages /> */}

          <Switch>
            {/* <Route path="/bangers/new" component={NewRoute} />
            <ProtectedRoute path="/bangers/:id/edit" component={EditRoute} /> */}
            <Route path="/users/:id" component={UserRoute} />
            {/* <Route path="/bangers" component={IndexRoute} />
            <Route path="/register" component={RegisterRoute} />
            <Route path="/login" component={LoginRoute} /> */}
            <Route path="/" component={HomeRoute} />
            {/* <Route component={NotFound} /> */}
          </Switch>

        </main>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
