// eslint-disable-next-line no-unused-vars
function GCPD(a, b) {
  // tìm thừa số
  function solve(n) {
    let array = [];
    for (let i = 2; i <= Math.sqrt(n); i++) {
      while (n % i === 0) {
        array.push(i);
        n /= i;
      }
    }
    if (n > 2) {
      array.push(n);
    }
    return array;
  }

  function greatestCommonPrimeDivisor(s, c) {
    let array = [];
    let array1 = solve(s);
    let array2 = solve(c);
    for (let i = 0; i < array1.length; i++) {
      for (let j = 0; j < array2.length; j++) {
        if (array1[i] === array2[j]) {
          array.push(array1[i]);
        }
      }
    }
    if (array.length === 0) {
      return -1;
    }
    let result = array[0];
    for (let i = 1; i < array.length; i++) {
      if (result < array[i]) {
        result = array[i];
      }
    }

    return result;
  }
  return greatestCommonPrimeDivisor(a, b);
}

console.log(GCPD(12, 18));
