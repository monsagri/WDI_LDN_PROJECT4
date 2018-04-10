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
      sortedCategories: [],
      totalSpending: 0,
      totalIncome: 0,
      spendingByCategory: {},
      incomeByCategory: {},
      spendingByPayee: {},
      incomeByPayee: {},
      balanceByDate: {},
      absoluteSpendingByDate: {},
      transactionsByMonth: {}
    },
    currentMonth: ''
  }

  componentWillMount() {
    this.state.currentMonth
      ? console.log('Month is already set')
      : this.setState({ currentMonth: new Date().getMonth()}, () => console.log('month being set',this.state));
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}/budget`)

      .then(res => {
        console.log('getting res data',res.data);
        // check whether there is a budget object for the current month
        if (res.data.budget.find(month => month === this.state.currentMonth)) {
          this.setState({ user: res.data }, () => console.log('state post   setState',this.state));
        } else {
          const editedRes = {...res.data};
          editedRes.budget.push({
            currentMonth: this.state.currentMonth,
            categories: []
          });
          this.setState( { user: {...editedRes }});
        }
        // if there isn't, create it before passing user in

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

  removeBudgetCategory = (category) => {
    console.log(category);
    axios({
      method: 'delete',
      url: `/api/users/${Auth.getPayload().sub}/budget/`,
      headers: {Authorization: `Bearer ${Auth.getToken()}`},
      data: {category: category}
    })
      .then(res => {
        const editedUser = {...this.state.user};
        editedUser.categories = res.data;
        console.log('edited User is',editedUser);
        this.setState({ user: editedUser });
      });
  }

  openCategory = () => {
    this.setState({ newCategory: true });
  }

  newCategoryChange = ({ target: { name, value } }) => {
    console.log(name, value);
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  newCategorySave = () => {
    console.log(this.state.newCategory);
    axios({
      method: 'post',
      url: `/api/users/${Auth.getPayload().sub}/budget/`,
      data: { category: this.state.newCategory}
    })
      .then(res => {
        console.log(res.data.categories);
        const editedUser = {...this.state.user};
        editedUser.categories = res.data.categories;
        console.log('edited User is',editedUser);
        this.setState({ user: editedUser, newCategory: false });
      });
  }

  render(){
    return (
      <div className="container">
        <h2 className="title is-2 has-text-right">{this.state.userId}</h2>
        <h2 className="title is-2 has-text-centered">Your Budget</h2>

        <BudgetForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          removeBudgetCategory={this.removeBudgetCategory}
          openCategory={this.openCategory}
          newCategoryChange={this.newCategoryChange}
          newCategorySave={this.newCategorySave}
          data={this.state}
        />
      </div>

    );
  }
}

export default BudgetRoute;
