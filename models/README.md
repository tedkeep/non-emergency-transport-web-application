# Data Models

each data collection has a model which contains rules that have to be met for data to be stored in the db. Failure to meet the model requirements, an error will be thrown. How to set up these rules can be found at the [mongoose js documenation](https://mongoosejs.com/). Below is the documentation on each model:

[[_TOC_]]

## Staff

### Object

```JSON
{
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  staff_number: {
    type: Number,
    required: true
  },
  shifts: [
    {
      start_time: {
        type: String,
        required: true
      },
      finish_time: {
        type: String,
        required: true
      },
      day: {
        type: String,
        required: true
      }
    }
  ],
  unavailable: [
    {
      date: {
        type: Date,
        required: true
      },
      note: {
        type: String
      }
    }
  ],
  skills: [
    {
      skill: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "skill",
        required: true
      }
    }
  ],
  stationed_at: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "station",
    required: true
  },
  available: {
    required: true,
    type: Boolean
  }
}
```

### Data

>>>
**first_name <sup>REQUIRED</sup>**

First name of the employee. Takes a string value.
>>>

>>>
**last_name <sup>REQUIRED</sup>**

Last name of the employee. Takes a string value.
>>>

>>>
**staff_number <sup>REQUIRED</sup>**

The employees staff number. Takes a number value.
>>>

>>>
**shifts**

The employees shifts. Stored in an array. Each object contains the start/finish times and the day of the week.
>>>

>>>
**unavailable**

Any dates the employee is unavailable due to sickness, holiday, etc. 
>>>

>>>
**skills**

Any skills the employee has been trained in. Skills are required for staff to be selected for certain tasks/trips.
>>>

>>>
**stationed_at <sup>REQUIRED</sup>**

Which vehicle station the employee works at/from. 
>>>

>>>
**available <sup>REQUIRED</sup> PLANNED TO BE DEPRECATED**

Shows if a staff member is available. The unavailable data will soon replace this.
>>>

## Equipment

### Object

```JSON
{
  name: { type: String, required: true }
}
```

### Data

>>>
**name <sup>REQUIRED</sup>**

The name of the equipment.
>>>

## Patient

### Object

```JSON
{
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  nhs_number: {
    unique: true,
    type: Number
  },
  address: {
    street: { type: String, required: true },
    town: { type: String, required: true },
    county: { type: String },
    postcode: { type: String, required: true }
  }
}
```

### Data

>>>
**first_name <sup>REQUIRED</sup>**

The patients first name.
>>>

>>>
**last_name <sup>REQUIRED</sup>**

The patients last name.
>>>

>>>
**nhs_number**

The patients nhs number. This is a unique number.
>>>

>>>
**address**

The patients home address.
>>>

## Schedule

### Object

```JSON
{
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehicle",
    required: true
  },
  date: { type: String, required: true },
  staff: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "personnel",
      required: true
    }
  ],
  trips: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "trip",
      required: true
    }
  ],
  start_time: { type: String, required: true },
  finish_time: { type: String, required: true }
}
```

### Data

>>>
**vehicle <sup>REQUIRED</sup>**

References to the vehicle that the schedule is for.
>>>

>>>
**date <sup>REQUIRED</sup>**

The date which the schedule is for.
>>>

>>>
**staff**

The staff that will be assigned to the schedule.
>>>

>>>
**trips**

The trips that are assigned to the schedule.
>>>

>>>
**start_time <sup>REQUIRED</sup>**

The start of the schedule. When the vehicle leaves its depot.
>>>

>>>
**finish_time <sup>REQUIRED</sup>**

The finish of the schedule. When the vehicle arrives back at the depot.
>>>

## Skill

### Object

```JSON
{
  skill: {
    type: String,
    required: true,
    unique: true
  }
}
```

### Data

>>>
**skill <sup>REQUIRED</sup>**

The name of the skill. This is a unique value so skills don't get duplicated.
>>>

## station

### Object

```JSON
{
  name: {
    type: String,
    required: true
  },
  address: {
    street: { type: String, required: true },
    town: { type: String, required: true },
    county: { type: String },
    postcode: { type: String, required: true }
  }
}
```

### Data

>>>
**name <sup>REQUIRED</sup>**

The name of the station.
>>>

>>>
**address <sup>REQUIRED</sup>**

The address of the station.
>>>

## Travel_requirement

### Object

```JSON
{
  name: { type: String, required: true }
}
```

### Data

>>>
**name <sup>REQUIRED</sup>**

The name of the travel requirement.
>>>

## Trip

### Object

```JSON
{
  reason: { type: String, required: true },
  to_address: {
    type: String,
    required: true
  },
  from_address: {
    type: String,
    required: true
  },
  date: { type: String, required: true },
  time: { type: String, required: true },
  time_to: { type: String, required: true },
  return: { type: Boolean, required: true },
  return_time: { type: String },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient",
    required: true
  },
  estimated_journey_time: {
    text: { type: String, required: true },
    value: { type: Number, required: true }
  },
  equipment: [
    {
      equipment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "equipment",
        required: true
      }
    }
  ],
  requirements: [
    {
      requirement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "travel_requirement",
        required: true
      }
    }
  ],
  notes: { type: String }
}
```

### Data

>>>
**reason <sup>REQUIRED</sup>**

The reason for the trip.
>>>

>>>
**to_address <sup>REQUIRED</sup>**

The address which the trip is to.
>>>

>>>
**from_address <sup>REQUIRED</sup>**

The address which the trip is from.
>>>

>>>
**date <sup>REQUIRED</sup>**

The date which the trip will take place.
>>>

>>>
**time <sup>REQUIRED</sup>**

The time for the trip to start
>>>

>>>
**return <sup>REQUIRED</sup>**

Whether a return trip is needed.
>>>

>>>
**return_time**

The time for the return trip
>>>

>>>
**patient <sup>REQUIRED</sup>**

The database id of the patient this trip is for.
>>>

>>>
**estimated_journey_time <sup>REQUIRED</sup>**

The estimated amount of the time the journey will take.
>>>

>>>
**equipment**

Any equipment required for the trip. (e.g. oxygen, wheelchair)
>>>

>>>
**notes**

Any additional notes/information for the trip.
>>>

## User

### Object

```JSON
{
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}
```

### Data

>>>
**email <sup>REQUIRED</sup>**

The users email.
>>>

>>>
**password <sup>REQUIRED</sup>**

The users password.
>>>

## Vehicle

### Object

```JSON
{
  reg_num: {
    type: String,
    required: true,
    unique: true
  },
  available: {
    type: Boolean,
    required: true
  },
  stationed_at: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "station",
    required: true
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehicle_type",
    required: true
  }
}
```

### Data

>>>
**reg_num <sup>REQUIRED</sup>**

The vehicles registration number. This has to be unique.
>>>

>>>
**available <sup>REQUIRED</sup>**

Shows whether the vehicle is available or not.
>>>

>>>
**stationed_at <sup>REQUIRED</sup>**

The station the vehicle is based at.
>>>

>>>
**type <sup>REQUIRED</sup>**

The type of vehicle it is.
>>>

## Vehicle_type

### Object

```JSON
{
  name: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  crew_size: {
    type: Number,
    required: true
  }
}
```

### Data

>>>
**name <sup>REQUIRED</sup>**

The name of the vehicle type.
>>>

>>>
**code <sup>REQUIRED</sup>**

A code that represents the vehicle type. This is just a short hand version of the name.
>>>

>>>
**crew_size <sup>REQUIRED</sup>**

How many staff fits in the vehicle.
>>>
