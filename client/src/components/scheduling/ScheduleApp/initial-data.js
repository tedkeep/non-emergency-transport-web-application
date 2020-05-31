const initialData = {
  trips: {
    "12": {
      _id: "12",
      reason: "Transfer"
    },
    "22": {
      _id: "22",
      reason: "Transfer"
    },
    "34": {
      _id: "34",
      reason: "Appointment"
    },
    "15": {
      _id: "15",
      reason: "Transfer"
    },
    "71": {
      _id: "71",
      reason: "Appointment"
    }
  },
  vehicles: {
    "14": {
      _id: "14",
      reg_num: "GY23 7GG"
    },
    "18": {
      _id: "18",
      reg_num: "GY98 7FG"
    },
    "65": {
      _id: "65",
      reg_num: "FG98 2JH"
    }
  },
  employees: {
    "98": {
      _id: "98",
      first_name: "James",
      last_name: "Hiltons"
    },
    "34": {
      _id: "34",
      first_name: "Leigh",
      last_name: "Veal"
    },
    "33": {
      _id: "33",
      first_name: "Pete",
      last_name: "Jordans"
    }
  },
  schedules: {
    "1": {
      _id: "1",
      vehicle: "14",
      trips: ["12"]
    },
    "2": {
      _id: "2",
      vehicle: "18",
      trips: ["34", "15"]
    }
  },
  scheduleOrder: ["1", "2"],
  backlog: {
    trips: ["71", "22"]
  }
};

export default initialData;
