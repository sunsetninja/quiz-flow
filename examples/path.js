const { makePair } = require("../src/utils.js");
const { isPathValid } = require("../src/is-path-valid.js");
const survey = require("./fixtures/survey.json");

const isValid = isPathValid(survey.flow, [
  makePair(100, 101),
  makePair(1000, 1001),
  makePair(2000, 2001),
  makePair(3000, 3001),
  makePair(30011, 300112),
  makePair(30012, 300121),
  makePair(4000, 4002),
  makePair(200, 201),
  makePair(2011, 20111),
  makePair(201111, 2011111),
  makePair(201112, 2011121),
  makePair(300, [301, 302]),
  makePair(3011, 30111),
  makePair(301111, 3011111),
  makePair(3021, 30211),
  makePair(3022, 30221),
]);

console.log({ isValid });
