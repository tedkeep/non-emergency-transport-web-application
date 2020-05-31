# API Routes

The API routes which allow the frontend to access the database.

[[_TOC_]]

## Auth

This route is used to authenticate the user on login.

### Endpoints

| Description | Method | Endpoint | Access |
|-------------|--------|----------|--------|
Authenticate user when logging in. | POST | [api/auth](#api/auth) | Public
Get user data | GET | [api/auth/user](#api/auth/user) | Private

#### api/auth

Authenticates a user when logging in. Supply the username and password in the requests body and the api will return a user token and the users details.

##### Request

```JSON
{
    email: "example@email.com",
    password: "securePassword"
}
```

##### Response

```JSON
{
    token: "AAbbCc11",
    user: {
        _id: "AbC1",
        email: "example@email.com"
    }
}
```

#### api/auth/user

Retrieves the users data. The route requires the authentication token so the user needs to be logged in to retrieve their user. This route is used to check that the user is still logged in using a valid token.

##### Request

```JSON
{
    user: {
        id: "AbC1",
        email: "example@email.com"
    }
}
```

##### Response

```JSON
{
    user: {
        id: "AbC1",
        email: "example@email.com"
    }
}
```

## Patient

This route retreives and updates patient data.

### Endpoints

| Description | Method | Endpoint | Access |
|-------------|--------|----------|--------|
Get all patient data. | GET | [api/patients](#apipatients-get) | Private
Get a patients data. | GET | [api/patients/:id](#apipatientsid-get) | Private
Update a patients data. | PUT | [api/patients/:id](#apipatientsid-put) | Private
Add a patient to the database. | POST | [api/patients](#apipatients-post) | Private
Delete a patient from the database | DELETE | [api/patients/:id](#apipatientsid-delete) | Private

#### api/patients (GET)

Retrieves all the patient data as an array. 

##### Request

No request body is needed.

##### Response

Body

```JSON
[
    {   
        _id: "1234567812",
        first_name: "Forename",
        last_name: "Surname",
        nhs_number: 123456789,
        address: {
            street: "10 Downing Street",
            town: London,
            postcode: "SW1"
        }
    },
    {
        _id: "1234567123",
        first_name: "Forename",
        last_name: "Surname",
        nhs_number: 123456789,
        address: {
            street: "10 Downing Street",
            town: London,
            postcode: "SW1"
        }
    }
]
```

#### api/patients/:id (GET)

##### Request

No request body is needed. The id for the patient is put into the URL.

URL

```
localhost:5000/api/patients/1234567812
```

##### Response

Body

```JSON
{   
    _id: "1234567812",
    first_name: "Forename",
    last_name: "Surname",
    nhs_number: 123456789,
    address: {
        street: "10 Downing Street",
        town: London,
        postcode: "SW1"
    }
}
```

#### api/patients/:id (PUT)

Updates an existing patients data. An updated array of patients is returned.

##### Request

The id is supplied in the URL and the body contains the updated patient model.

URL

```
localhost:5000/api/patients/1234567123
```

Body

```JSON
{
    _id: "1234567123",
    first_name: "Forename",
    last_name: "Surname",
    nhs_number: 123456788,
    address: {
        street: "10 Downing Street",
        town: London,
        postcode: "SW1"
    }
}
```

##### Response

Body

```JSON
[
    {   
        _id: "1234567812",
        first_name: "Forename",
        last_name: "Surname",
        nhs_number: 123456789,
        address: {
            street: "10 Downing Street",
            town: London,
            postcode: "SW1"
        }
    },
    {
        _id: "1234567123",
        first_name: "Forename",
        last_name: "Surname",
        nhs_number: 123456788,
        address: {
            street: "10 Downing Street",
            town: London,
            postcode: "SW1"
        }
    }
]
```

#### api/patients (POST)

Adds a new patient to the database. An updated array of patients is returned.

##### Request

Body

```JSON
{   
    _id: "1234561234",
    first_name: "Forename",
    last_name: "Surname",
    nhs_number: 123456723,
    address: {
        street: "10 Downing Street",
        town: London,
        postcode: "SW1"
    }
}
```

##### Response

Body

```JSON
[
    {   
        _id: "1234567812",
        first_name: "Forename",
        last_name: "Surname",
        nhs_number: 123456789,
        address: {
            street: "10 Downing Street",
            town: London,
            postcode: "SW1"
        }
    },
    {
        _id: "1234567123",
        first_name: "Forename",
        last_name: "Surname",
        nhs_number: 123456788,
        address: {
            street: "10 Downing Street",
            town: London,
            postcode: "SW1"
        }
    },
    {   
        _id: "1234561234",
        first_name: "Forename",
        last_name: "Surname",
        nhs_number: 123456723,
        address: {
            street: "10 Downing Street",
            town: London,
            postcode: "SW1"
        }
    }
]
```

#### api/patients/:id (DELETE)

Deletes a patient from the database. The id for the patient will still remain. This is so logs attached to the patient will not become corrupted. All of the patients personal data will still be deleted. An updated array of patients is returned.

##### Request

No body is needed, only the id within the URL.

URL

```
localhost:5000/api/patients/1234561234
```

##### Response

Body

```JSON
[
    {   
        _id: "1234567812",
        first_name: "Forename",
        last_name: "Surname",
        nhs_number: 123456789,
        address: {
            street: "10 Downing Street",
            town: London,
            postcode: "SW1"
        }
    },
    {
        _id: "1234567123",
        first_name: "Forename",
        last_name: "Surname",
        nhs_number: 123456788,
        address: {
            street: "10 Downing Street",
            town: London,
            postcode: "SW1"
        }
    },
    {   
        _id: "1234561234"
    }
]
```

## Personnel

This route retreives and updates employee data.

### Endpoints

| Description | Method | Endpoint | Access |
|-------------|--------|----------|--------|
Get all employees data. | GET | [api/personnel](#apipersonnel-get) | Private
Get an employees data. | GET | [api/personnel/:id](#apipersonnelid-get) | Private
Update an employees data. | PUT | [api/personnel/:id](#apipersonnelid-put) | Private
Add an employee to the database. | POST | [api/personnel](#apipersonnel-post) | Private
Delete an employee from the database | DELETE | [api/personnel/:id](#apipersonnelid-delete) | Private

#### api/personnel (GET)

Returns all personnel in the database in an array.

##### Request

No body is needed.

##### Response

Body

```JSON
[
    {
        _id: "334452222187",
        first_name: "Forename",
        last_name: "Surname",
        staff_number: 1234444,
        shifts: [
            {
                start_time: "09:00:00",
                finish_time: "17:00:00",
                day: "Monday"
            },
            {
                start_time: "09:00:00",
                finish_time: "17:00:00",
                day: "Tuesday"
            },
            {
                start_time: "09:00:00",
                finish_time: "17:00:00",
                day: "Wednesday"
            },
        ],
        unavailable: [
            {
                date: "Mon, 20 Apr 2020 00:00:00 GMT",
                note: "Holiday"
            }
        ],
        skills: [
            {
                skill: {
                    _id: "432556",
                    skill: "Oxygen tank trained"
                }   
            }
        ],
        stationed_at: {
            name: "East Colchester",
            address: {
                street: "300 Random Street",
                town: "Colchester",
                county: "Essex",
                postcode: "CO2"
            }
        },
        available: true
    },
    {
        _id: "334452222256",
        first_name: "Forename",
        last_name: "Surname",
        staff_number: 1234455,
        shifts: [
            {
                start_time: "09:00:00",
                finish_time: "17:00:00",
                day: "Monday"
            },
            {
                start_time: "09:00:00",
                finish_time: "17:00:00",
                day: "Tuesday"
            },
            {
                start_time: "09:00:00",
                finish_time: "17:00:00",
                day: "Wednesday"
            },
        ],
        unavailable: [],
        skills: [
            {
                skill: {
                    _id: "432556",
                    skill: "Oxygen tank trained"
                }   
            },
            {
                skill: {
                    _id: "4325223",
                    skill: "Stretcher trained"
                }   
            }
        ],
        stationed_at: {
            name: "East Colchester",
            address: {
                street: "300 Random Street",
                town: "Colchester",
                county: "Essex",
                postcode: "CO2"
            }
        },
        available: true
    }
]
```

#### api/personnel/:id (GET)

Returns an employee.

##### Request

No body is needed. The id is put within the URL.

URL

```
localhost:5000/api/personnel/334452222256
```

##### Response

Body

```JSON
{
    _id: "334452222256",
    first_name: "Forename",
    last_name: "Surname",
    staff_number: 1234455,
    shifts: [
        {
            start_time: "09:00:00",
            finish_time: "17:00:00",
            day: "Monday"
        },
        {
            start_time: "09:00:00",
            finish_time: "17:00:00",
            day: "Tuesday"
        },
        {
            start_time: "09:00:00",
            finish_time: "17:00:00",
            day: "Wednesday"
        },
    ],
    unavailable: [],
    skills: [
        {
            skill: {
                _id: "432556",
                skill: "Oxygen tank trained"
            }   
        },
        {
            skill: {
                _id: "4325223",
                skill: "Stretcher trained"
            }   
        }
    ],
    stationed_at: {
        name: "East Colchester",
        address: {
            street: "300 Random Street",
            town: "Colchester",
            county: "Essex",
            postcode: "CO2"
        }
    },
    available: true
}
```

#### api/personnel/:id (PUT)

Updates an employees data. An updated array of the employees is returned.

##### Request

The id is put into the URL and the updated employee model is put in the requests body.

URL

```
localhost:5000/api/personnel/334452222256
```

Body

```JSON
{
    _id: "334452222256",
    first_name: "Forename",
    last_name: "Surname",
    staff_number: 1234455,
    shifts: [
        {
            start_time: "09:00:00",
            finish_time: "17:00:00",
            day: "Monday"
        },
        {
            start_time: "09:00:00",
            finish_time: "17:00:00",
            day: "Tuesday"
        },
        {
            start_time: "09:00:00",
            finish_time: "17:00:00",
            day: "Wednesday"
        },
        {
            start_time: "09:00:00",
            finish_time: "17:00:00",
            day: "Friday"
        },
    ],
    unavailable: [],
    skills: [
        {
            skill: {
                _id: "432556",
                skill: "Oxygen tank trained"
            }   
        },
        {
            skill: {
                _id: "4325223",
                skill: "Stretcher trained"
            }   
        }
    ],
    stationed_at: {
        name: "East Colchester",
        address: {
            street: "300 Random Street",
            town: "Colchester",
            county: "Essex",
            postcode: "CO2"
        }
    },
    available: true
}
```

##### Response

Body

```JSON
[
    {
        _id: "334452222187",
        first_name: "Forename",
        last_name: "Surname",
        staff_number: 1234444,
        shifts: [
            {
                start_time: "09:00:00",
                finish_time: "17:00:00",
                day: "Monday"
            },
            {
                start_time: "09:00:00",
                finish_time: "17:00:00",
                day: "Tuesday"
            },
            {
                start_time: "09:00:00",
                finish_time: "17:00:00",
                day: "Wednesday"
            },
        ],
        unavailable: [
            {
                date: "Mon, 20 Apr 2020 00:00:00 GMT",
                note: "Holiday"
            }
        ],
        skills: [
            {
                skill: {
                    _id: "432556",
                    skill: "Oxygen tank trained"
                }   
            }
        ],
        stationed_at: {
            name: "East Colchester",
            address: {
                street: "300 Random Street",
                town: "Colchester",
                county: "Essex",
                postcode: "CO2"
            }
        },
        available: true
    },
    {
        _id: "334452222256",
        first_name: "Forename",
        last_name: "Surname",
        staff_number: 1234455,
        shifts: [
            {
                start_time: "09:00:00",
                finish_time: "17:00:00",
                day: "Monday"
            },
            {
                start_time: "09:00:00",
                finish_time: "17:00:00",
                day: "Tuesday"
            },
            {
                start_time: "09:00:00",
                finish_time: "17:00:00",
                day: "Wednesday"
            },
            {
                start_time: "09:00:00",
                finish_time: "17:00:00",
                day: "Friday"
            },
        ],
        unavailable: [],
        skills: [
            {
                skill: {
                    _id: "432556",
                    skill: "Oxygen tank trained"
                }   
            },
            {
                skill: {
                    _id: "4325223",
                    skill: "Stretcher trained"
                }   
            }
        ],
        stationed_at: {
            name: "East Colchester",
            address: {
                street: "300 Random Street",
                town: "Colchester",
                county: "Essex",
                postcode: "CO2"
            }
        },
        available: true
    }
]
```

#### api/personnel (POST)

Adds an employee to the database. An updated array of the employees is returned.

##### Request

The new employees model is in the body of the request.

Body

```JSON
{
    _id: "334452227355",
    first_name: "Forename",
    last_name: "Surname",
    staff_number: 12341937,
    shifts: [
        {
            start_time: "09:00:00",
            finish_time: "17:00:00",
            day: "Monday"
        },
        {
            start_time: "09:00:00",
            finish_time: "17:00:00",
            day: "Thursday"
        },
        {
            start_time: "09:00:00",
            finish_time: "17:00:00",
            day: "Friday"
        },
    ],
    unavailable: [],
    skills: [
        {
            skill: {
                _id: "4325223",
                skill: "Stretcher trained"
            }   
        }
    ],
    stationed_at: {
        name: "East Colchester",
        address: {
            street: "300 Random Street",
            town: "Colchester",
            county: "Essex",
            postcode: "CO2"
        }
    },
    available: false
}
```

##### Response

Body

```JSON
[
    {
        _id: "334452222187",
        first_name: "Forename",
        last_name: "Surname",
        staff_number: 1234444,
        shifts: [
            {
                start_time: "09:00:00",
                finish_time: "17:00:00",
                day: "Monday"
            },
            {
                start_time: "09:00:00",
                finish_time: "17:00:00",
                day: "Tuesday"
            },
            {
                start_time: "09:00:00",
                finish_time: "17:00:00",
                day: "Wednesday"
            },
        ],
        unavailable: [
            {
                date: "Mon, 20 Apr 2020 00:00:00 GMT",
                note: "Holiday"
            }
        ],
        skills: [
            {
                skill: {
                    _id: "432556",
                    skill: "Oxygen tank trained"
                }   
            }
        ],
        stationed_at: {
            name: "East Colchester",
            address: {
                street: "300 Random Street",
                town: "Colchester",
                county: "Essex",
                postcode: "CO2"
            }
        },
        available: true
    },
    {
        _id: "334452222256",
        first_name: "Forename",
        last_name: "Surname",
        staff_number: 1234455,
        shifts: [
            {
                start_time: "09:00:00",
                finish_time: "17:00:00",
                day: "Monday"
            },
            {
                start_time: "09:00:00",
                finish_time: "17:00:00",
                day: "Tuesday"
            },
            {
                start_time: "09:00:00",
                finish_time: "17:00:00",
                day: "Wednesday"
            },
            {
                start_time: "09:00:00",
                finish_time: "17:00:00",
                day: "Friday"
            },
        ],
        unavailable: [],
        skills: [
            {
                skill: {
                    _id: "432556",
                    skill: "Oxygen tank trained"
                }   
            },
            {
                skill: {
                    _id: "4325223",
                    skill: "Stretcher trained"
                }   
            }
        ],
        stationed_at: {
            name: "East Colchester",
            address: {
                street: "300 Random Street",
                town: "Colchester",
                county: "Essex",
                postcode: "CO2"
            }
        },
        available: true
    },
    {
        _id: "334452227355",
        first_name: "Forename",
        last_name: "Surname",
        staff_number: 12341937,
        shifts: [
            {
                start_time: "09:00:00",
                finish_time: "17:00:00",
                day: "Monday"
            },
            {
                start_time: "09:00:00",
                finish_time: "17:00:00",
                day: "Thursday"
            },
            {
                start_time: "09:00:00",
                finish_time: "17:00:00",
                day: "Friday"
            },
        ],
        unavailable: [],
        skills: [
            {
                skill: {
                    _id: "4325223",
                    skill: "Stretcher trained"
                }   
            }
        ],
        stationed_at: {
            name: "East Colchester",
            address: {
                street: "300 Random Street",
                town: "Colchester",
                county: "Essex",
                postcode: "CO2"
            }
        },
        available: false
    }
]
```

#### api/personnel/:id (DELETE)

Deletes an employee from the database.The id for the employee will still remain. This is so logs attached to the employee will not become corrupted. All of the employees personal data will still be deleted. An updated array of patients is returned.

##### Request

The body is not required, ony the id within the URL

URL

```
localhost:5000/api/personnel/334452222187
```

##### Response

Body

```JSON
[
    {
        _id: "334452222187"
    },
    {
        _id: "334452222256",
        first_name: "Forename",
        last_name: "Surname",
        staff_number: 1234455,
        shifts: [
            {
                start_time: "09:00:00",
                finish_time: "17:00:00",
                day: "Monday"
            },
            {
                start_time: "09:00:00",
                finish_time: "17:00:00",
                day: "Tuesday"
            },
            {
                start_time: "09:00:00",
                finish_time: "17:00:00",
                day: "Wednesday"
            },
            {
                start_time: "09:00:00",
                finish_time: "17:00:00",
                day: "Friday"
            },
        ],
        unavailable: [],
        skills: [
            {
                skill: {
                    _id: "432556",
                    skill: "Oxygen tank trained"
                }   
            },
            {
                skill: {
                    _id: "4325223",
                    skill: "Stretcher trained"
                }   
            }
        ],
        stationed_at: {
            name: "East Colchester",
            address: {
                street: "300 Random Street",
                town: "Colchester",
                county: "Essex",
                postcode: "CO2"
            }
        },
        available: true
    },
    {
        _id: "334452227355",
        first_name: "Forename",
        last_name: "Surname",
        staff_number: 12341937,
        shifts: [
            {
                start_time: "09:00:00",
                finish_time: "17:00:00",
                day: "Monday"
            },
            {
                start_time: "09:00:00",
                finish_time: "17:00:00",
                day: "Thursday"
            },
            {
                start_time: "09:00:00",
                finish_time: "17:00:00",
                day: "Friday"
            },
        ],
        unavailable: [],
        skills: [
            {
                skill: {
                    _id: "4325223",
                    skill: "Stretcher trained"
                }   
            }
        ],
        stationed_at: {
            name: "East Colchester",
            address: {
                street: "300 Random Street",
                town: "Colchester",
                county: "Essex",
                postcode: "CO2"
            }
        },
        available: false
    }
]
```

## Schedule

This route retreives and updates schedule data.

### Endpoints

| Description | Method | Endpoint | Access |
|-------------|--------|----------|--------|
Get all schedules data. | GET | [api/schedule](#apischedule-get) | Private
Get a schedules data. | GET | [api/schedule/:id](#apischeduleid-get) | Private
Update a schedules data. | PUT | [api/schedule/:id](#apischeduleid-put) | Private
Add a schedule to the database. | POST | [api/schedule](#apischedule-post) | Private
Delete a schedule from the database | DELETE | [api/schedule/:id](#apischeduleid-delete) | Private
Get all data for the scheduling app on a certain date | GET | [api/schedule/app/:date](#apischeduleappdate-get) | Private
Submit the schedules to the database | POST | [api/schedule/app/submit](#apischeduleappsubmit-post) | Private

#### api/schedule (GET)

Returns all schedules in the database in an array.

##### Request

No body is needed.

##### Response

Body

```JSON
[
    {   
        _id: "7763452988",
        vehicle: {
            reg_num:  "TN12 8HQ",
            available: true,
            stationed_at: {
                name:  "East Colchester",
                address: {
                    street: "300 Random Street",
                    town: "Colchester",
                    county: "Essex",
                    postcode: "CO2"
                }
            },
            type: {
                name:  "Estate vehicle",
                code: "EV",
                crew_size: 2
            }
        },
        date: "21/04/2020",
        staff: [
            {
                _id: "334452222256",
                first_name: "Forename",
                last_name: "Surname",
                staff_number: 1234455,
                shifts: [
                    {
                        start_time: "09:00:00",
                        finish_time: "17:00:00",
                        day: "Monday"
                    },
                    {
                        start_time: "09:00:00",
                        finish_time: "17:00:00",
                        day: "Tuesday"
                    },
                    {
                        start_time: "09:00:00",
                        finish_time: "17:00:00",
                        day: "Wednesday"
                    },
                    {
                        start_time: "09:00:00",
                        finish_time: "17:00:00",
                        day: "Friday"
                    },
                ],
                unavailable: [],
                skills: [
                    {
                        skill: {
                            _id: "432556",
                            skill: "Oxygen tank trained"
                        }   
                    },
                    {
                        skill: {
                            _id: "4325223",
                            skill: "Stretcher trained"
                        }   
                    }
                ],
                stationed_at: {
                    name: "East Colchester",
                    address: {
                        street: "300 Random Street",
                        town: "Colchester",
                        county: "Essex",
                        postcode: "CO2"
                    }
                },
                available: true
            }
        ],
        trips: [
            {
                reason: "Appointment",
                to_address: "Colchester hospital, Colchester, Essex",
                from_address: "Carehome, Colchester, Essex",
                date: "21/04/2020",
                time: "10:00:00",
                return: true,
                return_time: "11:00:00",
                patient: {
                    first_name: "Forename",
                    last_name: "Surname",
                    nhs_number: "3334452",
                    address: {
                        street: "Carehome",
                        town: "Colchester",
                        county: "Essex",
                        postcode: "CO3"
                    }
                },
                estimated_journey_time: {
                    text: "12 Minutes",
                    value: 725
                },
                equipment: [
                    {
                        equipment: {
                            name: "Oxygen tank"
                        }   
                    }
                ],
                requirements: [
                    {
                        requirement: {
                            name: "Oxygen tank"
                        }
                    }
                ],
                notes: "Patient struggles breathing"
            }
        ],
        start_time: "09:30:00",
        finish_time: "11:42:00"
    }
]
```

#### api/schedule/:id (GET)

Returns a schedule.

##### Request

No body is needed. The id is put within the URL.

URL

```
localhost:5000/api/schedule/7763452988
```

##### Response

Body

```JSON
{   
    _id: "7763452988",
    vehicle: {
        reg_num:  "TN12 8HQ",
        available: true,
        stationed_at: {
            name:  "East Colchester",
            address: {
                street: "300 Random Street",
                town: "Colchester",
                county: "Essex",
                postcode: "CO2"
            }
        },
        type: {
            name:  "Estate vehicle",
            code: "EV",
            crew_size: 2
        }
    },
    date: "21/04/2020",
    staff: [
        {
            _id: "334452222256",
            first_name: "Forename",
            last_name: "Surname",
            staff_number: 1234455,
            shifts: [
                {
                    start_time: "09:00:00",
                    finish_time: "17:00:00",
                    day: "Monday"
                },
                {
                    start_time: "09:00:00",
                    finish_time: "17:00:00",
                    day: "Tuesday"
                },
                {
                    start_time: "09:00:00",
                    finish_time: "17:00:00",
                    day: "Wednesday"
                },
                {
                    start_time: "09:00:00",
                    finish_time: "17:00:00",
                    day: "Friday"
                },
            ],
            unavailable: [],
            skills: [
                {
                    skill: {
                        _id: "432556",
                        skill: "Oxygen tank trained"
                    }   
                },
                {
                    skill: {
                        _id: "4325223",
                        skill: "Stretcher trained"
                    }   
                }
            ],
            stationed_at: {
                name: "East Colchester",
                address: {
                    street: "300 Random Street",
                    town: "Colchester",
                    county: "Essex",
                    postcode: "CO2"
                }
            },
            available: true
        }
    ],
    trips: [
        {
            reason: "Appointment",
            to_address: "Colchester hospital, Colchester, Essex",
            from_address: "Carehome, Colchester, Essex",
            date: "21/04/2020",
            time: "10:00:00",
            return: true,
            return_time: "11:00:00",
            patient: {
                first_name: "Forename",
                last_name: "Surname",
                nhs_number: "3334452",
                address: {
                    street: "Carehome",
                    town: "Colchester",
                    county: "Essex",
                    postcode: "CO3"
                }
            },
            estimated_journey_time: {
                text: "12 Minutes",
                value: 725
            },
            equipment: [
                {
                    equipment: {
                        name: "Oxygen tank"
                    }   
                }
            ],
            requirements: [
                {
                    requirement: {
                        name: "Oxygen tank"
                    }
                }
            ],
            notes: "Patient struggles breathing"
        }
    ],
    start_time: "09:30:00",
    finish_time: "11:42:00"
}
```

#### api/schedule/:id (PUT)

Updates a schedules data. An updated array of the schedules is returned.

##### Request

The id is put into the URL and the updated schedule model is put in the requests body.

URL

```
localhost:5000/api/schedule/7763452988
```

Body

```JSON
{   
    _id: "7763452988",
    vehicle: {
        reg_num:  "HG98 8HQ",
        available: true,
        stationed_at: {
            name:  "East Colchester",
            address: {
                street: "300 Random Street",
                town: "Colchester",
                county: "Essex",
                postcode: "CO2"
            }
        },
        type: {
            name:  "Estate vehicle",
            code: "EV",
            crew_size: 2
        }
    },
    date: "21/04/2020",
    staff: [
        {
            _id: "334452222256",
            first_name: "Forename",
            last_name: "Surname",
            staff_number: 1234455,
            shifts: [
                {
                    start_time: "09:00:00",
                    finish_time: "17:00:00",
                    day: "Monday"
                },
                {
                    start_time: "09:00:00",
                    finish_time: "17:00:00",
                    day: "Tuesday"
                },
                {
                    start_time: "09:00:00",
                    finish_time: "17:00:00",
                    day: "Wednesday"
                },
                {
                    start_time: "09:00:00",
                    finish_time: "17:00:00",
                    day: "Friday"
                },
            ],
            unavailable: [],
            skills: [
                {
                    skill: {
                        _id: "432556",
                        skill: "Oxygen tank trained"
                    }   
                },
                {
                    skill: {
                        _id: "4325223",
                        skill: "Stretcher trained"
                    }   
                }
            ],
            stationed_at: {
                name: "East Colchester",
                address: {
                    street: "300 Random Street",
                    town: "Colchester",
                    county: "Essex",
                    postcode: "CO2"
                }
            },
            available: true
        }
    ],
    trips: [
        {
            reason: "Appointment",
            to_address: "Colchester hospital, Colchester, Essex",
            from_address: "Carehome, Colchester, Essex",
            date: "21/04/2020",
            time: "10:00:00",
            return: true,
            return_time: "11:00:00",
            patient: {
                first_name: "Forename",
                last_name: "Surname",
                nhs_number: "3334452",
                address: {
                    street: "Carehome",
                    town: "Colchester",
                    county: "Essex",
                    postcode: "CO3"
                }
            },
            estimated_journey_time: {
                text: "12 Minutes",
                value: 725
            },
            equipment: [
                {
                    equipment: {
                        name: "Oxygen tank"
                    }   
                }
            ],
            requirements: [
                {
                    requirement: {
                        name: "Oxygen tank"
                    }
                }
            ],
            notes: "Patient struggles breathing"
        }
    ],
    start_time: "09:30:00",
    finish_time: "11:42:00"
}
```

##### Response

Body

```JSON
[
    {   
        _id: "7763452988",
        vehicle: {
            reg_num:  "HG98 8HQ",
            available: true,
            stationed_at: {
                name:  "East Colchester",
                address: {
                    street: "300 Random Street",
                    town: "Colchester",
                    county: "Essex",
                    postcode: "CO2"
                }
            },
            type: {
                name:  "Estate vehicle",
                code: "EV",
                crew_size: 2
            }
        },
        date: "21/04/2020",
        staff: [
            {
                _id: "334452222256",
                first_name: "Forename",
                last_name: "Surname",
                staff_number: 1234455,
                shifts: [
                    {
                        start_time: "09:00:00",
                        finish_time: "17:00:00",
                        day: "Monday"
                    },
                    {
                        start_time: "09:00:00",
                        finish_time: "17:00:00",
                        day: "Tuesday"
                    },
                    {
                        start_time: "09:00:00",
                        finish_time: "17:00:00",
                        day: "Wednesday"
                    },
                    {
                        start_time: "09:00:00",
                        finish_time: "17:00:00",
                        day: "Friday"
                    },
                ],
                unavailable: [],
                skills: [
                    {
                        skill: {
                            _id: "432556",
                            skill: "Oxygen tank trained"
                        }   
                    },
                    {
                        skill: {
                            _id: "4325223",
                            skill: "Stretcher trained"
                        }   
                    }
                ],
                stationed_at: {
                    name: "East Colchester",
                    address: {
                        street: "300 Random Street",
                        town: "Colchester",
                        county: "Essex",
                        postcode: "CO2"
                    }
                },
                available: true
            }
        ],
        trips: [
            {
                reason: "Appointment",
                to_address: "Colchester hospital, Colchester, Essex",
                from_address: "Carehome, Colchester, Essex",
                date: "21/04/2020",
                time: "10:00:00",
                return: true,
                return_time: "11:00:00",
                patient: {
                    first_name: "Forename",
                    last_name: "Surname",
                    nhs_number: "3334452",
                    address: {
                        street: "Carehome",
                        town: "Colchester",
                        county: "Essex",
                        postcode: "CO3"
                    }
                },
                estimated_journey_time: {
                    text: "12 Minutes",
                    value: 725
                },
                equipment: [
                    {
                        equipment: {
                            name: "Oxygen tank"
                        }   
                    }
                ],
                requirements: [
                    {
                        requirement: {
                            name: "Oxygen tank"
                        }
                    }
                ],
                notes: "Patient struggles breathing"
            }
        ],
        start_time: "09:30:00",
        finish_time: "11:42:00"
    }
]
```

#### api/schedule (POST)

Adds a schedule to the database. An updated array of the schedules is returned.

##### Request

The new schedules model is in the body of the request.

Body

```JSON
{
    vehicle: {
        reg_num:  "HG98 8HQ",
        available: true,
        stationed_at: {
            name:  "East Colchester",
            address: {
                street: "300 Random Street",
                town: "Colchester",
                county: "Essex",
                postcode: "CO2"
            }
        },
        type: {
            name:  "Estate vehicle",
            code: "EV",
            crew_size: 2
        }
    },
    date: "22/04/2020",
    staff: [
        {
            _id: "334452222256",
            first_name: "Forename",
            last_name: "Surname",
            staff_number: 1234455,
            shifts: [
                {
                    start_time: "09:00:00",
                    finish_time: "17:00:00",
                    day: "Monday"
                },
                {
                    start_time: "09:00:00",
                    finish_time: "17:00:00",
                    day: "Tuesday"
                },
                {
                    start_time: "09:00:00",
                    finish_time: "17:00:00",
                    day: "Wednesday"
                },
                {
                    start_time: "09:00:00",
                    finish_time: "17:00:00",
                    day: "Friday"
                },
            ],
            unavailable: [],
            skills: [
                {
                    skill: {
                        _id: "432556",
                        skill: "Oxygen tank trained"
                    }   
                },
                {
                    skill: {
                        _id: "4325223",
                        skill: "Stretcher trained"
                    }   
                }
            ],
            stationed_at: {
                name: "East Colchester",
                address: {
                    street: "300 Random Street",
                    town: "Colchester",
                    county: "Essex",
                    postcode: "CO2"
                }
            },
            available: true
        }
    ],
    trips: [
        {
            reason: "Transfer",
            to_address: "Colchester hospital, Colchester, Essex",
            from_address: "Chelmsford hospital, Chelsmford, Essex",
            date: "22/04/2020",
            time: "10:00:00",
            return: true,
            return_time: "11:00:00",
            patient: {
                first_name: "Forename",
                last_name: "Surname",
                nhs_number: "3334452",
                address: {
                    street: "Carehome",
                    town: "Colchester",
                    county: "Essex",
                    postcode: "CO3"
                }
            },
            estimated_journey_time: {
                text: "40 Minutes",
                value: 2400
            },
            equipment: [
                {
                    equipment: {
                        name: "Oxygen tank"
                    }   
                }
            ],
            requirements: [
                {
                    requirement: {
                        name: "Oxygen tank"
                    }
                }
            ],
            notes: ""
        }
    ],
    start_time: "09:30:00",
    finish_time: "11:42:00"
}
```

##### Response

Body

```JSON
[
    {   
        _id: "7763452988",
        vehicle: {
            reg_num:  "HG98 8HQ",
            available: true,
            stationed_at: {
                name:  "East Colchester",
                address: {
                    street: "300 Random Street",
                    town: "Colchester",
                    county: "Essex",
                    postcode: "CO2"
                }
            },
            type: {
                name:  "Estate vehicle",
                code: "EV",
                crew_size: 2
            }
        },
        date: "21/04/2020",
        staff: [
            {
                _id: "334452222256",
                first_name: "Forename",
                last_name: "Surname",
                staff_number: 1234455,
                shifts: [
                    {
                        start_time: "09:00:00",
                        finish_time: "17:00:00",
                        day: "Monday"
                    },
                    {
                        start_time: "09:00:00",
                        finish_time: "17:00:00",
                        day: "Tuesday"
                    },
                    {
                        start_time: "09:00:00",
                        finish_time: "17:00:00",
                        day: "Wednesday"
                    },
                    {
                        start_time: "09:00:00",
                        finish_time: "17:00:00",
                        day: "Friday"
                    },
                ],
                unavailable: [],
                skills: [
                    {
                        skill: {
                            _id: "432556",
                            skill: "Oxygen tank trained"
                        }   
                    },
                    {
                        skill: {
                            _id: "4325223",
                            skill: "Stretcher trained"
                        }   
                    }
                ],
                stationed_at: {
                    name: "East Colchester",
                    address: {
                        street: "300 Random Street",
                        town: "Colchester",
                        county: "Essex",
                        postcode: "CO2"
                    }
                },
                available: true
            }
        ],
        trips: [
            {
                reason: "Appointment",
                to_address: "Colchester hospital, Colchester, Essex",
                from_address: "Carehome, Colchester, Essex",
                date: "21/04/2020",
                time: "10:00:00",
                return: true,
                return_time: "11:00:00",
                patient: {
                    first_name: "Forename",
                    last_name: "Surname",
                    nhs_number: "3334452",
                    address: {
                        street: "Carehome",
                        town: "Colchester",
                        county: "Essex",
                        postcode: "CO3"
                    }
                },
                estimated_journey_time: {
                    text: "12 Minutes",
                    value: 725
                },
                equipment: [
                    {
                        equipment: {
                            name: "Oxygen tank"
                        }   
                    }
                ],
                requirements: [
                    {
                        requirement: {
                            name: "Oxygen tank"
                        }
                    }
                ],
                notes: "Patient struggles breathing"
            }
        ],
        start_time: "09:30:00",
        finish_time: "11:42:00"
    },
    {
        _id: "862234911",
        vehicle: {
            reg_num:  "HG98 8HQ",
            available: true,
            stationed_at: {
                name:  "East Colchester",
                address: {
                    street: "300 Random Street",
                    town: "Colchester",
                    county: "Essex",
                    postcode: "CO2"
                }
            },
            type: {
                name:  "Estate vehicle",
                code: "EV",
                crew_size: 2
            }
        },
        date: "22/04/2020",
        staff: [
            {
                _id: "334452222256",
                first_name: "Forename",
                last_name: "Surname",
                staff_number: 1234455,
                shifts: [
                    {
                        start_time: "09:00:00",
                        finish_time: "17:00:00",
                        day: "Monday"
                    },
                    {
                        start_time: "09:00:00",
                        finish_time: "17:00:00",
                        day: "Tuesday"
                    },
                    {
                        start_time: "09:00:00",
                        finish_time: "17:00:00",
                        day: "Wednesday"
                    },
                    {
                        start_time: "09:00:00",
                        finish_time: "17:00:00",
                        day: "Friday"
                    },
                ],
                unavailable: [],
                skills: [
                    {
                        skill: {
                            _id: "432556",
                            skill: "Oxygen tank trained"
                        }   
                    },
                    {
                        skill: {
                            _id: "4325223",
                            skill: "Stretcher trained"
                        }   
                    }
                ],
                stationed_at: {
                    name: "East Colchester",
                    address: {
                        street: "300 Random Street",
                        town: "Colchester",
                        county: "Essex",
                        postcode: "CO2"
                    }
                },
                available: true
            }
        ],
        trips: [
            {
                reason: "Transfer",
                to_address: "Colchester hospital, Colchester, Essex",
                from_address: "Chelmsford hospital, Chelsmford, Essex",
                date: "22/04/2020",
                time: "10:00:00",
                return: true,
                return_time: "11:00:00",
                patient: {
                    first_name: "Forename",
                    last_name: "Surname",
                    nhs_number: "3334452",
                    address: {
                        street: "Carehome",
                        town: "Colchester",
                        county: "Essex",
                        postcode: "CO3"
                    }
                },
                estimated_journey_time: {
                    text: "40 Minutes",
                    value: 2400
                },
                equipment: [
                    {
                        equipment: {
                            name: "Oxygen tank"
                        }   
                    }
                ],
                requirements: [
                    {
                        requirement: {
                            name: "Oxygen tank"
                        }
                    }
                ],
                notes: ""
            }
        ],
        start_time: "09:30:00",
        finish_time: "11:42:00"
    }
]
```

#### api/schedule/:id (DELETE)

Deletes a schedule from the database.The id for the schedule will still remain. This is so logs attached to the schedule will not become corrupted. All of the schedules data will still be deleted. An updated array of schedules is returned.

##### Request

The body is not required, ony the id within the URL

URL

```
localhost:5000/api/personnel/862234911
```

##### Response

Body

```JSON
[
    {   
        _id: "7763452988",
        vehicle: {
            _id: "98223351",
            reg_num:  "HG98 8HQ",
            available: true,
            stationed_at: {
                name:  "East Colchester",
                address: {
                    street: "300 Random Street",
                    town: "Colchester",
                    county: "Essex",
                    postcode: "CO2"
                }
            },
            type: {
                name:  "Estate vehicle",
                code: "EV",
                crew_size: 2
            }
        },
        date: "21/04/2020",
        staff: [
            {
                _id: "334452222256",
                first_name: "Forename",
                last_name: "Surname",
                staff_number: 1234455,
                shifts: [
                    {
                        start_time: "09:00:00",
                        finish_time: "17:00:00",
                        day: "Monday"
                    },
                    {
                        start_time: "09:00:00",
                        finish_time: "17:00:00",
                        day: "Tuesday"
                    },
                    {
                        start_time: "09:00:00",
                        finish_time: "17:00:00",
                        day: "Wednesday"
                    },
                    {
                        start_time: "09:00:00",
                        finish_time: "17:00:00",
                        day: "Friday"
                    },
                ],
                unavailable: [],
                skills: [
                    {
                        skill: {
                            _id: "432556",
                            skill: "Oxygen tank trained"
                        }   
                    },
                    {
                        skill: {
                            _id: "4325223",
                            skill: "Stretcher trained"
                        }   
                    }
                ],
                stationed_at: {
                    name: "East Colchester",
                    address: {
                        street: "300 Random Street",
                        town: "Colchester",
                        county: "Essex",
                        postcode: "CO2"
                    }
                },
                available: true
            }
        ],
        trips: [
            {
                _id: "8722345",
                reason: "Appointment",
                to_address: "Colchester hospital, Colchester, Essex",
                from_address: "Carehome, Colchester, Essex",
                date: "21/04/2020",
                time: "10:00:00",
                return: true,
                return_time: "11:00:00",
                patient: {
                    first_name: "Forename",
                    last_name: "Surname",
                    nhs_number: "3334452",
                    address: {
                        street: "Carehome",
                        town: "Colchester",
                        county: "Essex",
                        postcode: "CO3"
                    }
                },
                estimated_journey_time: {
                    text: "12 Minutes",
                    value: 725
                },
                equipment: [
                    {
                        equipment: {
                            name: "Oxygen tank"
                        }   
                    }
                ],
                requirements: [
                    {
                        requirement: {
                            name: "Oxygen tank"
                        }
                    }
                ],
                notes: "Patient struggles breathing"
            }
        ],
        start_time: "09:30:00",
        finish_time: "11:42:00"
    },
    {
        _id: "862234911"
    }
]
```
#### api/schedule/app/:date (GET)

Returns the formatted data for the scheduling app.

##### Request

Only the date in the URL is needed.

```
localhost:5000/api/schedule/app/21-04-2020
```

##### Response

```JSON
{
    trips: {
        "8722345": {
            _id: "8722345",
            reason: "Appointment",
            to_address: "Colchester hospital, Colchester, Essex",
            from_address: "Carehome, Colchester, Essex",
            date: "21/04/2020",
            time: "10:00:00",
            return: true,
            return_time: "11:00:00",
            patient: {
                first_name: "Forename",
                last_name: "Surname",
                nhs_number: "3334452",
                address: {
                    street: "Carehome",
                    town: "Colchester",
                    county: "Essex",
                    postcode: "CO3"
                }
            },
            estimated_journey_time: {
                text: "12 Minutes",
                value: 725
            },
            equipment: [
                {
                    equipment: {
                        name: "Oxygen tank"
                    }   
                }
            ],
            requirements: [
                {
                    requirement: {
                        name: "Oxygen tank"
                    }
                }
            ],
            notes: "Patient struggles breathing"
        }
    },
    vehicles: {
        "98223351": {
            _id: "98223351",
            reg_num:  "HG98 8HQ",
            available: true,
            stationed_at: {
                name:  "East Colchester",
                address: {
                    street: "300 Random Street",
                    town: "Colchester",
                    county: "Essex",
                    postcode: "CO2"
                }
            },
            type: {
                name:  "Estate vehicle",
                code: "EV",
                crew_size: 2
            }
        }
    },
    employees: {
        "334452222256": {
            _id: "334452222256",
            first_name: "Forename",
            last_name: "Surname",
            staff_number: 1234455,
            shifts: [
                {
                    start_time: "09:00:00",
                    finish_time: "17:00:00",
                    day: "Monday"
                },
                {
                    start_time: "09:00:00",
                    finish_time: "17:00:00",
                    day: "Tuesday"
                },
                {
                    start_time: "09:00:00",
                    finish_time: "17:00:00",
                    day: "Wednesday"
                },
                {
                    start_time: "09:00:00",
                    finish_time: "17:00:00",
                    day: "Friday"
                },
            ],
            unavailable: [],
            skills: [
                {
                    skill: {
                        _id: "432556",
                        skill: "Oxygen tank trained"
                    }   
                },
                {
                    skill: {
                        _id: "4325223",
                        skill: "Stretcher trained"
                    }   
                }
            ],
            stationed_at: {
                name: "East Colchester",
                address: {
                    street: "300 Random Street",
                    town: "Colchester",
                    county: "Essex",
                    postcode: "CO2"
                }
            },
            available: true
        }
    },
    schedules: {},
    scheduleOrder: [],
    backlog: {
        trips: ["8722345"]
    }
}
```

#### api/schedule/app/submit (POST)

Submits the schedules to the database. And returns any errors if they occur. The schedules can be new or existing ones.

##### Request

The body contains the schedules.

```JSON
[
    {   
        _id: "7763452988",
        vehicle: {
            _id: "98223351",
            reg_num:  "HG98 8HQ",
            available: true,
            stationed_at: {
                name:  "East Colchester",
                address: {
                    street: "300 Random Street",
                    town: "Colchester",
                    county: "Essex",
                    postcode: "CO2"
                }
            },
            type: {
                name:  "Estate vehicle",
                code: "EV",
                crew_size: 2
            }
        },
        date: "21/04/2020",
        staff: [
            {
                _id: "334452222256",
                first_name: "Forename",
                last_name: "Surname",
                staff_number: 1234455,
                shifts: [
                    {
                        start_time: "09:00:00",
                        finish_time: "17:00:00",
                        day: "Monday"
                    },
                    {
                        start_time: "09:00:00",
                        finish_time: "17:00:00",
                        day: "Tuesday"
                    },
                    {
                        start_time: "09:00:00",
                        finish_time: "17:00:00",
                        day: "Wednesday"
                    },
                    {
                        start_time: "09:00:00",
                        finish_time: "17:00:00",
                        day: "Friday"
                    },
                ],
                unavailable: [],
                skills: [
                    {
                        skill: {
                            _id: "432556",
                            skill: "Oxygen tank trained"
                        }   
                    },
                    {
                        skill: {
                            _id: "4325223",
                            skill: "Stretcher trained"
                        }   
                    }
                ],
                stationed_at: {
                    name: "East Colchester",
                    address: {
                        street: "300 Random Street",
                        town: "Colchester",
                        county: "Essex",
                        postcode: "CO2"
                    }
                },
                available: true
            }
        ],
        trips: [
            {
                _id: "8722345",
                reason: "Appointment",
                to_address: "Colchester hospital, Colchester, Essex",
                from_address: "Carehome, Colchester, Essex",
                date: "21/04/2020",
                time: "10:00:00",
                return: true,
                return_time: "11:00:00",
                patient: {
                    first_name: "Forename",
                    last_name: "Surname",
                    nhs_number: "3334452",
                    address: {
                        street: "Carehome",
                        town: "Colchester",
                        county: "Essex",
                        postcode: "CO3"
                    }
                },
                estimated_journey_time: {
                    text: "12 Minutes",
                    value: 725
                },
                equipment: [
                    {
                        equipment: {
                            name: "Oxygen tank"
                        }   
                    }
                ],
                requirements: [
                    {
                        requirement: {
                            name: "Oxygen tank"
                        }
                    }
                ],
                notes: "Patient struggles breathing"
            }
        ],
        start_time: "09:30:00",
        finish_time: "11:42:00"
    }
]
```

##### Response

If the schedules are saved without any errors then the following response is given:

Body

```JSON
{
    status: "OK"
}
```

However, if an error occurs then the followng response is given:

Body

```JSON
{
    status: "ERROR",
    errors: [
        {
            vehicle: "987223544",
            error: "Schedule is missing a staff member"
        }
    ]
}
```

## Skill

This route retreives and updates skill data.

### Endpoints

| Description | Method | Endpoint | Access |
|-------------|--------|----------|--------|
Get all skills data. | GET | [api/skill](#apiskill-get) | Private
Add a skill to the database. | POST | [api/skill](#apiskill-post) | Private
Delete a skill. | DELETE | [api/schedule/:id](#apiskillid-delete) | Private

#### api/skill (GET)

Get all the skills in the database.

##### Request

No body is needed in the request.

##### Response

```JSON
[
    {   
        _id: "52332754",
        skill: "Stretcher trained"
    },
    {
        _id: "53322184",
        skill: "Wheelchair trained"
    },
    {
        _id: "21732754",
        skill: "Oxygen tank trained"
    }
]
```

#### api/skill (POST)

Adds a new skill to the database. An updated array of the skills is returned.

##### Request

The new skill is in the requests body.

Body

```JSON
{
    skill: "Mental health support trained"
}
```

##### Response

Body

```JSON
[
    {   
        _id: "52332754",
        skill: "Stretcher trained"
    },
    {
        _id: "53322184",
        skill: "Wheelchair trained"
    },
    {
        _id: "21732754",
        skill: "Oxygen tank trained"
    },
    {
        _id: "81276334",
        skill: "Mental health support trained"
    }
]
```

#### api/skill/:id (DELETE)

Deletes a skill from the database. An updated array of the skills is returned.

##### Request

The id for the skill is put within the URL.

```
localhost:5000/api/skill/53322184
```

##### Response

Body

```JSON
[
    {   
        _id: "52332754",
        skill: "Stretcher trained"
    },
    {
        _id: "21732754",
        skill: "Oxygen tank trained"
    },
    {
        _id: "81276334",
        skill: "Mental health support trained"
    }
]
```

## Station

This route retreives and updates station data.

### Endpoints

| Description | Method | Endpoint | Access |
|-------------|--------|----------|--------|
Get all stations data. | GET | [api/station](#apistation-get) | Private
Add a station to the database. | POST | [api/station](#apistation-post) | Private
Delete a station. | DELETE | [api/station/:id](#apistationid-delete) | Private

#### api/station (GET)

Get all the stations in the database.

##### Request

No body is needed in the request.

##### Response

```JSON
[
    {   
        _id: "86353671",
        name: "East Colchester",
        address: {
            street: "88 Some Street",
            town: "Colchester",
            county: "Essex",
            postcode: "CO2"
        }
    },
    {
        _id: "86352271",
        name: "Chelmsford",
        address: {
            street: "88 Another Some Street",
            town: "Chelmsford",
            county: "Essex",
            postcode: "CM4"
        }
    }
]
```

#### api/station (POST)

Adds a new station to the database. An updated array of the stations is returned.

##### Request

The new station is in the requests body.

Body

```JSON
{
    name: "Southend",
    address: {
        street: "88 Another Strange Street",
        town: "Southend",
        county: "Essex",
        postcode: "SE3"
    }
}
```

##### Response

Body

```JSON
[
    {
        _id: "86353671",
        name: "East Colchester",
        address: {
            street: "88 Some Street",
            town: "Colchester",
            county: "Essex",
            postcode: "CO2"
        }
    },
    {
        _id: "86352271",
        name: "Chelmsford",
        address: {
            street: "88 Another Some Street",
            town: "Chelmsford",
            county: "Essex",
            postcode: "CM4"
        }
    },
    {
        _id: "863521232",
        name: "Southend",
        address: {
            street: "88 Another Strange Street",
            town: "Southend",
            county: "Essex",
            postcode: "SE3"
        }
    }
]
```

#### api/station/:id (DELETE)

Deletes a station from the database. An updated array of the stations is returned.

##### Request

The id for the station is put within the URL.

```
localhost:5000/api/station/86352271
```

##### Response

Body

```JSON
[
    {
        _id: "86353671",
        name: "East Colchester",
        address: {
            street: "88 Some Street",
            town: "Colchester",
            county: "Essex",
            postcode: "CO2"
        }
    },
    {
        _id: "863521232",
        name: "Southend",
        address: {
            street: "88 Another Strange Street",
            town: "Southend",
            county: "Essex",
            postcode: "SE3"
        }
    }
]
```

## Trip

This route retreives and updates trips data.

### Endpoints

| Description | Method | Endpoint | Access |
|-------------|--------|----------|--------|
Get all trips data. | GET | [api/trips](#apitrips-get) | Private
Get a trips data. | GET | [api/trips/:id](#apitripsid-get) | Private
Update a trips data. | PUT | [api/trips/:id](#apitripsid-put) | Private
Add a trip to the database. | POST | [api/trips](#apitrips-post) | Private
Delete a trip from the database | DELETE | [api/trips/:id](#apitripsid-delete) | Private

#### api/trips (GET)

Returns all trips in the database in an array.

##### Request

No body is needed.

##### Response

Body

```JSON
[
    {
        _id: "723912209",
        reason: "Appointment",
        to_address: "Colchester hospital, Colchester, Essex",
        from_address: "Carehome, Colchester, Essex",
        date: "21/04/2020",
        time: "10:00:00",
        return: true,
        return_time: "11:00:00",
        patient: {
            first_name: "Forename",
            last_name: "Surname",
            nhs_number: "3334452",
            address: {
                street: "Carehome",
                town: "Colchester",
                county: "Essex",
                postcode: "CO3"
            }
        },
        estimated_journey_time: {
            text: "12 Minutes",
            value: 725
        },
        equipment: [
            {
                equipment: {
                    name: "Oxygen tank"
                }   
            }
        ],
        requirements: [
            {
                requirement: {
                    name: "Oxygen tank"
                }
            }
        ],
        notes: "Patient struggles breathing"
    }
]
```

#### api/trips/:id (GET)

Returns an trip.

##### Request

No body is needed. The id is put within the URL.

URL

```
localhost:5000/api/trips/723912209
```

##### Response

Body

```JSON
{
    _id: "723912209",
    reason: "Appointment",
    to_address: "Colchester hospital, Colchester, Essex",
    from_address: "Carehome, Colchester, Essex",
    date: "21/04/2020",
    time: "10:00:00",
    return: true,
    return_time: "11:00:00",
    patient: {
        first_name: "Forename",
        last_name: "Surname",
        nhs_number: "3334452",
        address: {
            street: "Carehome",
            town: "Colchester",
            county: "Essex",
            postcode: "CO3"
        }
    },
    estimated_journey_time: {
        text: "12 Minutes",
        value: 725
    },
    equipment: [
        {
            equipment: {
                name: "Oxygen tank"
            }   
        }
    ],
    requirements: [
        {
            requirement: {
                name: "Oxygen tank"
            }
        }
    ],
    notes: "Patient struggles breathing"
}
```

#### api/trips/:id (PUT)

Updates a trips data. An updated array of the trips is returned.

##### Request

The id is put into the URL and the updated trip model is put in the requests body.

URL

```
localhost:5000/api/trips/723912209
```

Body

```JSON
{
    _id: "723912209",
    reason: "Appointment",
    to_address: "Colchester hospital, Colchester, Essex",
    from_address: "Carehome, Colchester, Essex",
    date: "21/04/2020",
    time: "11:00:00",
    return: true,
    return_time: "12:00:00",
    patient: {
        first_name: "Forename",
        last_name: "Surname",
        nhs_number: "3334452",
        address: {
            street: "Carehome",
            town: "Colchester",
            county: "Essex",
            postcode: "CO3"
        }
    },
    estimated_journey_time: {
        text: "12 Minutes",
        value: 725
    },
    equipment: [
        {
            equipment: {
                name: "Oxygen tank"
            }   
        }
    ],
    requirements: [
        {
            requirement: {
                name: "Oxygen tank"
            }
        }
    ],
    notes: "Patient struggles breathing"
}
```

##### Response

Body

```JSON
[
    {
        _id: "723912209",
        reason: "Appointment",
        to_address: "Colchester hospital, Colchester, Essex",
        from_address: "Carehome, Colchester, Essex",
        date: "21/04/2020",
        time: "11:00:00",
        return: true,
        return_time: "12:00:00",
        patient: {
            first_name: "Forename",
            last_name: "Surname",
            nhs_number: "3334452",
            address: {
                street: "Carehome",
                town: "Colchester",
                county: "Essex",
                postcode: "CO3"
            }
        },
        estimated_journey_time: {
            text: "12 Minutes",
            value: 725
        },
        equipment: [
            {
                equipment: {
                    name: "Oxygen tank"
                }   
            }
        ],
        requirements: [
            {
                requirement: {
                    name: "Oxygen tank"
                }
            }
        ],
        notes: "Patient struggles breathing"
    }
]
```

#### api/trips (POST)

Adds a trip to the database. An updated array of the trips is returned.

##### Request

The new trips model is in the body of the request.

Body

```JSON
{
    reason: "Transfer",
    to_address: "Colchester hospital, Colchester, Essex",
    from_address: "Chelmsford hospital, Chelmsford, Essex",
    date: "22/04/2020",
    time: "11:00:00",
    return: true,
    return_time: "12:00:00",
    patient: {
        first_name: "Forename",
        last_name: "Surname",
        nhs_number: "3334452",
        address: {
            street: "Carehome",
            town: "Colchester",
            county: "Essex",
            postcode: "CO3"
        }
    },
    estimated_journey_time: {
        text: "43 Minutes",
        value: 2700
    },
    equipment: [
        {
            equipment: {
                name: "Oxygen tank"
            }   
        }
    ],
    requirements: [],
    notes: "Patient struggles breathing"
}
```

##### Response

Body

```JSON
[
    {
        _id: "723912209",
        reason: "Appointment",
        to_address: "Colchester hospital, Colchester, Essex",
        from_address: "Carehome, Colchester, Essex",
        date: "21/04/2020",
        time: "11:00:00",
        return: true,
        return_time: "12:00:00",
        patient: {
            first_name: "Forename",
            last_name: "Surname",
            nhs_number: "3334452",
            address: {
                street: "Carehome",
                town: "Colchester",
                county: "Essex",
                postcode: "CO3"
            }
        },
        estimated_journey_time: {
            text: "12 Minutes",
            value: 725
        },
        equipment: [
            {
                equipment: {
                    name: "Oxygen tank"
                }   
            }
        ],
        requirements: [
            {
                requirement: {
                    name: "Oxygen tank"
                }
            }
        ],
        notes: "Patient struggles breathing"
    },
    {
        _id: "91272335",
        reason: "Transfer",
        to_address: "Colchester hospital, Colchester, Essex",
        from_address: "Chelmsford hospital, Chelmsford, Essex",
        date: "22/04/2020",
        time: "11:00:00",
        return: true,
        return_time: "12:00:00",
        patient: {
            first_name: "Forename",
            last_name: "Surname",
            nhs_number: "3334452",
            address: {
                street: "Carehome",
                town: "Colchester",
                county: "Essex",
                postcode: "CO3"
            }
        },
        estimated_journey_time: {
            text: "43 Minutes",
            value: 2700
        },
        equipment: [
            {
                equipment: {
                    name: "Oxygen tank"
                }   
            }
        ],
        requirements: [],
        notes: "Patient struggles breathing"
    }  
]
```

#### api/trips/:id (DELETE)

Deletes a trip from the database. The id for the trip will still remain. This is so logs attached to the trips will not become corrupted. All of the trips data will still be deleted. An updated array of the trips is returned.

##### Request

The body is not required, ony the id within the URL

URL

```
localhost:5000/api/trips/91272335
```

##### Response

Body

```JSON
[
    {
        _id: "723912209",
        reason: "Appointment",
        to_address: "Colchester hospital, Colchester, Essex",
        from_address: "Carehome, Colchester, Essex",
        date: "21/04/2020",
        time: "11:00:00",
        return: true,
        return_time: "12:00:00",
        patient: {
            first_name: "Forename",
            last_name: "Surname",
            nhs_number: "3334452",
            address: {
                street: "Carehome",
                town: "Colchester",
                county: "Essex",
                postcode: "CO3"
            }
        },
        estimated_journey_time: {
            text: "12 Minutes",
            value: 725
        },
        equipment: [
            {
                equipment: {
                    name: "Oxygen tank"
                }   
            }
        ],
        requirements: [
            {
                requirement: {
                    name: "Oxygen tank"
                }
            }
        ],
        notes: "Patient struggles breathing"
    },
    {
        _id: "91272335",
    }  
]
```

## User

Allows for users to be added to the database.

### Endpoints

| Description | Method | Endpoint | Access |
|-------------|--------|----------|--------|
Add a user to the database | POST | [api/users](#apiusers-post) | Private

#### api/users (POST)

Adds a user to the database. The details are in the requests body.

##### Request

Body

```JSON
{
    email: "example@email.com",
    password: "securePassword"
}
```

##### Response

If the new user does not already exist and is valid, then the following is returned.

Body

```JSON
{
    "example@email.com added to the db"
}
```

## Vehicle type

### Endpoints

| Description | Method | Endpoint | Access |
|-------------|--------|----------|--------|
Get all vehicle types from the database. | GET | [api/vehicle_type](#apivehicletype-get) | Private
Add a vehicle type to the database. | POST | [api/vehicle_type](#apivehicletype-post) | Private

#### api/vehicle_type (GET)

Gets all the vehicle types in the database. Returned as an array.

##### Request

No body was needed in the request.

##### Response

Body

```JSON
[
    {
        name: "Estate vehicle",
        code: "EV",
        crew_size: 2
    },
    {
        name: "Ambulance",
        code: "AM",
        crew_size: 3
    }
]
```

#### api/vehicle_type (POST)

Adds a new vehicle type to the database. Returns an updated array of vehicle types.

##### Request

The new vehicle type model is put in the requests body.

Body

```JSON
{
    name: "Saloon vehicle",
    code: "SV",
    crew_size: 2
}
```

##### Response

Body

```JSON
[
    {
        name: "Estate vehicle",
        code: "EV",
        crew_size: 2
    },
    {
        name: "Ambulance",
        code: "AM",
        crew_size: 3
    },
    {
        name: "Saloon vehicle",
        code: "SV",
        crew_size: 2
    }
]
```

## Vehicle

This route retreives and updates vehicle data.

### Endpoints

| Description | Method | Endpoint | Access |
|-------------|--------|----------|--------|
Get all vehicles data. | GET | [api/vehicle](#apivehicle-get) | Private
Get a vehicles data. | GET | [api/vehicle/:id](#apivehicleid-get) | Private
Update a vehicle data. | PUT | [api/vehicle/:id](#apivehicleid-put) | Private
Add a vehicle to the database. | POST | [api/vehicle](#apivehicle-post) | Private
Delete a vehicle from the database | DELETE | [api/vehicle/:id](#apivehicleid-delete) | Private

#### api/vehicle (GET)

Gets all the vehicles from the database. Returns in an array.

##### Request 

No request body is required.

##### Response

Body

```JSON
[
    {
        _id: "62333421",
        reg_num: "HG65 8JH",
        available: true,
        stationed_at: {
            _id: "76234712",
            name: "East Colchester",
            address: {
                street: 88 Some Street,
                town: Colchester,
                county: Essex,
                postcode: "CO2"
            }
        },
        type: {
            _id: "2319823",
            name: "Estate Vehicle",
            code: "EV",
            crew_size: 2
        }
    },
    {
        _id: "62331233",
        reg_num: "JA12 9JQ",
        available: true,
        stationed_at: {
            _id: "76234712",
            name: "East Colchester",
            address: {
                street: 88 Some Street,
                town: Colchester,
                county: Essex,
                postcode: "CO2"
            }
        },
        type: {
            _id: "2319823",
            name: "Estate Vehicle",
            code: "EV",
            crew_size: 2
        }
    }
]
```

#### api/vehicle/:id (GET) 

Get a vehicle from the database.

##### Request

The id for the vehicle is within the URL.

URL

```
localhost:5000/api/vehicle/62331233
```

##### Response

Body

```JSON
{
    _id: "62331233",
    reg_num: "JA12 9JQ",
    available: true,
    stationed_at: {
        _id: "76234712",
        name: "East Colchester",
        address: {
            street: 88 Some Street,
            town: Colchester,
            county: Essex,
            postcode: "CO2"
        }
    },
    type: {
        _id: "2319823",
        name: "Estate Vehicle",
        code: "EV",
        crew_size: 2
    }
}
```

#### api/vehicle/:id (PUT)

Update a vehicle in the database.

##### Request

The body will contain the updated vehicle model. The URL contains the id. An updated array of vehicles is returned.

URL

```
locahost:5000/api/vehicle/62331233
```

Body

```JSON
{
    _id: "62331233",
    reg_num: "JA12 9JQ",
    available: false,
    stationed_at: {
        _id: "76234712",
        name: "East Colchester",
        address: {
            street: 88 Some Street,
            town: Colchester,
            county: Essex,
            postcode: "CO2"
        }
    },
    type: {
        _id: "2319823",
        name: "Estate Vehicle",
        code: "EV",
        crew_size: 2
    }
}
```
##### Response

Body

```JSON
[
    {
        _id: "62333421",
        reg_num: "HG65 8JH",
        available: true,
        stationed_at: {
            _id: "76234712",
            name: "East Colchester",
            address: {
                street: 88 Some Street,
                town: Colchester,
                county: Essex,
                postcode: "CO2"
            }
        },
        type: {
            _id: "2319823",
            name: "Estate Vehicle",
            code: "EV",
            crew_size: 2
        }
    },
    {
        _id: "62331233",
        reg_num: "JA12 9JQ",
        available: false,
        stationed_at: {
            _id: "76234712",
            name: "East Colchester",
            address: {
                street: 88 Some Street,
                town: Colchester,
                county: Essex,
                postcode: "CO2"
            }
        },
        type: {
            _id: "2319823",
            name: "Estate Vehicle",
            code: "EV",
            crew_size: 2
        }
    }
]
```

#### api/vehicle (POST)

Add a new vehicle to the database. An updated array of vehicles is returned.

##### Request

The new vehicle is in the requests body.

Body

```JSON
{
    reg_num: "ST16 2GH",
    available: true,
    stationed_at: {
        _id: "76234712",
        name: "East Colchester",
        address: {
            street: 88 Some Street,
            town: Colchester,
            county: Essex,
            postcode: "CO2"
        }
    },
    type: {
        _id: "23192122",
        name: "Ambulance",
        code: "AM",
        crew_size: 3
    }
}
```

##### Response

Body 

```JSON
[
    {
        _id: "62333421",
        reg_num: "HG65 8JH",
        available: true,
        stationed_at: {
            _id: "76234712",
            name: "East Colchester",
            address: {
                street: 88 Some Street,
                town: Colchester,
                county: Essex,
                postcode: "CO2"
            }
        },
        type: {
            _id: "2319823",
            name: "Estate Vehicle",
            code: "EV",
            crew_size: 2
        }
    },
    {
        _id: "62331233",
        reg_num: "JA12 9JQ",
        available: false,
        stationed_at: {
            _id: "76234712",
            name: "East Colchester",
            address: {
                street: 88 Some Street,
                town: Colchester,
                county: Essex,
                postcode: "CO2"
            }
        },
        type: {
            _id: "2319823",
            name: "Estate Vehicle",
            code: "EV",
            crew_size: 2
        }
    },
    {
        _id: "722398721",
        reg_num: "ST16 2GH",
        available: true,
        stationed_at: {
            _id: "76234712",
            name: "East Colchester",
            address: {
                street: 88 Some Street,
                town: Colchester,
                county: Essex,
                postcode: "CO2"
            }
        },
        type: {
            _id: "23192122",
            name: "Ambulance",
            code: "AM",
            crew_size: 3
        }
    }
]
```

#### api/vehicle/:id (DELETE)

Deletes a vehicle from the database. The id for the vehicle will still remain. This is so logs attached to the vehicle will not become corrupted. All of the vehicles data will still be deleted. An updated array of the vehicles is returned.

##### Request

The vehicles id is within the URL.

URL

```
localhost:5000/api/vehicle/722398721
```

##### Response

Body

```JSON
[
    {
        _id: "62333421",
        reg_num: "HG65 8JH",
        available: true,
        stationed_at: {
            _id: "76234712",
            name: "East Colchester",
            address: {
                street: 88 Some Street,
                town: Colchester,
                county: Essex,
                postcode: "CO2"
            }
        },
        type: {
            _id: "2319823",
            name: "Estate Vehicle",
            code: "EV",
            crew_size: 2
        }
    },
    {
        _id: "62331233",
        reg_num: "JA12 9JQ",
        available: false,
        stationed_at: {
            _id: "76234712",
            name: "East Colchester",
            address: {
                street: 88 Some Street,
                town: Colchester,
                county: Essex,
                postcode: "CO2"
            }
        },
        type: {
            _id: "2319823",
            name: "Estate Vehicle",
            code: "EV",
            crew_size: 2
        }
    },
    {
        _id: "722398721"
    }
]
```
