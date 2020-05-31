const router = require("express").Router();
const auth = require("../../middleware/auth");

const vehicleModel = require("../../models/vehicle.model");

// @route   GET api/vehicles
// @desc    get all vehicles
// @access  Private
router.get("/", auth, (req, res) => {
  vehicleModel
    .find()
    .populate("stationed_at")
    .populate("type")
    .then(vehicles => res.json(vehicles));
});

// @route   GET api/vehicles/:id
// @desc    get a vehicle by id
// @access  Private
router.get("/:id", auth, (req, res) => {
  vehicleModel.findById(req.params.id).then(vehicle => res.json(vehicle));
});

// @route   PUT api/vehicles/:id
// @desc    update a vehicles data
// @access  Private
router.put("/:id", auth, async (req, res) => {
  await vehicleModel.findByIdAndUpdate(req.params.id, req.body);
  vehicleModel.find().then(vehicles => res.json(vehicles));
});

// @route   POST api/vehicles/:id
// @desc    Add a vehicle to the db
// @access  Private
router.post("/", auth, async (req, res) => {
  const newVehicle = new vehicleModel(req.body);
  await newVehicle.save();
  vehicleModel.find().then(vehicles => res.json(vehicles));
});

// @route   POST api/vehicles/:id
// @desc    Delete a vehicles data
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  await vehicleModel.replaceOne(
    { _id: req.params.id },
    {
      _id: req.params.id
    }
  );
  vehicleModel.find().then(vehicles => res.json(vehicles));
});

module.exports = router;
