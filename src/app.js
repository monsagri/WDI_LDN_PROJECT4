import React from 'react';
import ReactDOM from 'react-dom';

import 'bulma';

import Title from './assets/styledComponents/Title';

class App extends React.Component {
  render() {
    return (
      <Title>Rivae</Title>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
