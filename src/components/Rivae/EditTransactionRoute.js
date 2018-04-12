import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

import Form from './Form';

import RivaeFormContainer from '../../assets/styledComponents/RivaeFormContainer';

class EditRoute extends React.Component {

  state = {
    date: '',
    amount: 0,
    category: '',
    description: '',
    errors: {}
  }

  componentDidMount() {
    console.log('match params on edit are',this.props.match.params.transactionId);
    axios({
      method: 'get',
      url: `/api/users/${Auth.getPayload().sub}/transaction/${this.props.match.params.transactionId}/`,
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({...res.data}));
  }

  handleChange = ({ target: { name, value } }) => {
    const errors = { ...this.state.errors, [name]: ''};
    this.setState({ [name]: value, errors }, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    axios({
      method: 'put',
      url: `/api/users/${Auth.getPayload().sub}/transaction/${this.props.match.params.transactionId}/edit`,
      headers: {Authorization: `Bearer ${Auth.getToken()}`},
      data: this.state
    })
      .then(() => this.props.history.push(`/users/${Auth.getPayload().sub}/transactions`))
      .catch(err => this.setState( {errors: err.response.data.errors}));
  }

  render() {
    return (
      <RivaeFormContainer className="container">
        <Form
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          data={this.state}
        />
      </RivaeFormContainer>
    );

  }
}

export default EditRoute;
