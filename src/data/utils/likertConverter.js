export const likertConverter = (responses, minStatement, maxStatement) => {
  const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

  let SD = [];
  let D = [];
  let SWD = [];
  let N = [];
  let SWA = [];
  let A = [];
  let SA = [];

  for (let i = minStatement; i <= maxStatement; i++) {
    let ratings = responses.map((response) => (i < 10 ? parseInt(response.ratings["s0" + i]) : parseInt(response.ratings["s" + i])));

    let SDCount = countOccurrences(ratings, 1);
    let DCount = countOccurrences(ratings, 2);
    let SWDCount = countOccurrences(ratings, 3);
    let NCount = countOccurrences(ratings, 4);
    let SWACount = countOccurrences(ratings, 5);
    let ACount = countOccurrences(ratings, 6);
    let SACount = countOccurrences(ratings, 7);

    SD.push(-SDCount);
    D.push(-DCount);
    SWD.push(-SDCount);
    N.push(-NCount);
    SWA.push(SACount);
    A.push(ACount);
    SA.push(SACount);
  }

  return {
    SD,
    D,
    SWD,
    SWA,
    N,
    A,
    SA,
  };
};
