const router = require("express").Router();
const auth = require("../../middleware/auth");

const vehicleTypeModel = require("../../models/vehicle_type.model");

// @route   GET api/vehicle_type
// @desc    get all vehicle types
// @access  Private
router.get("/", auth, (req, res) => {
  vehicleTypeModel.find().then(types => res.json(types));
});

// @route   POST api/vehicle_type/
// @desc    Add a vehicle type to the db
// @access  Private
router.post("/", auth, async (req, res) => {
  const newType = new vehicleTypeModel(req.body);
  await newType.save();
  vehicleTypeModel.find().then(types => res.json(types));
});

module.exports = router;
