import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';

import BudgetForm from './BudgetForm';
import CategoryAdder from './CategoryAdder';

import TransactionNav from '../../assets/styledComponents/TransactionNav';
import FlexRowDiv from '../../assets/styledComponents/FlexRowDiv';
import RivaeButton from '../../assets/styledComponents/RivaeButton';
import Title from '../../assets/styledComponents/Title';

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
    month: 0,
    year: 0,
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    newCategory: false
  }

  componentWillMount() {
    this.state.month
      ? console.log('Month is already set')
      : this.setState({ month: new Date().getMonth(), year: new Date().getFullYear()}, () => console.log('month and year being set',this.state));
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: `/api/users/${this.props.match.params.id}/budget`,
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => {
        this.setState({ user: res.data }, () => console.log('state post   setState',this.state));
      });
  }

  handleChange = ({ target: { name, value } }) => {
    const editedUser = {...this.state.user};
    const currentBudget = editedUser.budget.find(item => item.month === this.state.month && item.year === this.state.year);
    console.log('variable currentBudget is', currentBudget);
    if (!currentBudget) {
      editedUser.budget.push({
        currentBudget: this.state.currentBudget,
        categories: []
      });
    }
    if (!currentBudget.categories.find(category => category.name === name)) {
      currentBudget.categories.push(
        {
          name: name,
          budgeted: parseInt(value, 10)
        }
      );
    } else {
      const currentCategory = currentBudget.categories.find(budget => budget.name === name);
      currentCategory.budgeted = parseInt(value, 10);
    }
    this.setState({ user: {...editedUser}}, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // remove empty budgets before sending to server
    const cleanedUser = {...this.state.user};
    console.log('user  now is ', cleanedUser);
    cleanedUser.budget.filter(budget => budget.categories.length !== 0);
    this.setState({user: cleanedUser});
    console.log('budget being sent to backend is',this.state.user.budget);
    // send stuff back
    axios({
      method: 'put',
      url: `/api/users/${this.props.match.params.id}/budget`,
      headers: {Authorization: `Bearer ${Auth.getToken()}`},
      data: this.state.user.budget
    })
      .then(() => this.props.history.push(`/users/${this.props.match.params.id}/budget`));
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
    this.setState({ newCategory: !this.state.newCategory });
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

  incrementMonth = (increment) => {
    if (this.state.month + increment < 0) return this.setState({ month: 11 , year: this.state.year - 1}, () => console.log(this.state.month, this.state.year));
    if (this.state.month + increment > 11) return this.setState({ month: 0 , year: this.state.year + 1}, () => console.log(this.state.month, this.state.year));
    return this.setState({ month: this.state.month + increment }, () => console.log(this.state.month));
  }

  render(){
    return (
      <div className="container">
        <h2 className="title is-2 has-text-right">{this.state.userId}</h2>
        <Title>Your Budget</Title>

        <h3 className="title is-3">{this.state.months[this.state.month]} - {this.state.year}</h3>

        <TransactionNav>
          <FlexRowDiv>
            <RivaeButton
              className="button"
              onClick={() => this.incrementMonth(-1)}>Previous Month</RivaeButton>
          </FlexRowDiv>

          <FlexRowDiv>
            <RivaeButton
              className="button"
              onClick={() => this.incrementMonth(1)}>Next Month</RivaeButton>
          </FlexRowDiv>
        </TransactionNav>

        <BudgetForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          removeBudgetCategory={this.removeBudgetCategory}
          data={this.state}
        />

        <CategoryAdder
          toggled={this.state.newCategory}
          openCategory={this.openCategory}
          newCategoryChange={this.newCategoryChange}
          newCategorySave={this.newCategorySave}
        />
      </div>

    );
  }
}

export default BudgetRoute;
