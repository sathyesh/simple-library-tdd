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

[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html) [![Node.js](https://img.shields.io/badge/Node.js-v.12.16-green.svg?style=rounded-square)](https://nodejs.org/) [![MongoDB](https://img.shields.io/badge/mongoose-v5.10.0-blue)](https://www.npmjs.com/search?q=mongoose)

<a name="#assumptions"></a>

### Architectural Assumptions
- Created the REST API service using microservice architecture approach
- User and Books CRUD operations is supported
- Each user's books borrowed list is saved in the User object
- Number of available copies is maintained in the Book object. if the available copy is 0, hence the book is not available
- Borrowing and return history of Users and Books is not supported
- User Authentication, registration and oAuth is not supported

### Development Docs

- Read the further instructions in [README.md](/backend/README.md) for running and testing the application using development server


### Unit Test

!["unit_test.png"](/backend/docs/images/unit_test.png)

### Code Coverage

!["code_coverage.png"](/backend/docs/images/code_coverage.png)

### End Points

- Versioning is supported and maintained using config.js

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
#### **Updating User Information**

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
#### **Updating Book Information**

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

- [Development Assumptions](#dev-assumptions)
- [Local Hosting Procedure](#local-hosting-procedure)
- [Source Code](#source-code)
- [Unit Test](#unit-test)

<a name="#dev-assumptions"></a>

### Development Assumptions

- At first, thought of hosting the backend in AWS, because of limited time, I could not able to do that
- Currently used local json for user stories development
- Followed the same Data model as MongoDB
- All the user stories are implemented
- For quick running, please follow [Local Hosting Procedure](#local-hosting-procedure)

<a name="#local-hosting-procedure"></a>

### Local Hosting Procedure

There are two ways available for the local hosting procedure.

- Host using **serve** (https://github.com/vercel/serve) server for production-ready files
- Host using framework development server for source codes

Before doing local hosting, unzip the file and navigate to folder(simple-library-tdd) through terminal

```bash
cd simple-library-tdd
```

### Host using serve server

- Production-ready application files are available in frontend/production-ready-app-files under **_dist_** folder
- Navigate there using following command
  ```bash
  cd frontend/production-ready-app-files
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

### Host using framework development server

- Read the further instructions in [README.md](/frontend/README.md) for running the application using development server

<a name="#source-code"></a>

### Source Code

- Source code files are available under [src](/frontend/src) folder

<a name="#unit-test"></a>

### Unit Test

- Unit test cases are available under [tests](/frontend/tests) folder

### Screenshot

!["code_coverage.png"](/frontend/docs/images/application.png)
