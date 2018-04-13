![](https://i.imgur.com/jeBZQSc.jpg)
# Rivae

Rivae is a web-based money-management application. It allows users to visualize their spending in order to get a better understanding of it and set monthly budgets.

## Built With

* **M**ongoDB - Document database – used by the back-end application to store its data as JSON documents
* **E**xpress - Back-end web application framework running on top of Node.js
* **R**eact - JavaScript library used to build interactive/reactive user interfaces
* **N**ode.js - JavaScript runtime environment – lets you implement your application back-end in JavaScript
* Victory - Victory is a set of modular charting components for React and React Native.
* Fast-csv - A library that provides CSV parsing and formatting.
* styled-components - Utilising tagged template literals and CSS, styled-components allows you to write actual CSS code in JS to style your components.

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

## Running the tests

###### Testing was done using Mocha, Chai, Enzyme, Supertest and NYC.

Rivae comes with both back-end and front-end testing. All testing is test-coverage that was added post completion of features, I did not use TDD in this project.


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


## Further development

I am happy with the current state of Rivae as my final Project for WDI at General Assembly, however there are a lot of features and changes I want to add to turn into a fully functional product.

#### Potential features

* Average spending values per category - allow users to compare themselves to others
* More data visualization and ability to filter current graphs by month/week
* Notifications/Warnings when you get close to hitting your budget limits

#### Other changes

* Make the switch from a mix of styled-components and Bulma to using styled-components exclusively.
* Refactor some of the frontend components
* More fine tuning on the styling


## Authors

* **Fabian Feldberg** -  [monsagri](https://github.com/monsagri)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
