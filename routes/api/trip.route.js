const router = require("express").Router();
const auth = require("../../middleware/auth");

const tripModel = require("../../models/trip.model");

// @route   GET api/trip
// @desc    get all trips
// @access  Private
router.get("/", auth, (req, res) => {
  // Get all trips
  tripModel
    .find()
    .populate("patient")
    .then(trips => {
      res.json(trips);
    })
    .catch(console.log("Error when fetching trips"));
});

// @route   GET api/trip/:id
// @desc    get a trip by id
// @access  Private
router.get("/:id", auth, (req, res) => {
  tripModel
    .findById(req.params.id)
    .populate("patient")
    .then(trip => res.json(trip));
});

// @route   PUT api/trip/:id
// @desc    update a trips data
// @access  Private
router.put("/:id", auth, async (req, res) => {
  await tripModel.findByIdAndUpdate(req.params.id, req.body);
  tripModel
    .find()
    .populate("patient")
    .then(trip => res.json(trip));
});

// @route   POST api/trip/:id
// @desc    Add a trip to the db
// @access  Private
router.post("/", auth, async (req, res) => {
  const newtrip = new tripModel(req.body);
  await newtrip.save();
  tripModel
    .find()
    .populate("patient")
    .then(trip => res.json(trip));
});

// @route   POST api/trip/:id
// @desc    Delete a trip data
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  await tripModel.replaceOne(
    { _id: req.params.id },
    {
      _id: req.params.id
    }
  );
  tripModel
    .find()
    .populate("patient")
    .then(trip => res.json(trip));
});

module.exports = router;
