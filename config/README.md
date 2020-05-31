# Config folder

The config folder holds the one file that contains constant values.

[[_TOC_]]

## default.json

The default json file contains constant values which can be accessed throughout the program. They are contained in this one file so the value only has to be changed in the one file to take affect across all parts of the backend environment. 

The file contains:

- mongoURI - The URI required to connect to the database.
- jwtSecret - This is the secret key used to encrypt the JSON web tokens that are used as login tokens. More information on this can be found in the [middleware README](../middleware)
