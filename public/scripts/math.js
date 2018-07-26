function borda(n, rank) {
  return n - rank;
}

function sum(arr) {
  let sum = 0;
  for (let num of arr) {
    sum += num;
  }
  return sum;
}

function generateRandomString(input) {
  const chars = "12345678901234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
  const rando = [];
  for (let i = 0; i < input; i++) {
    rando.push(chars.charAt(Math.floor(Math.random() * chars.length)));
  }
  return rando.join('');
}

let arr = [3,2,1,4]

function getPoints(arr) {
  let scores = [];
  for (let i = 1; i <= arr.length; i++) {
    scores.push(arr.length - (arr.indexOf(i) + 1));
  }
  return scores;
}

module.exports = { generateRandomString };
