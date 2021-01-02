var cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: "dsbx0t4g3",
  api_key: "653991295757619",
  api_secret: "WYtGHRRw3hMuiqxxeOcACKOFte8",
});

module.exports = cloudinary;
