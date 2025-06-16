# NodePop

NodePop is a web application where users can post ads to sell products.
Each user can only view and manage their own products, which allows to practice authentication and permissions management in a backend with Node.js.

## Database

The database created for this project is called **'nodepop'**. If you'd like to use your own database, you can change the name in `/lib/connectMongoose.js`.

## Installation

Install dependencies with:

```sh
npm install
```

Copy enviroment Variables example to .env:

```sh
cp .env.example .env
```

Review your new .env values to match your configuration.

On first deploy you can use the next command to initialize the database:

```sh
npm run initDB
```

## Use

Start the server in development:

```sh
npm run dev
```

Start the server in production:

```sh
npm start
```

## API

Base URL: http://localhost:3000/api

### Products list

GET /api/products

```json
{
  "results": [
    {
      "_id": "684988723021af33bc7ec156",
      "name": "Nintengo",
      "owner": "68480d374133034327b1038c",
      "price": 500,
      "tags": ["gaming", "toys"],
      "__v": 0
    },
    {
      "_id": "684c121288cd779e4f8515c6",
      "name": "Todos los tags",
      "owner": "68480d374133034327b1038c",
      "price": 4,
      "tags": ["gaming", "clothes", "toys", "others"],
      "__v": 0
    }
  ]
}
```

## Main endpoints

### Not proptected endpoints

The user does not need to authenticate to access these enpoints:

Home

```sh
GET /
```

Login

```sh
POST /login
```

Logout

```sh
GET /logout
```

### Protected endpoints

The user needs to authenticate to access these endpoints. If they try to access these endpoints, they will be redirected to the login page.

Create new product

```sh
POST /products/new
```

Delete product

```sh
GET /products/delete/:productId
```

## Tecnologies used

- Node.js
- MongoDB
- npm
- Express.js
- nodemon
- Mongoose
- connect-mongo
- cross-env
- http-errors
- EJS
- Morgan
- express-session
- Bcrypt
- Multer
- express-validator
