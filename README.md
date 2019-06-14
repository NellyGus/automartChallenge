# AutomartChallenge
Auto Mart is an online marketplace for automobiles of diverse makes, model or body type. With Auto Mart, users can sell their cars or buy from trusted dealerships or private sellers.

[![Build Status](https://travis-ci.com/NellyGus/automartChallenge.svg?branch=develop)](https://travis-ci.com/NellyGus/automartChallenge)

## Template Link

Template is hosted at https://nellygus.github.io/automartChallenge/ui/login.html

### API Deployment

API is deployed at https://intense-ocean-82751.herokuapp.com

## Built With

<ul>
<li><a href="https://nodejs.org/">NodeJS</a></li>
<li><a href="https://expressjs.com/">ExpressJS</a></li>
<li><a href="https://developer.mozilla.org/kab/docs/Web/HTML">HTML</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS">CSS</a></li>
<li><a href="https://developer.mozilla.org/bm/docs/Web/JavaScript">JavaScript</a></li>
</ul>

### Supporting Packages

#### Linter

- [ESLint](https://eslint.org/) - Linter Tool

#### Compiler

- [Babel](https://babeljs.io/) - Compiler for Next Generation JavaScript

#### Test Tools

- [Mocha](https://mochajs.org/) - JavaScript Test Framework for API Tests (Backend)
- [Chai](http://chaijs.com/) - TDD/BDD Assertion Library for Node
- [Chai-http](https://github.com/visionmedia/supertest) - A Chai plugin for testing node.js HTTP servers

### API Routes

|        DESCRIPTION                            | HTTP METHOD | ROUTES                                  |
| :-------------------------------------------: | ----------- | --------------------------------------- |
| User signup                                   | POST        | /api/v1/auth/signup                     |
| User signin                                   | POST        | /api/v1/auth/signin                     |
| Create a car sale ad                          | POST        | /api/v1/car                             |
| Create a purchase order                       | POST        | /api/v1/order                           |
| Update the price of a purchase order          | PATCH       | /api/v1/order/{order-id}/price          |
| Mark a posted car Ad as sold                  | PATCH       | /api/v1/car/{car-id}/status             |
| Update the price of a car                     | PATCH       | /api/v1/car/{car-id}/price              |
| View a specific car                           | GET         | /api/v1/car/{car-id}                    |
| View all unsold cars                          | GET         | /api/v1/car?status=available            |
| view all unsold cars within a price range     | GET         | /api/v1/car?status=available...         |
|                                               |             | ...&min_price=XXXValue...               |
|                                               |             | ...&max_price=XXXValue                  |
| Delete a specific car Ad                      | DELETE      | /api/v1/car/{car-id}                    |
| View all posted ads whether sold or available | GET         | /api/v1/car                             |
| flag/report a posted AD as fraudulent         | POST        | /api/v1/flag/                           |
| View all unsold cars with their states        | GET         | /api/v1/car?status=available&state=     |

