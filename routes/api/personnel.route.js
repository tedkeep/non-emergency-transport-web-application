const router = require("express").Router();
const auth = require("../../middleware/auth");

const personnelModel = require("../../models/staff.model");

// @route   GET api/personnel
// @desc    get all personnel
// @access  Private
router.get("/", auth, (req, res) => {
  personnelModel.find().then(personnel => res.json(personnel));
});

// @route   GET api/personnel/:id
// @desc    get a personnel by id
// @access  Private
router.get("/:id", auth, (req, res) => {
  personnelModel.findById(req.params.id).then(personnel => res.json(personnel));
});

// @route   PUT api/personnel/:id
// @desc    update a personnels data
// @access  Private
router.put("/:id", auth, async (req, res) => {
  await personnelModel.findByIdAndUpdate(req.params.id, req.body);
  personnelModel.find().then(personnel => res.json(personnel));
});

// @route   POST api/personnel/:id
// @desc    Add a personnel to the db
// @access  Private
router.post("/", auth, async (req, res) => {
  const newPersonnel = new personnelModel(req.body);
  await newPersonnel.save();
  personnelModel.find().then(personnel => res.json(personnel));
});

// @route   POST api/personnel/:id
// @desc    Delete a personnel data
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  await personnelModel.replaceOne(
    { _id: req.params.id },
    {
      _id: req.params.id
    }
  );
  personnelModel.find().then(personnel => res.json(personnel));
});

module.exports = router;
