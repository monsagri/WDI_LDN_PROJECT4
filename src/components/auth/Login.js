import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

class Register extends React.Component {

  state = {

  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/login', this.state)
      .then(res => Auth.setToken(res.data.token))
      .then(() => Flash.setMessage('success', 'Welcome Back'))
      .then(() => this.props.history.push('/'));
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => console.log(this.state));
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            className="input"
            placeholder="Email"
            name="email"
            autoComplete="email"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            name="password"
            autoComplete="new-password"
            onChange={this.handleChange}
          />
        </div>

        <button className="button is-primary">Submit</button>
      </form>
    );
  }
}

export default Register;