# Simple Library Application

- [Backend](#backend)
- [Frontend](#frontend)

<a name="#backend"></a>

## Backend

- [Built With](#builtWith)
- [Architectural Assumptions](#assumptions)
- [End Points](#endpoints)

<a name="#builtWith"></a>

### Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html) [![Node.js](https://img.shields.io/badge/Node.js-v.10.16-green.svg?style=rounded-square)](https://nodejs.org/) [![MongoDB](https://img.shields.io/badge/mongoose-v5.10.0-blue)](https://www.npmjs.com/search?q=mongoose)

<a name="#assumptions"></a>

### Architectural Assumptions

- Not supporting any borrowing and return history of Users and Books
- User and Books CRUD operations only supported
- User Authentication, registration and oAuth is not supported
- Each user's books borrowed list is saved in the User object
- Number of available copies is maintained in the Book object. if the available copy is 0, hence the book is not available
- Created the REST API service using microservice architecture approach

### Development Docs

- Read the further instructions in [README.md](/backend/README.md) for running and testing the application using development server

### End Points

- Versioning is supported by using config.js

#### **Homepage**

- **Request** : **`GET /`**
- **Response** :
  ```
    {
     "message": "Library REST API Server is running"
    }
  ```
#### **User Creation**

- **Request** : **`POST /v1/api/users/`**

  ```
   {
    "name": "test1", 
    "email": "test1@gmail.com",
    "password": "dsjhdhdscdsmndsjhsdjd", 
    "books_borrowed": []
  }
  ```
- **Response** :

  ```
   {
    "books_borrowed": [],
    "_id": "5f45894e0120bf5ac299ac52",
    "name": "test",
    "email": "test@gmail.com",
    "password": "dsjhdhdscdsmndsjhsdjd",
    "__v": 0
  }
  ```

#### **Getting User Information**

- **Request** : **`GET /v1/api/users/5f45894e0120bf5ac299ac52`**
- **Response** :

  ```
   {
    "books_borrowed": [],
    "_id": "5f45894e0120bf5ac299ac52",
    "name": "test",
    "email": "test@gmail.com",
    "password": "dsjhdhdscdsmndsjhsdjd",
    "__v": 0
  }
  ```
#### ** Updating User Information**

- **Request** : **`PUT /v1/api/users/5f45894e0120bf5ac299ac52`**

 ```
   {
    "name": "test1", 
    "email": "test12@gmail.com",
    "password": "dsjhdhdscdsmndsjhsdjd", 
    "books_borrowed": []
   }
  ```
- **Response** :

  ```
   {
    "books_borrowed": [],
    "_id": "5f45894e0120bf5ac299ac52",
    "name": "test1",
    "email": "test12@gmail.com",
    "password": "dsjhdhdscdsmndsjhsdjd",
    "__v": 0
   }
  ```

#### **Deleting User Information**

- **Request** : **`DELETE /v1/api/users/5f45894e0120bf5ac299ac52`**
- **Response** :

  ```
    {
     "message": "User deleted"
    }
  ```

#### **Book Creation**

- **Request** : **`POST /v1/api/books/`**

  ```
   {
    "isbn": "ISBN001", 
    "title": "Book1",
    "available_copies": 1
   }
  ```
- **Response** :

  ```
   {
    "available_copies": 1,
    "_id": "5f458f080120bf5ac299ac56",
    "isbn": "ISBN001",
    "title": "Book1",
    "__v": 0
   }
  ```

#### **Getting Book Information**

- **Request** : **`GET /v1/api/books/ISBN001`**
- **Response** :

  ```
   {
    "available_copies": 1,
    "_id": "5f4588c2f57c045a88ad8543",
    "isbn": "ISBN001",
    "title": "Book1",
    "__v": 0
   }
  ```
#### ** Updating Book Information**

- **Request** : **`PUT /v1/api/books/ISBN001`**

 ```
   {
    "isbn": "ISBN001", 
    "title": "New Book1",
    "available_copies": 4
   }
  ```
- **Response** :

  ```
   {
    "available_copies": 4,
    "_id": "5f4588c2f57c045a88ad8543",
    "isbn": "ISBN001",
    "title": "New Book1",
    "__v": 0
  }
  ```

#### **Deleting Book Information**

- **Request** : **`DELETE /v1/api/books/ISBN001`**
- **Response** :

  ```
    {
     "message": "Book deleted"
    }
  ```

<a name="#frontend"></a>

## Frontend

- [Local Hosting Procedure](#local-hosting-procedure)
- [Source Code](#source-code)
- [Unit Test](#unit-test)

<a name="#local-hosting-procedure"></a>

### Local Hosting Procedure

There are two ways available for the local hosting procedure.

- Host using **serve** (https://github.com/vercel/serve) server for production-ready files
- Host using framework development server for source codes

Before doing local hosting, clone the repository and navigate to cloned folder(ict-postings-ui-sathyesh-selvarajah) through terminal

```bash
cd ict-postings-ui-sathyesh-selvarajah
```

### Host using serve server

- Production-ready application files are available in app/production-ready-app-files under **_dist_** folder
- Navigate there using following command
  ```bash
  cd app/production-ready-app-files
  ```
- Install _serve_ using the following command
  ```bash
  npm install
  ```
- Run below command in the terminal and wait for the server to start
  ```bash
  npm run production-ready
  ```
- Application is available in http://localhost:8080
- To do e2e testing using cypress, please follow the procedure which is present under root [tests](/tests/README.md) folder

### Host using framework development server

- Read the further instructions in [README.md](/app/ict-postings-ui/README.md) for running the application using development server

<a name="#source-code"></a>

### Source Code

- Source code files are available under [src](/app/ict-postings-ui/src) folder

<a name="#unit-test"></a>

### Unit Test

- Unit test cases are available under [tests](/app/ict-postings-ui/tests) folder

## Frontend

- [Goal](#goal)
- [User Stories](#user-stories)
- [Scenario](#scenario)
- [Wireframes](#wireframes)
- [Public API](#public-api)

<a name="#goal"></a>

### Goal

Develop production-ready application for candidates that displays a list and details of postings published by Smartrecruiters which are available via [SmartRecruiters Public API](#public-api).

The application should:

- implement [user stories](#user-stories)
- pass [scenario](#scenario)
- follow design guidelines from [wireframes](#wireframes)
- pass [e2e tests](tests/README.md)

<a name="#user-stories"></a>

### User stories

- as a candidate, I want to see list of postings published by SmartRecruiters
- as a candidate, I want to filter postings published by SmartRecruiters by `location.country` and `department`
- as a candidate, I want to see `jobAd.sections.jobDescription` and `jobAd.sections.jqualifications` of postings published by SmartRecruiters

<a name="#scenario"></a>

### Scenario

1. Open `localhost:8080`
2. Postings list loads
3. Candidate filter list by country and department
4. List displays only filtered elements
5. Click an item on the list
6. Posting details containing `jobAd.sections.jobDescription` and `jobAd.sections.jqualifications` section opens
7. Click `backlink` to return to the list

<a name="#wireframes"></a>

### Wireframes

#### List of postings published by SmartRecruiters

!["sr-app-list-design.png"](media/sr-app-list-design.png)

#### Posting details contatining `jobAd.sections.jobDescription` and `jobAd.sections.jqualifications` section

!["sr-app-details-design.png"](media/sr-app-details-design.png)

<a name="#public-api"></a>

### Public API

#### Get list of postings published by SmartRecruiters

`GET https://api.smartrecruiters.com/v1/companies/smartrecruiters/postings`

demo: https://reqbin.com/fjiq2zrg  
documentation: https://dev.smartrecruiters.com/customer-api/posting-api/endpoints/postings/

#### Get posting details

`GET https://api.smartrecruiters.com/v1/companies/smartrecruiters/postings/{postingID}`

demo: https://reqbin.com/sghcu97n  
documentation: https://dev.smartrecruiters.com/customer-api/posting-api/endpoints/postingcontent/


