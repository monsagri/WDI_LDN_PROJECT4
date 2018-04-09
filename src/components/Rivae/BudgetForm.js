import React from 'react';

const Form = ({ handleSubmit, handleChange, removeBudgetCategory, data}) => {
  console.log('data in BudgetForm is',data);
  const currentMonth = data.user.budget.find(budget => budget.currentMonth === data.currentMonth);
  console.log('current Month is', currentMonth);
  return (

    <form onSubmit={handleSubmit}>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Current Spending</th>
            <th>Amount Budgeted</th>
            <th>Difference</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.user.categories.map((category, i) =>
            <tr key={i}>
              <td>{category}</td>
              <td>
                {/* This pulls the amount spent on the category if it exists or sets it to 0 */}
                {data.user.spendingByCategory[category]
                  ? data.user.spendingByCategory[category].toFixed(2)
                  : 0}
              </td>
              <td>
                {/* This pulls the amount budgeted on the category if it exists or sets it to 0. It also transfers the new amount to the model using handleChange */}
                <input
                  type="number"
                  name={`${category}`}
                  value={ currentMonth
                    ? currentMonth.categories.find(budget => budget.name === category)
                      ?  currentMonth.categories.find(budget => budget.name === category).budgeted
                      : 0
                    : 0}
                  onChange={handleChange}
                />
              </td>
              <td>{
                // This checks whether there has been any spending
                data.user.spendingByCategory[category]
                // if so, check whether a budget was set
                  ? currentMonth.categories.find(budget => budget.name === category)
                    // If so, subtract spending from budget to see remainig spending money
                    ? (data.user.spendingByCategory[category] + currentMonth.categories.find(budget => budget.name === category).budgeted).toFixed(2)
                    // if not, simply display the spending
                    : data.user.spendingByCategory[category].toFixed(2)
                  // if nothing was spent, display either budgeted amount or 0
                  : currentMonth.categories.find(budget => budget.name === category)
                    ? currentMonth.categories.find(budget => budget.name === category).budgeted
                    : 0
              }
              </td>
              <td>
                <button
                  onClick={() => removeBudgetCategory(category)}
                  type="button">
                X
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <button className="button is-primary">Submit</button>
    </form>
  );

};

export default Form;
