function error(err, req, res, next) {
  console.log(err, err.message);
  res.status(500).send("Something failed");
}

module.exports = error;
