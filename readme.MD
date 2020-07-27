## Customer service
REST API for customer CRUD operations

### Env variables
For local dev following need to be set in .env For testing and PRD those need to be set in server en
 - PORT: The port the server will listen on. Default 8080
 - MONGO_URI: The mongo connection URI. This is required and APP won't start without it.
 - MONGO_DB: The database to use. Default test

### Run app in local
```
npm start
```

### Build app

The compiled js code will be in /dist folder
```
npm run build
```