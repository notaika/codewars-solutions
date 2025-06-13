/*6 kyu - Duplicate Encoder ~~~~~~~~~~~~~~
The goal of this exercise is to convert a string to a new string where each character in the new string is "(" if that character appears only once in the original string, or ")" if that character appears more than once in the original string. Ignore capitalization when determining if a character is a duplicate.

Input: string
Output: string
Character each character in new string is:
    - "(" char only appears once
    - ")" char appears more than once

Solution Ideas: ~~~~~~~~~~~~~~
    - Using object, key:value pair the counts of each char within the string
    - Turn string into array, lowercase and split
    - Reduce array to a single string using condition:
        - Accumulator will be intilized with empty string
        - For the current item in the array that matches a key in the object:
            - If that value > 1, return accumulator + "("
            - Else, return accumulator + ")" 

Edge cases: ~~~~~~~~~~~~~~
    - Return nothing if string is empty?
    - White spaces count as chars
*/

// Submitted Solution: ~~~~~~~~~~~~~~
function duplicateEncode(word) {
  const reference = {};

  for (const char of word.toLowerCase()) {
    // if object key doesn't exist, create it and add 1; exists? add 1.
    reference[char] = (reference[char] || 0) + 1;
  }

  return word
    .toLowerCase()
    .split("")
    .reduce((accStr, currChar) => (reference[currChar] > 1 ? accStr + ")" : accStr + "("), "");
}

// Tests: ~~~~~~~~~~~~~~
console.log(duplicateEncode("din"));
console.log(duplicateEncode("recede"));
console.log(duplicateEncode("Success"));
console.log(duplicateEncode("(( @"));
console.log(duplicateEncode(""));

// Time it took to solve: 35 mins.

/*
Things to improve on: ~~~~~~~~~~~~~~
- Variable naming -> reference can be named better, maybe "charCounts" or "frequency" to make it more readable/have more sense what the object represents.
- Using .map().join("") for readability and a little bit more intuitive. I used reduce because in my head, I was reducing it to a single string, but the logic is a bit more confusing...
- Since word.toLowerCase() showed up twice, avoid duplication just by storing it once. Example: lower = word.toLowerCase();
*/

// ======================= A better solution =======================

function duplicateEncode2(word) {
  const charCounts = {};
  const lower = word.toLowerCase();

  for (const c of lower) {
    charCounts[c] = (charCounts[c] || 0) + 1;
  }

  // since a string is an iterable, you can use the spread operator to create a shallow copy of the word array; avoids having to use .split("") method and just modern syntax
  return [...lower].map(c => charCounts[c] > 1 ? ')' : '(').join('');
}

// ======================= Another solution by: YpuaH =======================

function duplicateEncode3(word){
  return word
    .toLowerCase()
    .split('')
    .map( function (a, i, w) {
      return w.indexOf(a) === w.lastIndexOf(a) ? '(' : ')'
    })
    .join('');
};

/* 
More readable and shorter solution and honestly makes more sense to me. * However, this has more loops = O(n^2) in time complexity vs. my sol'n of O(n).

It checks if the first index and the last index of the array are equal or not. If it's true (at the same index), it means that it was only in the array once; if it's false (not at the same index) then it means it showed up multiple times. Print the paretheses depending on those conditions then.
*/