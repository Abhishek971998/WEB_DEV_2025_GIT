// 1. Reverse a String
function reverseString(str) {
  return str.split("").reverse().join("");
}
console.log(reverseString("hello")); // Output: "olleh"

// 2. Check if a String is a Palindrome
function isPalindrome(str) {
  return str === str.split("").reverse().join("");
}
console.log(isPalindrome("racecar")); // Output: true
console.log(isPalindrome("hello")); // Output: false

// 3. Remove Duplicates from a String
function removeDuplicates(str) {
  return [...new Set(str)].join("");
}
console.log(removeDuplicates("banana")); // Output: "ban"

// 4. Find the First Non-Repeating Character
function firstNonRepeatingChar(str) {
  for (let char of str) {
    if (str.indexOf(char) === str.lastIndexOf(char)) {
      return char;
    }
  }
  return null;
}
console.log(firstNonRepeatingChar("swiss")); // Output: "w"

// 5. Count the Occurrences of Each Character
function charCount(str) {
  let count = {};
  for (let char of str) {
    count[char] = (count[char] || 0) + 1;
  }
  return count;
}
console.log(charCount("banana")); // Output: { b: 1, a: 3, n: 2 }

// 6. Reverse Words in a Sentence
function reverseWords(sentence) {
  return sentence.split(" ").reverse().join(" ");
}
console.log(reverseWords("hello world")); // Output: "world hello"

// 7. Check if Two Strings are Anagrams
function isAnagram(str1, str2) {
  return str1.split("").sort().join("") === str2.split("").sort().join("");
}
console.log(isAnagram("listen", "silent")); // Output: true
console.log(isAnagram("hello", "world")); // Output: false

// 8. Find the Longest Substring Without Repeating Characters
function longestUniqueSubstring(str) {
  let seen = new Set(),
    left = 0,
    maxLength = 0;
  for (let right = 0; right < str.length; right++) {
    while (seen.has(str[right])) {
      seen.delete(str[left++]);
    }
    seen.add(str[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
}
console.log(longestUniqueSubstring("abcabcbb")); // Output: 3

// 9. Convert a String to an Integer (atoi Implementation)
function myAtoi(str) {
  return parseInt(str, 10) || 0;
}
console.log(myAtoi("42")); // Output: 42
console.log(myAtoi("-42")); // Output: -42

// 10. Compress a String (Run-Length Encoding)
function runLengthEncoding(str) {
  let encoded = "",
    count = 1;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) {
      count++;
    } else {
      encoded += str[i] + count;
      count = 1;
    }
  }
  return encoded;
}
console.log(runLengthEncoding("aaabbc")); // Output: "a3b2c1"

// 11. Find the Most Frequent Character
function mostFrequentChar(str) {
  let count = {},
    maxChar = "",
    maxCount = 0;
  for (let char of str) {
    count[char] = (count[char] || 0) + 1;
    if (count[char] > maxCount) {
      maxCount = count[char];
      maxChar = char;
    }
  }
  return maxChar;
}
console.log(mostFrequentChar("banana")); // Output: "a"

// 12. Find All Substrings of a Given String
function findAllSubstrings(str) {
  let substrings = [];
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      substrings.push(str.substring(i, j));
    }
  }
  return substrings;
}
console.log(findAllSubstrings("abc")); // Output: ["a", "ab", "abc", "b", "bc", "c"]

// 13. Check if a String is a Rotation of Another String
function isRotation(str1, str2) {
  return str1.length === str2.length && (str1 + str1).includes(str2);
}
console.log(isRotation("abcde", "cdeab")); // Output: true
console.log(isRotation("abc", "acb")); // Output: false

// 14. Remove All White Spaces from a String
function removeWhiteSpaces(str) {
  return str.replace(/\s/g, "");
}
console.log(removeWhiteSpaces("Hello World")); // Output: "HelloWorld"

// 15. Check if a String is a Valid Shuffle of Two Strings
function isValidShuffle(str1, str2, result) {
  return (
    (str1 + str2).split("").sort().join("") === result.split("").sort().join("")
  );
}
console.log(isValidShuffle("abc", "def", "adbcef")); // Output: true
console.log(isValidShuffle("abc", "def", "abdecf")); // Output: false

// 16. Convert a String to Title Case
function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
console.log(toTitleCase("hello world")); // Output: "Hello World"

// 17. Find the Longest Common Prefix
function longestCommonPrefix(strs) {
  if (!strs.length) return "";
  let prefix = strs[0];
  for (let str of strs) {
    while (str.indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return "";
    }
  }
  return prefix;
}
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // Output: "fl"

// 18. Convert a String to a Character Array
function toCharArray(str) {
  return [...str];
}
console.log(toCharArray("hello")); // Output: ['h', 'e', 'l', 'l', 'o']

// 19. Replace Spaces with %20 (URL Encoding)
function urlEncode(str) {
  return str.split(" ").join("%20");
}
console.log(urlEncode("Hello World")); // Output: "Hello%20World"

// 20. Convert a Sentence into an Acronym
function toAcronym(str) {
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("");
}
console.log(toAcronym("North Atlantic Treaty Organization")); // Output: "NATO"

// 21. Check if a String Contains Only Digits
function containsOnlyDigits(str) {
  return /^\d+$/.test(str);
}
console.log(containsOnlyDigits("12345")); // Output: true
console.log(containsOnlyDigits("123a5")); // Output: false

// 22. Find the Number of Words in a String
function wordCount(str) {
  return str.trim().split(/\s+/).length;
}
console.log(wordCount("Hello world!")); // Output: 2

// 23. Remove a Given Character from a String
function removeCharacter(str, charToRemove) {
  return str.split(charToRemove).join("");
}
console.log(removeCharacter("banana", "a")); // Output: "bnn"

// 24. Find the Shortest Word in a String
function shortestWord(str) {
  return str
    .split(" ")
    .reduce((shortest, word) =>
      word.length < shortest.length ? word : shortest
    );
}
console.log(shortestWord("I am learning JavaScript")); // Output: "I"

// 25. Find the Longest Palindromic Substring
function longestPalindromicSubstring(s) {
  if (!s) return "";
  let start = 0,
    maxLength = 1;
  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return [left + 1, right - 1];
  }
  for (let i = 0; i < s.length; i++) {
    let [l1, r1] = expandAroundCenter(i, i);
    let [l2, r2] = expandAroundCenter(i, i + 1);
    if (r1 - l1 + 1 > maxLength) {
      start = l1;
      maxLength = r1 - l1 + 1;
    }
    if (r2 - l2 + 1 > maxLength) {
      start = l2;
      maxLength = r2 - l2 + 1;
    }
  }
  return s.substring(start, start + maxLength);
}
console.log(longestPalindromicSubstring("babad")); // Output: "bab" or "aba"
