export const likertConverter = (responses, minStatement, maxStatement) => {
  const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

  let SD = [];
  let D = [];
  let N = [];
  let A = [];
  let SA = [];

  for (let i = minStatement; i <= maxStatement; i++) {
    let ratings = responses.map((response) => (i < 10 ? parseInt(response.ratings["s0" + i]) : parseInt(response.ratings["s" + i])));

    let SDCount = countOccurrences(ratings, 1);
    let DCount = countOccurrences(ratings, 2);
    let NCount = countOccurrences(ratings, 3);
    let ACount = countOccurrences(ratings, 4);
    let SACount = countOccurrences(ratings, 5);

    SD.push(-SDCount);
    D.push(-DCount);
    N.push(-NCount);
    A.push(ACount);
    SA.push(SACount);
  }

  return {
    SD,
    D,
    N,
    A,
    SA,
  };
};
