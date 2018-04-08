import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

import Form from './Form';

class NewRoute extends React.Component {

  state = {
    date: '',
    amount: 0,
    category: '',
    description: '',
    errors: {}
  }

  handleChange = ({ target: { name, value } }) => {
    // const errors = Object.assign({}, this.state.errors, { [name]: ''});
    const errors = { ...this.state.errors, [name]: ''};
    this.setState({ [name]: value, errors }, () => console.log(this.state));
    // this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    axios({
      method: 'post',
      url: `/api/users/${Auth.getPayload().sub}`,
      headers: {Authorization: `Bearer ${Auth.getToken()}`},
      data: this.state
    })
      .then(() => this.props.history.push(`/users/${Auth.getPayload().sub}`));
    // .catch(err => this.setState( {errors: err.response.data.errors}));
  }

  render() {
    return (
      <div className="container">
        <Form
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          data={this.state}
        />
      </div>
    );

  }
}

export default NewRoute;
