# Backend environment

The backend environment is all the code run on the server. It mainly consists of the api connecting the frontend to the database. The backend is written in javascript and is designed to run on a Node js server environment which allows js to run on the server.

## Client folder

The client folder holds all the code which is run on the clients browser, and so it should be looked at as a seperate entity to the rest of the content on the backend. Documentation for the frontend environment can be found [here](./client).

## Config folder

The config folder contains constant variables which, if they are ever changed, can be changed from one place and this is updated throughout the program. Documentation can be found [here](./config).

## Middleware folder

This folder consists of the middleware which is run on api routes. Documentation is found [here](./middleware).

## Models folder

The models folder contains all the data models for the database. They define the document structure for each model in the database. Documentation is found [here](./models).

## Routes/api folder

This folder contains the api routes that the frontend can access. Each route runs a block of code to return some data back to the frontend. Documenation can be found [here](./routes/api)

## package.json

The package.json is where all the packages information is found. The packages hold code that is needed for the application to run and the package.json holds the information about these packages so anyone can download and install the packages to use and develop this project.

More information on how to read, use and edit the package.json file can be found [here](https://docs.npmjs.com/files/package.json).

## server.js

The server js file setups and defines the api routes when it is run on the server, and also initiates the connection to the database. The following packages are used to setup the server and database connection:


### **Express**

[Express](https://expressjs.com/) is a framework that is built for the Node environment which in this project enables the api routes to be created and handles the HTTP connections.

#### Express setup

The server js file setups the Express framework and then sets the middleware of Express to handle the JSON format. This allows JSON to be handled and sent via HTTP. This is important as JSON is the format in which the data will be sent between the frontend the database.

```javascript
// Express setup
const app = express();
app.use(express.json());
```

#### Express api route

The file assigns api routes to url's. The following example sets the users api routes (the route that will return information about users) to the url "localhost:[PORT]/api/users".

```javascript
// Assign routes to express
app.use("/api/users", require("./routes/api/users.route"));
app.use("/api/auth", require("./routes/api/auth.route"));

```

#### Start

The final job for this code is to start the server on a specific port. In our case in the development environment it is port 5000. However if the project is put into production on a server, the code will use the servers defined port for the server to run on.

```javascript
// start server to listen on port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on port ${port}`));

```

### **Mongoose**

[Mongoose](https://mongoosejs.com/) js package is used to connect to the mongoDB database. The package makes it easy to connect to the database.

#### Connecting to the database

Mongoose connects to the database using the databases Uniform Resource Identifier (URI). The URI contains the username and password, and is stored in the config folder.

```javascript
// Mongoose setup
const dbConnectionURI = config.get("mongoURI");

// Mongoose connecting to the database
mongoose
  .connect(dbConnectionURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

```


