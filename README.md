# Book list

### Usage Server & Client
With only npm:
```
npm install
npm start
```

#### Data Env
Fill data .env
```
JWTSECRET= your secret jwt
CLOUD_BUCKET= your cloud bucket
GCLOUD_PROJECT= your id gcloud project
KEYFILE_PATH= your file json key
DATABASENAME= your database name
DATABASEPW= your password database name
```

### REST API SERVER

### Link API


 Route | HTTP | Description | Parameter
 ----- | ---- | ----------- | ---------
 [/users](/users) | POST | for REGISTER new user | fullname: string, email: string, password: string
 [/users/login](/users/login) | POST | SIGNIN | email: string, password: string
 [/books](/books) | POST | for CREATE new books ( Authenticated user only) | apptoken: headers, id: headers
 [/books](/books) | GET | for VIEW ALL book list
 [/books/view/book](/books/view/book) | GET | for VIEW ALL book list by ID
 [/books/:id/](/books/:id/) | DELETE | for DELETE single list books ( Authenticated user only) | apptoken: headers, id: headers

### Account

