# Middleware folder

The middleware folder contains middleware functions which can be implemented into the api routes. The middleware functions gain access to th request and response objects and allow for many tasks to be performed More information on Express middleware and how to implement them can be found [here](https://expressjs.com/en/guide/writing-middleware.html).

[[_TOC_]]

## auth.js

```javascript
auth(req, res, next)
```

The auth function is used to check that the user trying to access the api has the authority to do so. The user gains the authority when they log in. If they do not have the authority then a response is sent back to the requester saying that they don't have access. This is a security measure as the data contains personal information. The authentication token is stored in the http requests header.
