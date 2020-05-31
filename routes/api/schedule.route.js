const router = require("express").Router();
const auth = require("../../middleware/auth");

const scheduleModel = require("../../models/schedule.model");
const tripModel = require("../../models/trip.model");
const vehicleModel = require("../../models/vehicle.model");
const staffModel = require("../../models/staff.model");

// @route   GET api/schedule
// @desc    get all schedules
// @access  Private
router.get("/", auth, (req, res) => {
  scheduleModel.find().then(schedules => res.json(schedules));
});

// @route   GET api/schedule/app/:date
// @desc    get data for the schedule app for a particular date
// @access  Private
router.get("/app/:date", auth, (req, res) => {
  let data = {};
  tripModel
    .find({ date: req.params.date })
    .populate("patient")
    .then(trips => {
      if (trips) {
        data.trips = {};
        for (trip of trips) {
          data.trips = {
            ...data.trips,
            [trip._id]: trip
          };
        }
      }
      vehicleModel
        .find({ available: true })
        .populate("stationed_at")
        .populate("type")
        .then(vehicles => {
          if (vehicles) {
            data.vehicles = {};
            for (vehicle of vehicles) {
              data.vehicles = {
                ...data.vehicles,
                [vehicle._id]: vehicle
              };
            }
          }
          staffModel.find({ first_name: { $exists: true } }).then(employees => {
            if (employees) {
              data.employees = {};
              for (employee of employees) {
                data.employees = {
                  ...data.employees,
                  [employee._id]: employee
                };
              }
            }
            scheduleModel.find({ date: req.params.date }).then(schedules => {
              if (schedules) {
                data.schedules = {};
                for (schedule of schedules) {
                  const reg_num = data.vehicles[schedule.vehicle].reg_num;
                  data.schedules = {
                    ...data.schedules,
                    [schedule._id]: {
                      ...schedule._doc,
                      reg_num: reg_num
                    }
                  };
                }
                data.scheduleOrder = [];
                for (schedule of schedules) {
                  data.scheduleOrder.push(schedule._id);
                }
              }
              data.backlog = {
                trips: []
              };
              for (trip in data.trips) {
                let foundTrip = false;
                for (schedule of schedules) {
                  if (schedule.trips.includes(trip)) {
                    foundTrip = true;
                    break;
                  }
                }
                if (!foundTrip) {
                  data.backlog.trips.push(data.trips[trip]._id);
                }
              }

              res.json(data);
            });
          });
        });
    })
    .catch(error => {
      res.json(data);
    });
});

// @route   GET api/schedule/app/submit
// @desc    Submit schedules
// @access  Private
router.post("/app/submit/", auth, async (req, res) => {
  const errors = {
    status: "ERROR",
    errors: []
  };
  for (const schedule of req.body.schedules) {
    await scheduleModel.findOneAndUpdate(
      { date: schedule.date, vehicle: schedule.vehicle },
      schedule,
      { upsert: true, useFindAndModify: false },
      (err, doc) => {
        if (err) {
          errors.errors.push({
            vehicle: schedule.vehicle,
            error: err
          });
        }
      }
    );
  }
  // errors.errors.push({
  //   vehicle: "5e4170b0c7587439184bc807",
  //   error: "oops"
  // });
  if (errors.errors.length === 0) {
    res.json({
      status: "OK"
    });
  } else {
    res.json(errors);
  }
});

// @route   GET api/schedule/:id
// @desc    get a schedule by id
// @access  Private
router.get("/:id", auth, (req, res) => {
  scheduleModel.findById(req.params.id).then(schedule => res.json(schedule));
});

// @route   PUT api/schedule/:id
// @desc    update a schedules data
// @access  Private
router.put("/:id", auth, async (req, res) => {
  await scheduleModel.findByIdAndUpdate(req.params.id, req.body);
  scheduleModel.find().then(schedules => res.json(schedules));
});

// @route   POST api/schedule/:id
// @desc    Add a schedule to the db
// @access  Private
router.post("/", auth, async (req, res) => {
  const newSchedule = new scheduleModel(req.body);
  await newSchedule.save();
  scheduleModel.find().then(schedules => res.json(schedules));
});

// @route   POST api/schedule/:id
// @desc    Delete a schedule data
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  await scheduleModel.replaceOne(
    { _id: req.params.id },
    {
      _id: req.params.id
    }
  );
  scheduleModel.find().then(schedules => res.json(schedules));
});

module.exports = router;
