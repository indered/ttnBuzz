const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const authRoutes = require("./routes/auth-routes");
const buzzRoutes = require("./routes/buzz-routes");
const complaintRoutes = require("./routes/complaint-routes");
const profileRoutes = require("./routes/profile-routes");
const userRoutes = require("./routes/user-routes");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
const authCheck = require("./middlewares/authCheck");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: [
    // 'http://localhost:3000',
    // 'http://www.milq.com:3000',
    // 'http://www.milq.com:8000',
    // 'https://editor.swagger.io',
    // 'http://localhost:4200',
    // 'http://localhost:8080',
    /[a-z0-9]*/
    // 'http://161.221.119.*:8080',
    // /http:\/\/161\.221\.119\.[0-9]*\:8080/,
    // /http:\/\/10\.1\.201\.[0-9]*:3000/,
  ],
  credentials: true
};

// set view engine
app.set("view engine", "ejs");

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set up session cookies
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);
// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log("connected to mongodb");
});

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE");
//     return res.status(200).json({});
//   }
//   next();
// });

var logger = require("morgan");

app.use(logger("dev"));

// set up routes
app.use("/auth", authRoutes);
app.use("/user", authCheck, userRoutes);
app.use("/buzz", buzzRoutes);
app.use("/profile", authCheck, profileRoutes);
app.use("/complaint", authCheck, complaintRoutes);

var jsonParser = bodyParser.json;

// create home route
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.listen(3000, () => {
  console.log("app now listening for requests on port 3000");
});
