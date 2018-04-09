import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';

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
      budget: [],
      categories: [],
      totalSpending: 0,
      totalIncome: 0,
      spendingByCategory: [],
      incomeByCategory: [],
      spendingByPayee: [],
      incomeByPayee: [],
      balanceByDate: [],
      absoluteSpendingByDate: []
    },
    currentMonth: ''
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}/budget`)

      .then(res => {
        console.log('getting res data',res.data);
        this.state.currentMonth
          ? this.setState({ user: res.data }, () => console.log('state post setState',this.state))
          : this.setState({ user: res.data, currentMonth: new Date().getMonth()}, () => console.log('state post setState',this.state));

        console.log('finished setting state');
      });
  }

  handleChange = ({ target: { name, value } }) => {
    const editedUser = {...this.state.user};
    const currentMonth = editedUser.budget.find(month => month.currentMonth === this.state.currentMonth);
    console.log('variable currentMonth is', currentMonth);
    if (!currentMonth) {
      editedUser.budget.push({
        currentMonth: this.state.currentMonth,
        categories: []
      });
    }
    if (!currentMonth.categories.find(category => category.name === name)) {
      currentMonth.categories.push(
        {
          name: name,
          budgeted: parseInt(value, 10)
        }
      );
    } else {
      const currentBudget = currentMonth.categories.find(budget => budget.name === name);
      currentBudget.budgeted = parseInt(value, 10);
    }
    //   editedUser.budget.find(month => month.currentMonth === this.state.currentMonth).categories.push({
    //     name: name,
    //     budgeted: parseInt(value, 10)
    //   });
    // }
    this.setState({ user: {...editedUser}}, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('budget being sent to backend is',this.state.user.budget);
    axios({
      method: 'put',
      url: `/api/users/${this.props.match.params.id}/budget`,
      headers: {Authorization: `Bearer ${Auth.getToken()}`},
      data: this.state.user.budget
    })
      .then(() => this.props.history.push(`users/${this.props.match.params.id}/budget`));
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
