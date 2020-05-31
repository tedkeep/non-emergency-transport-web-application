const router = require("express").Router();
const auth = require("../../middleware/auth");

const stationModel = require("../../models/station.model");

// @route   GET api/station
// @desc    get all stations
// @access  Private
router.get("/", auth, (req, res) => {
  stationModel
    .find()
    .then(stations => res.json(stations))
    .catch(error => res.json(error));
});

// @route   POST api/station
// @desc    Add a station to the db
// @access  Private
router.post("/", auth, (req, res) => {
  const newStation = new stationModel(req.body);
  newStation
    .save()
    .then(stationModel.find().then(stations => res.json(stations)))
    .catch(error => res.json(error));
});

// @route   DELETE api/station/:id
// @desc    Delete a station from the db
// @access  Private
router.delete("/:id", auth, (req, res) => {
  stationModel
    .replaceOne(
      { _id: req.params.id },
      {
        _id: req.params.id
      }
    )
    .then(() => stationModel.find().then(stations => res.json(stations)));
});

module.exports = router;
