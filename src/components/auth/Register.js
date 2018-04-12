import React from 'react';
import axios from 'axios';

import Flash from '../../lib/Flash';

import RivaeSubmitButton from '../../assets/styledComponents/RivaeSubmitButton';
import RivaeFormContainer from '../../assets/styledComponents/RivaeFormContainer';

class Register extends React.Component {

  state = {
    errors: {}
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/register', this.state)
      .then(res => {
        console.log(res);
        Flash.setMessage('success', 'Thank you for registering. Please log in now');
      })
      .then(() => this.props.history.push('/'))
      .catch(err => this.setState( {errors: err.response.data.errors}));
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => console.log(this.state));
  }


  render() {
    return (
      <RivaeFormContainer class="container">
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="username">Username</label>
            <input className="input"
              placeholder="Username"
              name="username"
              autoComplete="username"
              required="true"
              onChange={this.handleChange}
            />
            {this.state.errors.username && <small>{this.state.errors.username}</small>}
          </div>
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
            {this.state.errors.email && <small>{this.state.errors.email}</small>}
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
            {this.state.errors.password && <small>{this.state.errors.password}</small>}
          </div>
          <div className="field">
            <label htmlFor="passwordConfirmation">Password Confirmation</label>
            <input
              type="password"
              className="input"
              placeholder="Password Confirmation"
              name="passwordConfirmation"
              autoComplete="new-password"
              required="true"
              onChange={this.handleChange}
            />
            {this.state.errors.passwordConfirmation && <small>{this.state.errors.passwordConfirmation}</small>}
          </div>

          <RivaeSubmitButton className="button">Submit</RivaeSubmitButton>
        </form>
      </RivaeFormContainer>

    );
  }
}

export default Register;
