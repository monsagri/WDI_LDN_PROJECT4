import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

import MoneymapperSubmitButton from '../../assets/styledComponents/MoneymapperSubmitButton';
import MoneymapperFormContainer from '../../assets/styledComponents/MoneymapperFormContainer';

class Register extends React.Component {

  state = {
    errors: {}
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/login', this.state)
      .then(res => Auth.setToken(res.data.token))
      .then(() => Flash.setMessage('success', 'Welcome Back'))
      .then(() => this.props.history.push(`/users/${Auth.getPayload().sub}`))
      .catch(err => this.setState( {errors: err.response.data.errors}));
  }

  handleChange = ({ target: { name, value } }) => {
    const errors = { ...this.state.errors, [name]: ''};
    console.log(errors);
    this.setState({ [name]: value, errors }, () => console.log(this.state));
  }


  render() {
    return (
      <MoneymapperFormContainer className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              className="input"
              placeholder="Email"
              name="email"
              autoComplete="email"
              required="true"
              onChange={this.handleChange}
            />
            {this.state.errors && <small>{this.state.errors.email}</small>}
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              name="password"
              autoComplete="new-password"
              required="true"
              onChange={this.handleChange}
            />
            {this.state.errors && <small>{this.state.errors.password}</small>}
          </div>

          <MoneymapperSubmitButton className="button">Submit</MoneymapperSubmitButton>
        </form>
      </MoneymapperFormContainer>
    );
  }
}

export default Register;
