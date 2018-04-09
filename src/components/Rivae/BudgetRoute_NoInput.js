import React from 'react';
import axios from 'axios';

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

  render(){
    return (
      <div className="container">
        <h2 className="title is-2 has-text-right">{this.state.userId}</h2>
        <h2 className="title is-2 has-text-centered">Your Budget</h2>

        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Current Spending</th>
              <th>Amount Budgeted</th>
              <th>Difference</th>
            </tr>
          </thead>
          <tbody>
            {this.state.user.categories.map((category, i) =>
              <tr key={i}>
                <td>{category}</td>
                <td>
                  {this.state.user.spendingByCategory[category]
                    ? this.state.user.spendingByCategory[category].toFixed(2)
                    : 0}
                </td>
                <td>{
                  this.state.user.budget[category]
                    ? this.state.user.budget[category]
                    : 0}
                </td>
                <td>{
                  this.state.user.spendingByCategory[category]
                    ? this.state.user.budget[category]
                      ? this.state.user.spendingByCategory[category].toFixed(2) - this.state.user.budget[category].budgeted
                      : this.state.user.spendingByCategory[category].toFixed(2) - 0
                    : 0}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    );
  }
}

export default BudgetRoute;
