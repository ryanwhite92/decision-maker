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