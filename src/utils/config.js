// import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config();
require('dotenv').config()

module.exports = {
  domain: process.env.HTTP_DEVCO_API || "http://localhost:8080/v1/",
  // domain: "http://18.188.128.199:3001/"
};
