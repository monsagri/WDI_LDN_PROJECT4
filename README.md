![screenshot](https://i.imgur.com/YZ8XIzY.jpg)
# Moneymapper

Moneymapper is a web-based money-management application. It allows users to visualize their spending in order to get a better understanding of it and set monthly budgets.  
Users can add transactions manually or upload their bank statements as CSV files (CSV upload is currently only supported for Monzo bank statements)

###### [Visit website](https://moneymapperapp.herokuapp.com/) for best *viewing* experience (the application works on mobile but was not designed mobile-first).

###### [View the project Brief](project_brief.md)

_________________

## Built With

* ***M*ongoDB** - Document database – used by the back-end application to store its data as JSON documents
* ***E*xpress** - Back-end web application framework running on top of Node.js
* ***R*eact** - JavaScript library used to build interactive/reactive user interfaces
* ***N*ode.js** - JavaScript runtime environment – lets you implement your application back-end in JavaScript

* **Axios** - Promise based HTTP client for the browser and Node.js
* **bcrypt** - A password hasher to ensure user safety
* **bluebird** - Javascript Promise library
* **Fast-csv** - A library that provides CSV parsing and formatting.
* **jsonwebtoken** - JSON Web Token (JWT) is a compact URL-safe means of representing claims to be transferred between two parties.
* **lodash** - JavaScript utility library
* **mongoose** - MongoDB modeling for node.js
* **Victory** - Victory is a set of modular charting components for React and React Native.

* **Bulma** - CSS Framework based on Flexbox
* **Styled-components** - Utilising tagged template literals and CSS, styled-components allows you to write actual CSS code in JS to style your components.

_________________

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

Clone the repository

Then run yarn install to install dependencies.

```
yarn install
```

run db/seeds.js to fill the database with test database

```
node db/seeds
```

Start the server with yarn start:server

```
yarn start:server
```
Start the client with yarn start:client

```
yarn start:client
```

_________________

## Running the tests

###### Testing was done using Mocha, Chai, Enzyme, Supertest and NYC.

Moneymapper comes with both back-end and front-end testing. All testing is test-coverage that was added post completion of features, I did not use TDD in this project.

### Backend Tests

The backend tests ensure a solid foundation on the backend and allowed me to refactor while keeping an eye on effects

```
yarn test:server
```


### Frontend Tests

The frontend tests test the main functional component (Index Page) and one classical component (Budget).
I had some difficulties setting up tests for the frontend, as we hadn't covered using Mocha with styled-components.

```
yarn test:client
```

_________________

## Wins

Building Moneymapper was a challenge, but by far the most fun out of our final projects. I started with a very clear idea of what I wanted to build and managed to hold onto that throughout the process.  
I used styled-components on a large scale for the first time and am beginning to really understand how powerful a tool it can be.  
One of the main features of Moneymapper is date visualization, which is something that we had not covered during the course. Finding a good library in **Victory** and making it work for me was satisfying.  
Finally the entire backend rests on one user model, which was challenging at times, but also helped me understand complicated nested data structures.
_________________

## Challenges

The deeply nested data structure was fun, but also led to some difficulties when building out my RESTful Routes and placing the correct Ajax request from the frontend.  
Some of the data manipulation on the backend was also rather complex, since all User transactions had to be grouped by different categories for different use cases (by category, by year/month, etc.). I managed to solve all of these using virtuals however, ensuring that the database does not grow too expensive.

_________________

## Code example - Transactions By Month Virtual

```
userSchema
  .virtual('transactionsByMonth')
  .get(function findTransactionsByMonth() {
    const allYears = _.uniq(this.transactions.map(transaction => transaction.year));
    // create Object with primary Key Years, secondary Keys months
    const spendingObject = {};
    allYears.forEach(year => spendingObject[year] = 0);
    // Fill Object by running through all transactions
    // Find Transactions per Year
    Object.keys(spendingObject).forEach(year =>{
      const yearlyTransactions = this.transactions.filter(transaction => transaction.year === parseInt(year, 10));
      // find months with spending data
      const activeMonths = _.uniq(yearlyTransactions.map(transaction => transaction.month));
      // create objects for them
      const monthObject = {};
      activeMonths.forEach(month => monthObject[month] =[]);
      spendingObject[year] = monthObject;
      // Insert spending by Month
      activeMonths.forEach(month =>
        yearlyTransactions
          .filter(transaction => transaction.month === parseInt(month, 10))
          .forEach(filteredTransaction => spendingObject[year][month].push(filteredTransaction))
      );
      // sort the transactions by Date
      activeMonths.forEach(month => spendingObject[year][month] = _.sortBy(spendingObject[year][month], 'date_Object'));
    });

    return spendingObject;
  });
```

This virtual uses lodash as well as vanilla JavaScript to sort all transactions into an object. It creates a top level key for each year, and a nested key for each month with spending data inside those years.  
This allows the user to view and analyze data by month on the frontend and is essential for the site to function.
_________________

## Further development

I am happy with the current state of Moneymapper as my final Project for WDI at General Assembly, however there are a lot of features and changes I want to add to turn into a fully functional product.

#### Potential features

* Average spending values per category - allow users to compare themselves to others
* More data visualization and ability to filter current graphs by month/week
* Notifications/Warnings when you get close to hitting your budget limits
* Add support for more banks than just Monzo

#### Other changes

* Make the switch from a mix of styled-components and Bulma to using styled-components exclusively.
* Refactor some of the frontend components
* More fine tuning on the styling

_________________


## Authors

* **Fabian Feldberg** -  [monsagri](https://github.com/monsagri)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

_________________

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
