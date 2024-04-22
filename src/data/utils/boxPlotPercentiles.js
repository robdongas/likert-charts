import { statements } from "../statements";

// Get any percentile from an array
const getPercentile = (data, percentile) => {
  data.sort(numSort);
  var index = (percentile / 100) * data.length;
  var result;
  if (Math.floor(index) == index) {
    result = (data[index - 1] + data[index]) / 2;
  } else {
    result = data[Math.floor(index)];
  }
  return result;
};

const numSort = (a, b) => {
  return a - b;
};

const getBoxValues = (data) => {
  var boxValues = [];
  boxValues.push(Math.min.apply(Math, data));
  boxValues.push(getPercentile(data, 25));
  boxValues.push(getPercentile(data, 50));
  boxValues.push(getPercentile(data, 75));
  boxValues.push(Math.max.apply(Math, data));
  return boxValues;
};

const BoxPlot = (responses, minStatement, maxStatement) => {
  let data = [];
  let filteredStatements = statements.slice(minStatement - 1, maxStatement);
  filteredStatements.forEach((statement, statementIndex) => {
    let statementResponses = [];
    responses.forEach((response) => {
      let sIndex = "";
      statementIndex + 1 < 10 ? (sIndex = `s0${statementIndex+1}`) : (sIndex = `s${statementIndex+1}`);
      statementResponses.push(parseInt(response.ratings[sIndex]));
    });

    data.push({
      x: `Statement ${statementIndex + 1}`,
      y: getBoxValues(statementResponses),
    });
  });
  return data;
};
export default BoxPlot;
