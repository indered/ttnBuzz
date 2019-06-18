var express = require("express"),
  router = express.Router();

var User = require("../models/buzz-model").User;

router.get("/", (req, res, next) => {
  console.log(">>>>>>>>>>>>>>", req.user);
  if (!req.user) res.send({ user: "false" });
  var user = req.user;
  res.json(user);
});

router.put("/", (req, res, next) => {
  User.update(req.user, {
    ...req.body
  }).then(() => {
    User.findOne({ _id: req.user._id }).then(user => {
      res.json(user);
    });
  });
});

module.exports = router;
