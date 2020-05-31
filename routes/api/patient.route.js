const router = require("express").Router();
const auth = require("../../middleware/auth");

const patientModel = require("../../models/patient.model");

// @route   GET api/patients
// @desc    get all patients
// @access  Private
router.get("/", auth, (req, res) => {
  patientModel.find().then(patients => res.json(patients));
});

// @route   GET api/patients/:id
// @desc    get a patient by id
// @access  Private
router.get("/:id", auth, (req, res) => {
  patientModel.findById(req.params.id).then(patient => res.json(patient));
});

// @route   PUT api/patients/:id
// @desc    update a patients data
// @access  Private
router.put("/:id", auth, async (req, res) => {
  await patientModel.findByIdAndUpdate(req.params.id, req.body);
  patientModel.find().then(patients => res.json(patients));
});

// @route   POST api/patients/:id
// @desc    Add a patient to the db
// @access  Private
router.post("/", auth, async (req, res) => {
  const newPatient = new patientModel(req.body);
  await newPatient.save();
  patientModel.find().then(patients => res.json(patients));
});

// @route   POST api/patients/:id
// @desc    Delete a patients data
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  await patientModel.replaceOne(
    { _id: req.params.id },
    {
      _id: req.params.id
    }
  );
  patientModel.find().then(patients => res.json(patients));
});

module.exports = router;
