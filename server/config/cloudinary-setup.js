var config = require("cloudinary").config;
var keys = require("../config/keys");

const cloudinaryConfig = () => {
  config({
    cloud_name: keys.cloudinary.cloudName,
    api_key: keys.cloudinary.apiKey,
    api_secret: keys.cloudinary.apiSecret
  });

  next();
};
module.exports = { cloudinaryConfig, uploader };
