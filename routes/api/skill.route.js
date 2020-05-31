const router = require("express").Router();
const auth = require("../../middleware/auth");

const skillModel = require("../../models/skill.model");

// @route   GET api/skill
// @desc    get all skills
// @access  Private
router.get("/", auth, (req, res) => {
  skillModel
    .find()
    .then(skills => res.json(skills))
    .catch(error => res.json(error));
});

// @route   POST api/skill
// @desc    Add a skill to the db
// @access  Private
router.post("/", auth, (req, res) => {
  const newSkill = new skillModel(req.body);
  newSkill
    .save()
    .then(skillModel.find().then(skills => res.json(skills)))
    .catch(error => res.json(error));
});

// @route   DELETE api/skill/:id
// @desc    Delete a skill from the db
// @access  Private
router.delete("/:id", auth, (req, res) => {
  skillModel
    .replaceOne(
      { _id: req.params.id },
      {
        _id: req.params.id
      }
    )
    .then(() => skillModel.find().then(skills => res.json(skills)));
});

module.exports = router;
