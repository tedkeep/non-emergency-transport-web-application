const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");

// Bring in user model
const userModel = require("../../models/user.model");

// @route   POST api/auth
// @desc    Auth user when logging in
// @access  Public
router.post("/", (req, res) => {
  // pull the data from the request body
  const { email, password } = req.body;

  // Check the data is there
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  userModel.findOne({ email }).then(user => {
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    // validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      // Once logged in, the user is authenticated by encoding their user.id with the secret key.
      // Only by confirming their token with the secret key can the user perform any tasks
      jwt.sign(
        // payload
        { id: user.id },
        // Secret key
        config.get("jwtSecret"),
        // callback
        (err, token) => {
          if (err) throw err;

          res.json({
            token,
            user: {
              _id: user.id,
              email: user.email
            }
          });
        }
      );
    });
  });
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get("/user", auth, (req, res) => {
  userModel
    .findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
