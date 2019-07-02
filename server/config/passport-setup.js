const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");
const User = require("../models/user-model").User;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      // check if user already exists in our own db
      User.findOne({ googleId: profile.id }).then(currentUser => {
        if (currentUser) {
          // already have this user
          console.log("user is: ", currentUser);
          done(null, currentUser);
        } else {
          // if not, create user in our db

          let url = profile.photos[0].value.replace("s50", "");
          let email = profile.emails[0].value;
          if (email === "mahesh.singh@tothenew.com") {
            new User({
              googleId: profile.id,
              username: profile.displayName,
              picture: url,
              email: email,
              isAdmin: true,
              department: "Administration"
            })
              .save()
              .then(newUser => {
                done(null, newUser);
              });
          } else {
            new User({
              googleId: profile.id,
              username: profile.displayName,
              picture: url,
              email: email
            })
              .save()
              .then(newUser => {
                done(null, newUser);
              });
          }
        }
      });
    }
  )
);
