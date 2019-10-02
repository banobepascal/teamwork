<<<<<<< HEAD

[![Build Status](https://travis-ci.org/banobepascal/teamwork.svg?branch=develop)](https://travis-ci.org/banobepascal/teamwork)
[![Coverage Status](https://coveralls.io/repos/github/banobepascal/teamwork/badge.svg)](https://coveralls.io/github/banobepascal/teamwork)
[![Maintainability](https://api.codeclimate.com/v1/badges/86ae0e9e83da59c9f077/maintainability)](https://codeclimate.com/github/banobepascal/teamwork/maintainability)


# Teamwork
Teamwork is an ​ internal social network for organizations’ employees. The goal of this
application is to facilitate more interaction between colleagues and facilitate team bonding

## Built With

* [NodeJS](https://nodejs.org/) - Runtime Environment
* [ExpressJs](https://expressjs.com/) - Web Application Framework


## Supporting Packages
#### Linter

* [ESLint](https://eslint.org/) - Linting Tool

## Installation/Getting Started
* Git clone repository
``` 
git clone <repo_url>
```

* Install all dependencies
```
npm install
```
## Running
```
npm start
```

## Testing

### Testing with [Postman](www.postman.com)
```
* Install and setup Postman 
* Navigate to localhost 3000 
```

### Testing with Mocha and Chai
```
npm test in terminal
```
## Features
* Employees can create their own user account.
* Employees can sign in.
* Employees can write and/or share articles with colleagues on topics of interest to them.
* Employees can edit their articles.
* Employees can delete their articles.
* Employees can comment on other colleagues' article post.
* Employees can view all articles showing the most recently posted articles first.
* Employees can view a specific article.
* Employees can view all articles that belong to a category (tag).
* Employees can flag a comment, or article as inappropriate.
* Admin can delete a comment, or article flagged as inappropriate.

## Endpoints
|  Method  |  Endpoint  |  Task  |
|  --- |  --- |  ---  |
|  `POST`  |  `/api/v1/auth/signup`  |  `User signup`  |
|  `POST`  |  `/api/v1/auth/signin`  |  `User login`  |
|  `GET`  |  `/api/v1/feeds`  |  `User view all articles posted`  |
|  `POST`  |  `/api/v1/articles`  |  `User post an article`  |
|  `PATCH`  |  `/api/v1/articles/:id`  |  `User edit article`  |
|  `GET`  |  `/api/v1/articles/:id`  |  `User can view specific`  |
|  `POST`  |  `/api/v1/articles/:id/comments`  |  `User can comment on specific article`  |
|  `DELETE`  |  `/api/v1/articles/:id`  |  `User can delete specific article`  |

## Deployments
* Frontend on [Github](https://banobepascal.github.io/teamwork/ui/)
* Backend on [Heroku](https://teamwork-pascal.herokuapp.com/)
* Tracker on [Pivotal Tracker](https://www.pivotaltracker.com/n/projects/2395736)
* Documentation on [Postman](https://documenter.getpostman.com/view/8823206/SVn2NbR1)

#### Credit
* All credit given to [Andela](https://andela.com)
=======
>>>>>>> 3dea6989dea23fd0edbf58f1ab35d23b5dd2f3f6

