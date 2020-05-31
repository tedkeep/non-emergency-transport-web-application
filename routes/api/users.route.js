const router = require("express").Router();
const bcrypt = require("bcryptjs");

// Bring in user model
const userModel = require("../../models/user.model");

// @route   POST /users
// @desc    Register new user
// @access  Public
router.post("/", (req, res) => {
  // pull the data from the request body
  const { email, password } = req.body;

  // Check the data is there
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  userModel.findOne({ email }).then(user => {
    // Check if the email already exists in the db
    if (user) {
      return res.status(400).json({ msg: "User already exists " });
    }

    // Else add the user
    const newUser = new userModel({
      email,
      password
    });

    // Encrypt the password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;

        // Save user to db
        newUser
          .save()
          .then(user => res.json(`${user.email} added to the db`))
          .catch(err => res.status(400).json("Error :" + err));
      });
    });
  });
});

module.exports = router;
