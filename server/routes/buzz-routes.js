var express = require("express"),
  router = express.Router();

var Buzz = require("../models/buzz-model").Buzz;

router.param("buzzId", (req, res, next, id) => {
  Buzz.findById(id, (err, doc) => {
    if (err) return next(err);
    if (!doc) {
      err = new Error("Not Found");
      err.status = 404;
      return next(err);
    }
    req.buzz = doc;
    next();
  });
});

router.param("comId", (req, res, next, id) => {
  req.comment = req.buzz.comments.id(id);

  if (!req.comment) {
    err = new Error("Not found");
    err.status = 404;
    return next(err);
  }
  next();
});

//get buzzs
//route for all the buzzs

router.get("/", (req, res, next) => {
  Buzz.find({})
    .sort({ createdAt: -1 })
    .exec((err, buzzs) => {
      if (err) next(err);
      res.json(buzzs);
    });
});

//post buzz
//route for creating buzz

router.post("/", (req, res, next) => {
  var buzz = new Buzz(req.body);
  buzz.save(function(err, buzz) {
    if (err) return next(err);
    res.status(201);
    res.json(buzz);
  });
});

//get :buzzId
// route for specific buzz

router.get("/:buzzId", (req, res) => {
  res.json(req.buzz);
});

// put /:buzzId
//edit an post

router.put("/:buzzId", (req, res) => {
  Buzz.update(req.buzz, {
    ...req.body,
    updatedAt: new Date()
  }).then(() => {
    Buzz.findOne({ _id: req.params.buzzId }).then(buzz => {
      res.json(buzz);
    });
  });
});

//delete /:buzzId
//delete a buzz

router.delete("/:buzzId", (req, res, next) => {
  req.buzz.remove(err => {
    if (err) return next(err);
  });
  Buzz.find({})
    .sort({ createdAt: -1 })
    .exec((err, buzzs) => {
      if (err) next(err);
      res.json(buzzs);
    });
});

// post :buzzId/comments
//route for commenting

router.post("/:buzzId/comments", (req, res, next) => {
  req.buzz.comments.push(req.body);
  req.buzz.save((err, buzz) => {
    if (err) return next(err);
    res.status(201);
    res.json(buzz);
  });
});

//put :buzzId/comments/:comId
//edit a comment

router.put("/:buzzId/comments/:comId", (req, res, next) => {
  req.comment.text = req.body.text;
  req.comment.updatedAt = Date.now();
  req.buzz.save((err, buzz) => {
    if (err) next(err);
    else res.json(buzz);
  });
});

// delete /:buzzId/comments/:comId
//deleting a comment

router.delete("/:buzzId/comments/:comId", (req, res, next) => {
  req.comment.remove(err => {
    req.buzz.save((err, buzz) => {
      if (err) return next(err);
      res.json(buzz);
    });
  });
});

//post /:buzzId/reaction

router.post("/:buzzId/react-:type", (req, res, next) => {
  if (req.params.type.search(/^(like|dislike)$/) === -1) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else {
    var reaction = {
      type: req.params.type
    };
    req.buzz.reactions.unshift(reaction);

    req.buzz.save((err, buzz) => {
      if (err) return next(err);
      res.status(201);
      res.json(buzz);
    });
    // req.reactions.push[reaction];
    // req.buzz.save((err, buzz) => {
    //   if (err) next(err);
    //   else res.json(buzz);
    // });
  }
});

module.exports = router;
