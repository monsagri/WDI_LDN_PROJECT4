import React from 'react';
import axios from 'axios';

import BudgetForm from './BudgetForm';

class BudgetRoute extends React.Component {
  state = {
    user: {
      admin: '',
      avatar: '',
      created: '',
      email: '',
      transactions: [],
      username: '',
      balance: 0,
      budget: {},
      categories: [],
      totalSpending: 0,
      totalIncome: 0,
      spendingByCategory: [],
      incomeByCategory: [],
      spendingByPayee: [],
      incomeByPayee: [],
      balanceByDate: [],
      absoluteSpendingByDate: []
    }
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}/budget`)

      .then(res => {
        console.log('getting res data',res.data);
        this.setState({ user: res.data }, () => console.log('state post setState',this.state));
        console.log('finished setting state');
      });
  }

  handleChange = ({ target: { name, value } }) => {
    // const errors = { ...this.state.errors, [name]: ''};
    const editedUser = {...this.state.user};
    editedUser.budget[name] = {
      budgeted: 0
    };
    editedUser.budget[name].budgeted = parseInt(value, 10);
    this.setState({ user: {...editedUser}}, () => console.log(this.state));
  }

  handleSubmit = () => {

  }

  render(){
    return (
      <div className="container">
        <h2 className="title is-2 has-text-right">{this.state.userId}</h2>
        <h2 className="title is-2 has-text-centered">Your Budget</h2>

        <BudgetForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          data={this.state}
        />
      </div>

    );
  }
}

export default BudgetRoute;
