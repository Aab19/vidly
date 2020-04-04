const config = require("config");

module.exports = function() {
  if (!config.get("jwtPrivateKey")) {
    console.error("FATAL ERROR");
    throw new Error("FATAL ERROR: jwtPrivateKeyis not defined.");
  }
};
