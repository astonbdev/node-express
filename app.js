/** Simple demo Express app. */

const express = require("express");
const app = express();

// useful error class to throw
const { NotFoundError } = require("./expressError");
const {findMean, findMode, findMedian} = require("./stats.js");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function(req, res){
  //console.log("req.query", req.query);
  //console.log("req.params.nums", req.params.nums);
  let passedNums = req.query.nums;
  passedNums = passedNums.split(",");
  passedNums = passedNums.map(num => Number(num));
  //console.log(passedNums);
  const mean = findMean(passedNums);

  return res.json({
    operation: "mean",
    value: mean
  });

});

/** Finds median of nums in qs: returns {operation: "median", result } */


/** Finds mode of nums in qs: returns {operation: "mean", result } */


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;