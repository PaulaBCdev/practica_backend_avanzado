# NodePop

NodePop is a web application where users can post ads to sell products.
Each user can only view and manage their own products, which allows to practice authentication and permissions management in a backend with Node.js.

## NPM Package

vowel-changer: <https://www.npmjs.com/package/vowel-changer>

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

### API login

POST /api/login

```json
{
  "tokenJWT": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.<payload>.<firma>"
}
```

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

### Show a product

GET /api/products/:productId

```json
{
  "result": {
    "_id": "68480d374133034327b10392",
    "name": "Mando de PlayStation",
    "owner": "68480d374133034327b1038c",
    "price": 12,
    "image": "s-l1200.jpg",
    "tags": ["videojuegos", "gaming"],
    "__v": 0
  }
}
```

### Create new product

POST /api/products

```json
{
  "result": {
    "name": "producto con imagen",
    "price": 12,
    "tags": ["ju", "an"],
    "_id": "684ffcae77f8270d5ea384c4",
    "image": "1750072494174-e5446efbdff2e7efa55381ae50cc853c.jpg",
    "__v": 0
  }
}
```

### Update product

PUT /api/products/:productId

```json
{
  "result": {
    "_id": "68480d374133034327b10392",
    "name": "Mando de PlayStation",
    "owner": "68480d374133034327b1038c",
    "price": 45,
    "image": "s-l1200.jpg",
    "tags": ["videojuegos", "gaming"],
    "__v": 0
  }
}
```

### Delete product

DELETE /api/products/:productId

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
