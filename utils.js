const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  if (!strNums) {
    throw new BadRequestError("Nums are required");
  }
  let passedNums = strNums.split(",");

  return passedNums.map(
    function (num) {
      console.log("started running");
      if (isNaN(Number(num))) {
        console.log("got the error");
        throw new BadRequestError(`Non number input ${num}`);
      }
      else {
        return Number(num);
      }
    });
}


module.exports = { convertStrNums };