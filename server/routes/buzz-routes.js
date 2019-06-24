var express = require("express"),
  router = express.Router();
var keys = require("../config/keys");
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: keys.cloudinary.cloudName,
  api_key: keys.cloudinary.apiKey,
  api_secret: keys.cloudinary.apiSecret
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "ttn",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
});

const parser = multer({ storage: storage });

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
    .populate("postedBy")
    .sort({ createdAt: -1 })
    .exec((err, buzzs) => {
      if (err) next(err);
      res.json(buzzs);
    });
});

//post buzz
//route for creating buzz

router.post("/", (req, res, next) => {
  var buzz = new Buzz({
    ...req.body.buzz,
    postedBy: req.user._id
  });

  buzz.save().then(buzz => {
    Buzz.findOne(buzz)
      .populate("postedBy")
      .exec((err, buzz) => {
        console.log(buzz);
        if (err) next(err);
        res.json(buzz);
      });
  });
});

//upload image

router.post("/:buzzId/upload", parser.single("image"), (req, res) => {
  console.log("url", req.file);
  Buzz.update(req.buzz, {
    ...req.body,
    picture: req.file.url
  }).then(() => {
    Buzz.findOne({ _id: req.params.buzzId })
      .populate("postedBy")
      .then(buzz => {
        res.json(buzz);
      });
  });

  // to see what is returned to you  const image = {};  image.url = req.file.url;  image.id = req.file.public_id;
  // save image information in database    .then(newImage => res.json(newImage))    .catch(err => console.log(err));});
});
//get :buzzId
// route for specific buzz

router.get("/:buzzId", (req, res) => {
  Buzz.findOne(req.buzz)
    .populate("postedBy")
    .exec((err, buzz) => {
      console.log(buzz);
      if (err) next(err);
      res.json(buzz);
    });
});

// put /:buzzId
//edit an post

router.put("/:buzzId", (req, res) => {
  if (req.buzz.postedBy.id === req.user._id)
    Buzz.update(req.buzz, {
      ...req.body,
      updatedAt: new Date()
    }).then(() => {
      Buzz.findOne({ _id: req.params.buzzId })
        .populate("postedBy")
        .then(buzz => {
          res.json(buzz);
        });
    });
});

//delete /:buzzId
//delete a buzz

router.delete("/:buzzId", (req, res, next) => {
  if (JSON.stringify(req.buzz.postedBy) === JSON.stringify(req.user._id)) {
    let buzzDeleted = req.buzz.id;
    req.buzz.remove(err => {
      if (err) return next(err);
      res.json(buzzDeleted);
    });
  }
});

// Buzz.find({})
//   .sort({ createdAt: -1 })
//   .exec((err, buzzs) => {
//     if (err) next(err);
//     res.json(buzzs);
//   });

// post :buzzId/comments
//route for commenting

router.post("/:buzzId/comments", (req, res, next) => {
  let comment = {
    ...req.body,
    commentedBy: {
      name: req.user.username,
      id: req.user._id
    }
  };

  req.buzz.comments.push(comment);
  req.buzz.save().then(buzz => {
    Buzz.findOne(buzz)
      .populate("postedBy")
      .exec((err, buzz) => {
        console.log(buzz);
        if (err) next(err);
        res.json(buzz);
      });
  });
});

//put :buzzId/comments/:comId
//edit a comment

router.put("/:buzzId/comments/:comId", (req, res, next) => {
  if (req.comment.commentedBy == req.user._id) {
    req.comment.text = req.body.text;
    req.comment.updatedAt = Date.now();

    req.buzz.save().then(buzz => {
      Buzz.findOne(buzz)
        .populate("postedBy")
        .exec((err, buzz) => {
          console.log(buzz);
          if (err) next(err);
          res.json(buzz);
        });
    });
  }
});

// delete /:buzzId/comments/:comId
//deleting a comment

router.delete("/:buzzId/comments/:comId", (req, res, next) => {
  if (req.comment.commentedBy.id == req.user._id)
    req.comment.remove(err => {
      req.buzz.save().then(buzz => {
        Buzz.findOne(buzz)
          .populate("postedBy")
          .exec((err, buzz) => {
            console.log(buzz);
            if (err) next(err);
            res.json(buzz);
          });
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
    const isReacted = req.buzz.reactions.findIndex(
      reaction => reaction.reactedBy.id == req.user._id
    );
    if (isReacted < 0) {
      var reaction = {
        type: req.params.type,
        reactedBy: {
          id: req.user._id,
          name: req.user.username
        }
      };
      req.buzz.reactions.unshift(reaction);
    } else {
      req.buzz.reactions[isReacted].type = req.params.type;
    }
  }

  req.buzz.save().then(buzz => {
    Buzz.findOne(buzz)
      .populate("postedBy")
      .exec((err, buzz) => {
        console.log(buzz);
        if (err) next(err);
        res.json(buzz);
      });
  });
});

//delete reaction
//unreact buzz

router.delete("/:buzzId/unreact", (req, res, next) => {
  const reactions = req.buzz.reactions.filter(
    reaction => reaction.reactedBy.id != req.user._id
  );
  console.log(reactions);

  req.buzz.reactions = [...reactions];

  req.buzz.save().then(buzz => {
    Buzz.findOne(buzz)
      .populate("postedBy")
      .exec((err, buzz) => {
        console.log(buzz);
        if (err) next(err);
        res.json(buzz);
      });
  });
});

module.exports = router;
