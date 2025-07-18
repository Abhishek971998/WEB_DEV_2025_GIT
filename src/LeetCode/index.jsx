Day1: 
// Leetcode 217. Contains Duplicate
// Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.
// Example 1:
// Input: nums = [1,2,3,1]
// Output: true
// Example 2:
// Input: nums = [1,2,3,4]
// Output: false
// ----------------------------------------
// Time complexity: O(n)
// Space complexity: O(n)
var containsDuplicate = function(nums) {
    const s = new Set(nums); 
    return s.size !== nums.length
}
// ----------------------------------------
var containsDuplicate = function(nums) {
    nums.sort((a,b) => a-b);
    for(let i = 0; i <= nums.length-1; i++){
        if(nums[i] === nums[i+1]){
            return true
        }
    }
    return false
};
// ----------------------------------------
var containsDuplicate = function(nums) {
    const s = new Set(nums);
    if(s.size !== nums.length)
        return true
    return false;
   
};
// ----------------------------------------
var containsDuplicate = function (nums) {
  return [...new Set(nums)].length !== nums.length;
};
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Day 2:
// Generate Fibonacci series:

function generateFibonacci(n) {
  const fibonacciSeries = [0, 1];
  for (let i = 2; i < n; i++) {
    const nextFibonacci = fibonacciSeries[i - 2] + fibonacciSeries[i - 1];
    fibonacciSeries.push(nextFibonacci);
  }
  return fibonacciSeries;
}
const fibonacciOutput = generateFibonacci(6);
console.log(fibonacciOutput);
// -------------------------------------------------------------------------------------------------------------------------------------------------------
// Day 3: Two Sum
// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

var twoSum = function(nums, target) {
    for(i=0;i<nums.length;i++){
        for(j=i+1;j<nums.length;j++){
            if(nums[i]+nums[j]===target){
                let output = [i,j];
                return output;
            }
        }
    }
};
// ----------------------------------------
function twoSum_(arr, target) {
  let obj = {};

  for (let i = 0; i < arr.length; i++) {
    if (target - arr[i] in obj) {
      return [obj[target-arr[i]], i];
    } else {
      obj[arr[i]] = i;
    }
  }
  return [];
};
// ----------------------------------------
function twoSum__(nums, target) {
  let vals = {};

  for (let i = 0; i < nums.length; i++) {
    if (target - nums[i] in vals) {
      return [vals[target-nums[i]], i];
    } else {
      vals[nums[i]] = i;
    }
  }
  return [];
};
// ----------------------------------------
var twoSum = function(nums, target) {
       const map = {};
    for(let i = 0; i < nums.length; i++){
        const diff = target - nums[i];
        if(map.hasOwnProperty(diff)){
           return [map[diff], i];
			break;
        }
        map[nums[i]] = i;
    }
    
    return result;
};
// ------------------------------------------------------------------------------------------------------------------------------------------------
// Day 4:
// Given an array nums of size n, return the majority element.
// The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.
// Example 1:
// Input: nums = [3,2,3]
// Output: 3

var majorityElement = function(nums) {
    let map = {}
    for(let item of nums){
        if(!map[item]) {
            map[item] = 1;
        } else {
            map[item]++;
        }
        if (map[item] >= nums.length/2) return item
    }
};
// ------------------------------------------------------------------------------------------------------------------------------------------------
// Day 5: Find Words Containing Character
// Input: words = ["leet","code"], x = "e"
// Output: [0,1]
// Explanation: "e" occurs in both words: "leet", and "code". Hence, we return indices 0 and 1.

var findWordsContaining = function(words, x) {
    return words.reduce((acc, curr, i) => 
                            curr.includes(x)
                            ? [...acc, i]
                            : acc, 
                        [])
};

var findWordsContaining = function(words, x) {
    return words.reduce((acc, curr, i) => 
                            curr.indexOf(x) > -1 
                            ? [...acc, i]
                            : acc, 
                        [])
};

const findWordsContaining_ = (words, x) => {
  const res = [];
  words.forEach((word, index) => {
    if (word.includes(x)) res.push(index);
  });
  return res;
};

function findWordsContaining__(words, x) {
    let indices = [];
    for (let i = 0; i < words.length; i++) {
        if (words[i].includes(x)) {
            indices.push(i);
        }
    }
    return indices;
} 

var findWordsContaining = function(words, x) {
    let out = []
    words.map((word , index)=>{
        if(word.includes(x)){
            out.push(index)
        }
    })
    return out
};
// ----------------------------------------------------------------------------------------------------------------------------------------------------
// Day 6: Running Sum of 1d Array

// Input: nums = [1,2,3,4]
// Output: [1,3,6,10]
// Explanation: Running sum is obtained as follows: [1, 1+2, 1+2+3, 1+2+3+4].

/*var runningSum = function(nums) {
    let result=[]; let sum=0;
    for(let i=0; i<nums.length; i++){
      sum=sum+nums[i]
      result.push(sum);
    }
    return result;  
}*/

const runningSum = nums => {
  let sum = 0;
  return nums.map(num => sum += num);
};
// ----------------------------------------------------------------------------------------------------------------------------------------------------
// Day 7: Number of Good Pairs

// Input: nums = [1,2,3,1,1,3]
// Output: 4
// Explanation: There are 4 good pairs (0,3), (0,4), (3,4), (2,5) 0-indexed.

/*var numIdenticalPairs = function(nums) {
  let pair=0
  for(let i=0;i<nums.length;i++){
    for(let j=i+1; j<nums.length;j++){
       if(nums[i] === nums[j]){
         pair++;
       }
    }
  }  
  return pair;
};*/

var numIdenticalPairs = function(nums) {
    let count = {};
    let result = 0;

    for (let num of nums) {
        if (num in count) {
            result += count[num];
            count[num]++;
        } else {
            count[num] = 1;
        }
    }

    return result;
};
// ------------------------------------------------------------------------------------------------------------------------------------------------------
// Day 8: Check If Two String Arrays are Equivalent

// Input: word1 = ["ab", "c"], word2 = ["a", "bc"]
// Output: true
// Explanation:
// word1 represents string "ab" + "c" -> "abc"
// word2 represents string "a" + "bc" -> "abc"
// The strings are the same, so return true.

/*var arrayStringsAreEqual = function(word1, word2) {
        let left = ""; // Initialize left and right to empty strings
        let right = "";

        // Concatenate strings in word1
        for (let i = 0; i < word1.length; i++) {
            left += word1[i];
        }

        // Concatenate strings in word2
        for (let i = 0; i < word2.length; i++) {
            right += word2[i];
        }

        // Use equals() method to compare strings
        return left === right;

};*/
1
function arrayStringsAreEqual(word1, word2) {
    let s1 = word1.join('');
    let s2 = word2.join('');

    return s1 === s2;
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------
// Day 9: How Many Numbers Are Smaller Than the Current Number 

// Input: nums = [8,1,2,2,3]
// Output: [4,0,1,1,3]
// Explanation: 
// For nums[0]=8 there exist four smaller numbers than it (1, 2, 2 and 3). 
// For nums[1]=1 does not exist any smaller number than it.
// For nums[2]=2 there exist one smaller number than it (1). 
// For nums[3]=2 there exist one smaller number than it (1). 
// For nums[4]=3 there exist three smaller numbers than it (1, 2 and 2).


/*var smallerNumbersThanCurrent = function (nums) {
  let res = [];

  for (const i of nums) {
    const c = nums.reduce((count, num) => {
      if (num < i) count++;
      return count;
    }, 0);
    res.push(c);
  }

  return res;
};

var smallerNumbersThanCurrent = function(nums) {
    const num=[...nums]
    num.sort((a,b)=>a-b)
    for(let i=0;i<nums.length;i++){
        nums[i]=num.indexOf(nums[i])
    }
    return nums
}; */

var smallerNumbersThanCurrent = function(nums) {
    let ar = []
   
    for(let i = 0 ; i<nums.length; i++){
         let count = 0
        for(let j=0 ; j<nums.length; j++){
            if(nums[j] < nums[i]){
                count++;    
            } 
        }
        ar.push(count)
    }
    return ar
};
// ------------------------------------------------------------------------------------------------------------------------------------------------------
// Day 9: Sort Array by Increasing Frequency
// Input: nums = [1,1,2,2,2,3]
// Output: [3,1,1,2,2,2]
// Explanation: '3' has a frequency of 1, '1' has a frequency of 2, and '2' has a frequency of 3.

/*var frequencySort = function(nums) {
    const counts = [];
    for(let i = 0; i < nums.length; i++) {
        counts[nums[i]] = counts[nums[i]] ? counts[nums[i]] + 1 : 1;
    }
    return nums.sort((a, b) => {
        if (counts[a] > counts[b]) {
            return 1;
        } else if (counts[a] < counts[b]) {
            return -1;
        }
        return b - a;
    });
};*/

var frequencySort = function(nums) {
    const obj={}
    for (let num of nums){
        if(!obj[num]){
            obj[num]=1
        }else{
            obj[num]++
        }
    }

  return nums.sort((a,b)=>{
      const countOfA=obj[a]
      const countOfB=obj[b]
      if(countOfA!=countOfB) return countOfA-countOfB
      else return b-a
  })
    
};
// -----------------------------------------------------------------------------------------------------------------------------------------------------
// Day 10: Valid Parentheses

// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
// An input string is valid if:
// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Every close bracket has a corresponding open bracket of the same type.
// Input: s = "()"
// Output: true

var isValid = function(s) {
    if (s.length <=1) return false
    
    let stack = []
    let hash = {
        '(' : ')',
        '[' : ']',
        '{' : '}'
    }
    
    for(let i = 0; i < s.length; i++){
        if (hash[s[i]]) stack.push(hash[s[i]])
        else if (s[i] !== stack.pop()) return false
    }
    return !stack.length
};
console.log(isValid("{}[]"))
/*var isValid = function(s) {
    if (s.length === 0) {
        return true;
    }
    
    const stack = [];
    const bracketMap = {
        ")": '(',
        "]": '[',
        "}": '{',
    };
    
    for(let i = 0; i < s.length; i++) {
        if (s[i] === '(' || s[i] === '[' || s[i] === '{') {
		    // add open brackets in the stack
            stack.push(s[i]);
        } else {
		    // remove the latest item in stack if it matches the current closing bracket
            if (stack[stack.length - 1] === bracketMap[s[i]]) {
                stack.pop();
            } else {
                return false;
            }
            
        } 
    }
    // string is valid if all matching brackets are removed from the stack
    return stack.length === 0;
};*/
// -----------------------------------------------------------------------------------------------------------------------------------------------------
// Day 11: Fizz Buzz
// Example 1:

// Input: n = 3
// Output: ["1","2","Fizz"]
// Example 2:

// Input: n = 5
// Output: ["1","2","Fizz","4","Buzz"]

/*var fizzBuzz = function(n) {
    var ans = [];

    for (var i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            ans.push("FizzBuzz");
        } else if (i % 3 === 0) {
            ans.push("Fizz");
        } else if (i % 5 === 0) {
            ans.push("Buzz");
        } else {
            ans.push(i.toString());
        }
    }

    return ans;    
};*/
var fizzBuzz = function(n) {
    let arr = [];
    let i = 1;
    
    while (i <= n){
        if (i % 3 == 0 & i % 5 == 0) arr.push("FizzBuzz");
        else if (i % 3 == 0) arr.push("Fizz");
        else if (i % 5 == 0) arr.push("Buzz");
        else arr.push(i.toString());
        i++;
    }
    return arr;
};
// ------------------------------------------------------------------------------------------------------------------------------------------------------
// Day 12: Truncate Sentence
// Input: s = "Hello how are you Contestant", k = 4
// Output: "Hello how are you"
// Explanation:
// The words in s are ["Hello", "how" "are", "you", "Contestant"].
// The first 4 words are ["Hello", "how", "are", "you"].
// Hence, you should return "Hello how are you".

var truncateSentence = function(s, k) {
      return s.split(' ').slice(0,k).join(' ')
};
------------------------------------------------------------------------------------------------------------------------------------------------------
Day 13: Check if All A's Appears Before All B's.

Given a string s consisting of only the characters 'a' and 'b', return true if every 'a' appears before every 'b' in the string. Otherwise, 
return false.
Example 1:
Input: s = "aaabbb"
Output: true
Explanation:
The 'a's are at indices 0, 1, and 2, while the 'b's are at indices 3, 4, and 5. Hence, every 'a' appears before every 'b' and we return true.


/*var checkString = function(s) {
    let ss=s.split('').sort().join('')
    return ss==s   
};

var checkString = function(s) {
    for(let i=0;i<s.length;i++){
        if(s[i]=='b' && s[i+1]=='a'){
            return false;
        }
    }
    return true
}; 

var checkString = function (s) {
    return s.indexOf("ba") === -1;    // is no  a  after  b ?
};*/

const checkString = (s) => {
    let flag = false;

    for (const ch of s) {
        if (ch === 'b') {
            flag = true;
        }

        if (flag && ch === 'a') {
            return false;
        }
    }

    return true;
};
// ------------------------------------------------------------------------------------------------------------------------------------------------------
// Day 14: 

/*var isAcronym = function(words, s) {
    var res="";
    for(let i=0; i<words.length;i++){
      res= res+words[i][0];
    }
    if(res==s){
        return true;
    }
    return false;
};
var isAcronym = function (words, s) {
  if (words.length !== s.length ) return false;

  for (let i = 0; i < words.length; i++) {
    if (words[i][0] !== s[i]) return false;
  }
  
  return true;
};
const isAcronym = (words, s) => s === words.map( w => w[0]).join('')*/
var isAcronym = function(words, s) {
    return words.length === s.length && words.every((v, i) => v[0] === s[i]);
};

------------------------------------------------------------------------------------------------------------------------------------------------------
Day 15: Check if a String Is an Acronym of Words

Input: words = ["alice","bob","charlie"], s = "abc"
Output: true
Explanation: The first character in the words "alice", "bob", and "charlie" are 'a', 'b', and 'c', respectively. Hence, s = "abc" is the acronym. 
/*var isAcronym = function(words, s) {
    var res="";
    for(let i=0; i<words.length;i++){
      res= res+words[i][0];
    }
    if(res==s){
        return true;
    }
    return false;
};
var isAcronym = function (words, s) {
  if (words.length !== s.length ) return false;

  for (let i = 0; i < words.length; i++) {
    if (words[i][0] !== s[i]) return false;
  }
  
  return true;
};
const isAcronym = (words, s) => s === words.map( w => w[0]).join('')*/
var isAcronym = function(words, s) {
    return words.length === s.length && words.every((v, i) => v[0] === s[i]);
};



------------------------------------------------------------------------------------------------------------------------------------------------------
Day 16:  Isomorphic Strings
All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

 

Example 1:

Input: s = "egg", t = "add"
Output: true
Example 2:

Input: s = "foo", t = "bar"
Output: false

/*var isIsomorphic = function(s, t) {
    
    for (let i=0; i<s.length; i++) {

        if (s.indexOf(s[i]) !== t.indexOf(t[i])) {
            
            return false;
        }
    }
    return true;
};

var isIsomorphic = function (s, t) {
  if (s.length != t.length) return false;
  let sArr = [];
  let tArr = [];
  for (let i = 0; i < s.length; i++) {
    sArr.push(s.indexOf(s[i]));
    tArr.push(t.indexOf(t[i]));
    if (sArr[i] != tArr[i]) return false;
  }
  return true;
};*/

var isIsomorphic = function(s, t) {
    let arr1 = {}
    let arr2 = {}
    for (let i=0;i<s.length;i++) {
        if(arr1[s[i]] !== arr2[t[i]]) {
            return false
        }else{
            arr1[s[i]] = i,
            arr2[t[i]] = i
        }
    }
    return true
};
// ======================================================================================================================================================
// Day 17: Longest Common Prefix

// Input: strs = ["flower","flow","flight"]
// Output: "fl"

/*var longestCommonPrefix = function(strs) {
  if (strs.length === 0) return '';
  let r = '';
  for (let i = 0; i < strs[0].length; i++) {
    for (let j = 1; j < strs.length; j++) {
      if (strs[0][i] !== strs[j][i]) return r;
    }
    r += strs[0][i];
  }
  return r;
};*/

var longestCommonPrefix = function (strs) {
    let output = "";
    for (let i = 0; i < strs[0].length; i++) {
        if(strs.every(str => str[i] === strs[0][i])) output += strs[0][i];
        else break;
    }
    return output;
};
// ======================================================================================================================================================
// Day 18: Reverse String:
// Write a function that reverses a string. The input string is given as an array of characters s.
// You must do this by modifying the input array in-place with O(1) extra memory.

// Input: s = ["h","e","l","l","o"]
// Output: ["o","l","l","e","h"]

/*const reverseString=(arr)=>{
  for(let i=0; i<arr.length/2; i++){
    [arr[i], arr[arr.length-i-1]]=[arr[arr.length-i-1], arr[i]]
  }
  return arr
}*/

var reverseString = function(s) {
    var i = 0;
    var j = s.length - 1;
    while (i < j) {
        [s[i], s[j]] = [s[j], s[i]];
        i++;
        j--;
    }
};

var reverseString = function(s) {
    return s.reverse()
    
};

// ======================================================================================================================================================
// Day 19: Check If String Is a Prefix of Array

Input: s = "iloveleetcode", words = ["i","love","leetcode","apples"]
Output: true
Explanation:
s can be made by concatenating "i", "love", and "leetcode" together.

var isPrefixString = function(s, words) {
    let compareStr = '';

    for (let i = 0; i < words.length; i++) {
        compareStr = compareStr + words[i];
        if (compareStr === s) {
            return true;
        }
    }

    return false;
};
// ======================================================================================================================================================
// Day 20: Valid Anagram

Input: s = "anagram", t = "nagaram"
Output: true

var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;
    return s.split("").sort().join("") === t.split("").sort().join("");
};

// ======================================================================================================================================================
// Day 21 : Check If a Word Occurs As a Prefix of Any Word in a Sentence

Input: sentence = "i love eating burger", searchWord = "burg"
Output: 4
Explanation: "burg" is prefix of "burger" which is the 4th word in the sentence.

/*var isPrefixOfWord = function (sentence, searchWord) {
    let words = sentence.split(' ')

    for (let i = 0; i < words.length; i++) {
        if (words[i].startsWith(searchWord)) return i + 1
    }

    return -1
};*/

function isPrefixOfWord(sentence, searchWord){
  return sentence.split(' ').findIndex(e => e.startsWith(searchWord)) + 1 || -1;
}
// ======================================================================================================================================================
// Day 22: Jewels and Stones

// Example 1:

// Input: jewels = "aA", stones = "aAAbbbb"
// Output: 3
// Example 2:

// Input: jewels = "z", stones = "ZZ"
// Output: 0

/*var numJewelsInStones = function(jewels, stones) {
    let count = 0;

    for(let i=0; i<jewels.length;i++){
        for(let j=0; j<stones.length; j++){
            if(jewels[i]===stones[j]){
               count++;
            }
        }
    }
    return count;
    
};
var numJewelsInStones = function(J, S) {

	// declare a count & length variable 

    let count = 0
    let len = S.length
	
	// Iterate through the longest array S. Increment count by 1 if it exists in J
	
    for (let i = 0; i < len; i++){
        if (J.indexOf(S[i]) >= 0){
            count++
        }
    }
    return count
};

var numJewelsInStones = function(jewels, stones) {
   let count = 0;
   for(let val of stones){
       if(jewels.includes(val)){
           count++;
        }
    }
    return count;
};*/

var numJewelsInStones = function(jewels, stones) {
    return [...stones].reduce((a,e)=>a+jewels.includes(e),0)
};

// ======================================================================================================================================================
// Day 23: Number of Days Between Two Dates

Input: date1 = "2019-06-29", date2 = "2019-06-30"
Output: 1

/*const daysBetweenDates = (date1, date2) => {
    const millisecondsInADay = 1000*60*60*24;    
    return Math.abs((new Date(date1).getTime() - new Date(date2).getTime()) / millisecondsInADay);
}*/
const daysBetweenDates = (D1, D2, DF = Math.abs((new Date(D1) - new Date(D2)))) => DF / (1000 * 60 * 60 * 24)

======================================================================================================================================================
Day 24:  Count Elements With Maximum Frequency

Input: nums = [1,2,2,3,1,4]
Output: 4
Explanation: The elements 1 and 2 have a frequency of 2 which is the maximum frequency in the array.
So the number of elements in the array with maximum frequency is 4.

var maxFrequencyElements = function (nums) {
    const obj = {}
    nums.forEach((n) => obj[n] ? obj[n]++ : obj[n] = 1)

    const max = Math.max(...Object.values(obj))
    return Object.values(obj).reduce((acc, cur) => {
        if (cur == max) {
            acc += cur
        } return acc
    }, 0)
};

======================================================================================================================================================
Day 25: Is Object Empty
Example 1:

Input: obj = {"x": 5, "y": 42}
Output: false
Explanation: The object has 2 key-value pairs so it is not empty.
Example 2:

Input: obj = {}
Output: true
Explanation: The object doesn't have any key-value pairs so it is empty.


/*var isEmpty = function(obj) {
    for (let key in obj)
        return false;
    return true;
};

If array/object is not empty, interpreter will enter the for-in loop and hence first return statement (false) will be executed.
If array/object is empty, interpreter won't enter for-in loop and hence second return statement (true) will be executed.
*/

var isEmpty = function(obj) {
  if (Array.isArray(obj)) {
    return obj.length === 0;
  } else if (typeof obj === 'object') {
    return Object.keys(obj).length === 0;
  }
  return false; 
};

======================================================================================================================================================
Day 26: Longest Valid Parentheses

Input: s = "(()"
Output: 2
Explanation: The longest valid parentheses substring is "()".

function longestValidParentheses(s) {
    let stack = [-1]; // Initialize stack with -1 to handle edge case where the first character is ')'
    let maxLength = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            stack.push(i); // Push the index of an open parenthesis onto the stack
        } else {
            stack.pop(); // Pop the top element from the stack

            if (stack.length === 0) {
                stack.push(i); // If stack becomes empty, push the current index onto the stack
            } else {
                // Calculate the length of the valid substring and update maxLength
                maxLength = Math.max(maxLength, i - stack[stack.length - 1]);
            }
        }
    }

    return maxLength; // Return the length of the longest valid parenthesis substring
}

======================================================================================================================================================
Day 27: Best Time to Buy and Sell Stock II

Input: prices = [7,1,5,3,6,4]
Output: 7
Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
Total profit is 4 + 3 = 7.

/*var maxProfit = function(prices) {
    // Initialize the max profit...
    let maximumProfit = 0;
    // Traverse all the element through loop...
    for (let i = 1; i < prices.length; i++) {
        // check if the price is greater at i...
        if (prices[i] > prices[i - 1])
            // Add the difference to profit and increse it...
            maximumProfit += prices[i] - prices[i - 1];
    }
    return maximumProfit;      // Return the meximum profit...
};

var maxProfit = function(prices) {
    if (prices === null || prices.length === 0) {
        return 0;
    }
    let profit = 0;
    let buyingPrice = prices[0];
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > buyingPrice) {
            profit += prices[i] - buyingPrice;
            buyingPrice = prices[i]; // Re-buying 
        } else if (prices[i] < buyingPrice) {
            buyingPrice = prices[i]; // Better price
        }
    }
    return profit;
    // T.C: O(N)
    // S.C: O(1)
};*/

var maxProfit = function(prices) {
    let diff = 0
    if (prices.length > 0) { // []
        prices.reduce((acc, next) => {
            if (next > acc) {
                diff += next - acc
            }
            return next
        })
    }
    return diff
};

======================================================================================================================================================
Day 28: Find the Duplicate Number
Input: nums = [1,3,4,2,2]
Output: 2

/*var findDuplicate = function(nums) {
    const seen = new Set();
    for (const num of nums) {
        if (seen.has(num)) {
            return num;
        }
        seen.add(num);
    }
    return -1;  // Just to satisfy the compiler, this should never be reached
}

var findDuplicate = function(nums) {
    var freq = {} 
    
    for (var n of nums) {
        if (n in freq) {return n}
        else {freq[n] = 1}
    }
};*/

function findDuplicate(arr){
    let char = {};
  for (let i = 0; i < arr.length; i++) {
    if (char[arr[i]]) {
      return arr[i];
    }
    char[arr[i]] = 1;
  }
  return null;
    }

// function findDuplicate(arr){
//     let newArr=arr.sort()
//     for(let i=0;i<arr.length ;i++){
//         if(newArr[i]==newArr[i+1]){
//             console.log( newArr[i])
//             return newArr[i]
//         }
//     }

// }

======================================================================================================================================================
Day 29: Join Two Arrays by ID
Input: 
arr1 = [
    {"id": 1, "x": 2, "y": 3},
    {"id": 2, "x": 3, "y": 6}
], 
arr2 = [
    {"id": 2, "x": 10, "y": 20},
    {"id": 3, "x": 0, "y": 0}
]
Output: 
[
    {"id": 1, "x": 2, "y": 3},
    {"id": 2, "x": 10, "y": 20},
    {"id": 3, "x": 0, "y": 0}
]
Explanation: The two objects with id=1 and id=3 are included in the result array without modifiction. The two objects with id=2 are merged together. The keys from arr2 override the values in arr1.


/*var join = function(arr1, arr2) {
    const result = {};

    // 1. initialization
    arr1.forEach(item => {
        result[item.id] = item;
    });
    // 2. joining
    arr2.forEach(item => {
        if (result[item.id]) {
            Object.keys(item).forEach(key => {
                result[item.id][key] = item[key];    
            });
        } else {
            result[item.id] = item;
        }
    });

    return Object.values(result);
};

var join = function(arr1, arr2) {
  const combinedArray = arr1.concat(arr2);
  const merged = {};

  combinedArray.forEach((obj) => {
    const id = obj.id;
    if (!merged[id]) {
      merged[id] = { ...obj };
    } else {
      merged[id] = { ...merged[id], ...obj };
    }
  });

  const joinedArray = Object.values(merged);
  joinedArray.sort((a, b) => a.id - b.id);

  return joinedArray;
}; 

var join = function(arr1, arr2) {
    let map={},arrs=[...arr1,...arr2].map((e)=> map[e.id]={...map[e.id],...e})
    return [...Object.values(map)]
};*/

var join = function(arr1, arr2) {
    let items = arr1.concat(arr2);

    let result = {};

    for(const obj of items) {
        if(!result[obj.id]) {
            result[obj.id] = obj;
            continue;
        } 

        result[obj.id] = {...result[obj.id], ...obj};
    }

    return Object.values(result);
};
======================================================================================================================================================
Day 30: Average Value of Even Numbers That Are Divisible by Three

Input: nums = [1,3,6,10,12,15]
Output: 9
Explanation: 6 and 12 are even numbers that are divisible by 3. (6 + 12) / 2 = 9.

/*var averageValue = function(nums) {
    let sum = 0;
    let count = 0;
    for (let n of nums) {
        if (n % 6 === 0) {
            sum += n;
            count++;
        }
    }
    return sum === 0 ? sum : Math.floor(sum / count);
};*/

var averageValue = function(nums) {
nums = nums.filter(a => a % 6 ===0)
return nums.length ? parseInt(nums.reduce((a,b) => a + b )/ nums.length) : 0
};
======================================================================================================================================================
Day 31: Richest Customer Wealth

Input: accounts = [[1,5],[7,3],[3,5]]
Output: 10
Explanation: 
1st customer has wealth = 6
2nd customer has wealth = 10 
3rd customer has wealth = 8
The 2nd customer is the richest with a wealth of 10.

/*var maximumWealth = function(accounts) {
        var res = 0;
        for(var i =0;i<accounts.length;i++){
            var temp = 0;
            for(var j = 0;j<accounts[i].length;j++){
                temp+=accounts[i][j];
            }
            res = Math.max(res,temp);
        }
        return res;
};
var maximumWealth = function(accounts) {
    return Math.max(...accounts.map(account => 
        account.reduce((accumulator, current) => accumulator + current, 0)
    ))
};*/

var maximumWealth = function (accounts) {
  let max = 0;

  accounts.forEach((element) => {
    let sum = element.reduce(function (x, y) {
      return x + y;
    }, 0);
    if (max < sum) max = sum;
  });

  return max;
};

======================================================================================================================================================
Feb-Day 1 - Shuffling string

Input: s = "codeleet", indices = [4,5,6,7,0,2,1,3]
Output: "leetcode"
Explanation: As shown, "codeleet" becomes "leetcode" after shuffling.

/*var restoreString = function(s, idx) {
    const result = [];
    for(let i = 0; i < s.length; i++) {
        result[idx[i]] = s[i] //RESULT KE INDEX ME STRING KI VALUE DALNA HAIN
    }
    return result.join('');
};*/

var restoreString = function(s, indices) {
    let keys = {};
    indices.forEach((val, index) => keys[val] = s[index])
    
    return Object.values(keys).join('');
};

======================================================================================================================================================
Feb Day 2: Factorial Trailing Zeroes

Given an integer n, return the number of trailing zeroes in n!.

Note that n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1.

Example 1:

Input: n = 3
Output: 0
Explanation: 3! = 6, no trailing zero.

var trailingZeroes = function(n) {
    // Negative Number Edge Case...
    if (n < 0) return -1;
    // Initialize the output result i.e., the number of trailing zeroes...
	let output = 0;
    // Count number of 5s in prime factors of n!
	for (let idx = 5; n/idx >= 1; idx *= 5) { //n=3, id=5,25...
		output += Math.floor(n/idx);
	}
    // Return the number of trailing zeroes...
    return output;
};

======================================================================================================================================================
Feb Day 3: Is Subsequence

Input: s = "abc", t = "ahbgdc"
Output: true

var isSubsequence = function(s, t) {
        let i = 0, j = 0;
        while (i < s.length && j < t.length) {
            if (s[i] === t[j]) {
                i++;
            }
            j++;
        }
        return i === s.length;
    }

======================================================================================================================================================
Feb Day 4: First Unique Character in a String

Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.
Example 1:

Input: s = "leetcode"
Output: 0

/*var firstUniqChar = function(s) {
    for(i=0; i<s.length; i++)
        if(s.indexOf(s[i])===s.lastIndexOf(s[i])) return i
    return -1
};*/

var firstUniqChar = function(s) {
    let map = {}
    
    for (let char of s) {
        map[char] ? map[char]++ : map[char] = 1
    }
    
    for (let i = 0; i < s.length; i++) {
        if (map[s[i]] === 1) return i
    }
        
    return -1
};

======================================================================================================================================================
Feb Day 5: Find the Difference
Input: s = "abcd", t = "abcde"
Output: "e"
Explanation: 'e' is the letter that was added.

var findTheDifference = function(s, t) {
    return [...t].sort().find((char, i) => char !== [...s].sort()[i])
};
/*var findTheDifference = function(s, t) {
    var sChars = s.split('').sort();
    var tChars = t.split('').sort();
    var i;
    for(i = 0; i < sChars.length; i++) {
        if(tChars[i] !== sChars[i]) {
            return tChars[i];
        }
    }
    return tChars[i];
};*/
/*var findTheDifference = function (s, t) {
    for (let i = 0; i < s.length; i++) {
        t = t.replace(s[i], '')
    }
    return t;
};*/
/*var findTheDifference = function(s, t) {
    for (let letter of s)
        t = t.replace(letter, '');
    return t;
};*/

/*var findTheDifference = function(s, t) {
  var s = s.split("").sort((a,b)=> a-b).join(""); 
  var t = t.split("").sort((a,b)=> a-b).join("");
 // console.log(s,t)
  for(var i =0; i< t.length || s.length; i++){
      if(s[i] != t[i]){
          return t[i]
      }
  }
};
console.log(findTheDifference( "abcd", "abcde"))*/

======================================================================================================================================================
Feb Day 6: Group Anagram

Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

/*const groupAnagrams = strs => {
    const map = {};
    
    for (let str of strs) {
        const key = [...str].sort().join('');

        if (!map[key]) {
            map[key] = [];
        }

        map[key].push(str);
    }
    
    return Object.values(map);
};
//console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]))

var groupAnagrams = function(strs) {
    let map = {}
    
    for (let str of strs) {
        let key = [...str].sort()
        map[key] = map[key] ? [...map[key], str] : [str]
    }
    
    return Object.values(map)
};

======================================================================================================================================================
Feb Day 7: Sort Characters By Frequency

Input: s = "tree"
Output: "eert"
Explanation: 'e' appears twice while 'r' and 't' both appear once.
So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.

/*var frequencySort = function(s) {
    const mp = new Map();
    for (const char of s) {
        mp.set(char, (mp.get(char) || 0) + 1);
    }
    
    const r = new Map([...mp.entries()].sort((a, b) => b[1] - a[1]));
    let ss = '';
    for (const [char, freq] of r.entries()) {
        ss += char.repeat(freq);
    }
    
    return ss;
};

var frequencySort = function(s) {
    
    const charMap = s.split('').reduce((acc, cur) => {acc[cur] = (acc[cur] || 0) + 1; return acc} , {})
    
    const sortedArr = Object.keys(charMap).sort((a, b) => charMap[b] - charMap[a]);
    
    return sortedArr.reduce((acc, cur) => acc + cur.repeat(charMap[cur]) ,'')
};*/

var frequencySort = function(s) {
   var map = {}
   for(var i = 0; i < s.length; i++) {
       map[s[i]] = map[s[i]] ? map[s[i]]+1 : 1
   }
    var keys = Object.keys(map).sort((a, b) => {return map[b] - map[a]})
    return "".concat(...keys.map((item) => {return item.repeat(map[item])}))
};

======================================================================================================================================================
Feb Day 8: Permutations II

Example 1:
Input: nums = [1,1,2]
Output:
[[1,1,2],
 [1,2,1],
 [2,1,1]]

Example 2:
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

var permuteUnique = function(nums) {
// Sort the input array in ascending order to group duplicate numbers together.
nums.sort((a, b) => a - b);

// Initialize an empty array to store the permutations.
let res = [];

// Define a recursive helper function to generate permutations.
let iterate = (arr, temp) => {
// Base case: if the current array contains only one element, add the temporary permutation to the result.
if (arr.length == 1) {
res.push([...temp, arr[0]]);
return;
}

 // Iterate through each element of the array.
 for (let i = 0; i < arr.length; i++) {
     // Skip duplicates to avoid generating duplicate permutations.
     if (arr[i] == arr[i - 1]) {
         continue;
     }

     // Recursively generate permutations by excluding the current element from the array.
     iterate(arr.filter((num, idx) => idx != i), [...temp, arr[i]]);
 }
};

// Start the recursive permutation generation with the initial array and an empty temporary permutation.
iterate(nums, []);

// Return the array of unique permutations.
return res;
};
------------------------------------
Feb Day 9: Combination Sum II
Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: 
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]

/*var combinationSum2 = function(c, target) {
    c.sort((a,b)=>a-b)
    let res = []

    let iterate = (index,sum,temp) =>{
        if(sum>target) return;
        if(sum == target){
            res.push(temp)
            return;
        }
        // 1 1 2 5 6 7 10 
        for(let i =index; i<c.length;i++){
            if(i != index && c[i] == c[i-1]) continue;
            iterate(i+1,sum+c[i],[...temp,c[i]])
        }
    }
    iterate(0,0,[])
    return res;
};*/

var combinationSum2 = function(candidates, target) {
var result = []
candidates.sort((a,b) => a-b)
var helper = function(candidates, target, tmpArr, idx){
    if(target == 0){ // when target reaches zero, means that you can push it into the result
        result.push(tmpArr.slice())
        return
    }
    if(target < 0){ //with recursion, your 'target' might get reduced till below zero and at that point of time it's time to stop the recursion
        return
    }
    for(var i = idx; i < candidates.length; i++){ //simulating whether to take or not to take every single digit
        if(idx == i || candidates[i] != candidates[i - 1]){
            tmpArr.push(candidates[i])
            helper(candidates, target - candidates[i], tmpArr, i + 1)
            tmpArr.pop()    
        }   
    }   
}
helper(candidates, target, [], 0)
return result;
}


function combinationSum2(arr, target) {
    const result = [];
    
    // Sort the array to ensure duplicates are not considered
    arr.sort((a, b) => a - b);
    
    // Helper function to backtrack and find combinations
    function backtrack(startIndex, currentSum, combination) {
        // Base case: if the currentSum equals target, add the combination to the result
        if (currentSum === target) {
            result.push([...combination]);
            return;
        }
        
        // Explore all possible combinations
        for (let i = startIndex; i < arr.length; i++) {
            // Skip duplicates
            if (i > startIndex && arr[i] === arr[i - 1]) continue;
            
            // If adding the current element doesn't exceed the target, backtrack
            if (currentSum + arr[i] <= target) {
                combination.push(arr[i]);
                backtrack(i + 1, currentSum + arr[i], combination);
                combination.pop();
            }
        }
    }
    
    backtrack(0, 0, []);
    return result;
}
---------------------------------------------------------------------------------------------
Feb Day 10- Isomorphic Strings

Input: s = "egg", t = "add"
Output: true

/*var isIsomorphic = function(s, t) {
    
    for (let i=0; i<s.length; i++) {

        if (s.indexOf(s[i]) !== t.indexOf(t[i])) {
            
            return false;
        }
    }
    return true;
};

var isIsomorphic = function (s, t) {
  if (s.length != t.length) return false;
  let sArr = [];
  let tArr = [];
  for (let i = 0; i < s.length; i++) {
    sArr.push(s.indexOf(s[i]));
    tArr.push(t.indexOf(t[i]));
    if (sArr[i] != tArr[i]) return false;
  }
  return true;
};*/

var isIsomorphic = function(s, t) {
    let arr1 = {}
    let arr2 = {}
    for (let i=0;i<s.length;i++) {
        if(arr1[s[i]] !== arr2[t[i]]) {
            return false
        }else{
            arr1[s[i]] = i,
            arr2[t[i]] = i
        }
    }
    return true
};
---------------------------------------------------------------------------------------
Feb Day 11: Longest Continuous Increasing Subsequence

Input: nums = [1,3,5,4,7]
Output: 3
Explanation: The longest continuous increasing subsequence is [1,3,5] with length 3.
Even though [1,3,5,7] is an increasing subsequence, it is not continuous as elements 5 and 7 are separated by element
4.

/*var findLengthOfLCIS = function(nums) {
    let len = 1, maxLen = 0;
    
    for(let i = 0; i < nums.length; i++) {
        if(nums[i] < nums[i+1]) len++;
        else len = 1;
        maxLen = Math.max(len, maxLen);
    }
    return maxLen;  
};*/


function findLengthOfLCIS(nums) {
  let cur = 1;
  let ans = 1;

  for (let i = 1; i < nums.length; i++) {
 

    // same above. using ternary operator
    cur = nums[i] > nums[i - 1] ? cur + 1 : 1
    ans = Math.max(cur, ans)
  }

  return ans
};
-----------------------------------------------------------------------------------
Feb Day 12: Delete Characters to Make Fancy String

Input: s = "leeetcode"
Output: "leetcode"
Explanation:
Remove an 'e' from the first group of 'e's to create "leetcode".
No three consecutive characters are equal, so return "leetcode".

/*var makeFancyString = function (s) {
  let result = s.split("");

  for (let i = 0; i < result.length; i++) {
    if (result[i] === result[i + 1] && result[i + 1] === result[i + 2]) {
      result[i] = "";
    }
  }

  return result.join("");
};*/

const makeFancyString = function (s) {
  let output = ''

  for (let i = 0; i < s.length; i++) {
    output += s[i] === s[i - 1] && s[i] === s[i - 2] ? '' : s[i]
  }

  return output;
};
-----------------------------------------------------------------------------------
Feb Day 13: Relative Sort Array

Given two arrays arr1 and arr2, the elements of arr2 are distinct, and all elements in arr2 are also in arr1.

Sort the elements of arr1 such that the relative ordering of items in arr1 are the same as in arr2. Elements that do not appear in arr2 should be placed at the end of arr1 in ascending order.

Input: arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]
Output: [2,2,2,1,4,3,3,9,6,7,19]

/*var relativeSortArray = function(arr1, arr2) {
    let res = [];

    for (let i = 0; i < arr2.length; i++) {
		// find all matching numbers in arr1 and add to array
        res = res.concat(arr1.filter((j) => j === arr2[i]));
		
		// remove these numbers from arr1
        arr1 = arr1.filter((j) => j !== arr2[i]);
    }
    
	// remaining numbers in arr1 are not in arr2
	// sort in ascending order
    return res.concat(arr1.sort((a, b) => a - b));
};*/

var relativeSortArray = function(arr1, arr2) {
    let res1 = [];
    for(let i=0;i<arr2.length;i++){
        for(let j=0;j<arr1.length;j++){
            if(arr2[i] == arr1[j]){
                res1.push(arr1[j]);
                arr1.splice(j,1);
                j--;
            }
        }
    }
    arr1.sort((a, b)=>a-b);
    return [...res1, ...arr1];
};
-----------------------------------------------------------------
Feb Day 14: Sort Array By Parity II
Given an array of integers nums, half of the integers in nums are odd, and the other half are even.
Sort the array so that whenever nums[i] is odd, i is odd, and whenever nums[i] is even, i is even.
Return any answer array that satisfies this condition.

Example 1:

Input: nums = [4,2,5,7]
Output: [4,5,2,7]
Explanation: [4,7,2,5], [2,5,4,7], [2,7,4,5] would also have been accepted.

/*const sortArrayByParityII = arr => {
    let res = []
    let e = 0, o = 1;
    
    for(i = 0; i < arr.length; i++){
        if(arr[i] % 2 === 0){
            res[e] = arr[i];
            e += 2
        }
        else{
            res[o] = arr[i];
            o += 2
        }
    }    
     return res;
};*/

var sortArrayByParityII = function(A) {
    let evenNums = A.filter((i) => i % 2 === 0);
    let oddNums = A.filter((i) => i % 2 !== 0);
    
    let res = [];
    for (let i = 0; i < A.length / 2; i++) {
        res.push(evenNums[i], oddNums[i]);
    }
    
    return res;
};
----------------------------------------------------------------
Feb Day 15: Check If String Is a Prefix of Array
Input: s = "iloveleetcode", words = ["i","love","leetcode","apples"]
Output: true
Explanation:
s can be made by concatenating "i", "love", and "leetcode" together.

/*var isPrefixString = function(s, words) {
    let compareStr = '';

    for (let i = 0; i < words.length; i++) {
        compareStr = compareStr + words[i];
        if (compareStr === s) {
            return true;
        }
    }

    return false;
};*/

const isPrefixString = (s, w) => {
    let tmp = '';
    for (const e of w) {
        tmp += e;
        if (tmp == s) return true; 
    }
    return false;
};
-------------------------------------------------------
Feb Day 16: Chunk Array

Example 1:

Input: arr = [1,2,3,4,5], size = 1
Output: [[1],[2],[3],[4],[5]]
Explanation: The arr has been split into subarrays each with 1 element.
Example 2:

Input: arr = [1,9,6,3,2], size = 3
Output: [[1,9,6],[3,2]]
Explanation: The arr has been split into subarrays with 3 elements. However, only two elements are left for the 2nd subarray.

/*var chunk = function(arr, size) {
    let result=[];
    for(let i=0; i<arr.length;i=i+size){
     result.push(arr.slice(i,i+size))
    }
    return result
};*/

var chunk = function(arr, size) {
  var chunkedArray = [];
  var index = 0;

  while (index < arr.length) {
    chunkedArray.push(arr.slice(index, index + size));
    index += size;
  }

  return chunkedArray;
}
----------------------------------------------------------------------------
Feb Day 17: Arranging Coins

Input: n = 5
Output: 2
Explanation: Because the 3rd row is incomplete, we return 2.

var arrangeCoins = function(n) {
    let rows=0;

    while(n>rows){
        rows= rows+1;
        n = n-rows;
    }

    return rows;
};
/*
var arrangeCoins = function (n) {
    let sum = 0;
    for(let i=0;i<=n;i++){
        sum = sum + i
        if(sum === n){
            return i
        }
        if(sum >= n){
            return i-1
        }
    }
};*/
-------------------------------------------------------------------
Feb Day 18: Filter Elements from Array

Input: arr = [0,10,20,30], fn = function greaterThan10(n) { return n > 10; }
Output: [20,30]
Explanation:
const newArray = filter(arr, fn); // [20, 30]
The function filters out values that are not greater than 10

/*var filter = function(arr, fn) {
    var filteredArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (fn(arr[i], i)) {
            filteredArr.push(arr[i]);
        }
    }
    return filteredArr;
};

var filter = function(arr, fn) {
  return arr.reduce((result, value, index) => {
    if (fn(value, index)) {
      result.push(value);
    }
    return result;
  }, []);
};

var filter = function(arr, fn) {
  const result = [];
  arr.forEach((value, index) => {
    if (fn(value, index)) {
      result.push(value);
    }
  });
  return result;
};*/

var filter = function(arr, fn) {
    return arr.flatMap((i, j) => fn(i, j) ? [i] : []);
};
--------------------------------------------------------
Feb Day 19: Calculate Delayed Arrival Time


You are given a positive integer arrivalTime denoting the arrival time of a train in hours, and another positive integer delayedTime denoting the amount of delay in hours.

Return the time when the train will arrive at the station.

Note that the time in this problem is in 24-hours format.

 

Example 1:

Input: arrivalTime = 15, delayedTime = 5 
Output: 20 
Explanation: Arrival time of the train was 15:00 hours. It is delayed by 5 hours. Now it will reach at 15+5 = 20 (20:00 hours).
Example 2:

Input: arrivalTime = 13, delayedTime = 11
Output: 0
Explanation: Arrival time of the train was 13:00 hours. It is delayed by 11 hours. Now it will reach at 13+11=24 (Which is denoted by 00:00 in 24 hours format so return 0).
 

/*
var findDelayedArrivalTime = function(arrivalTime, delayedTime) {
    return (arrivalTime + delayedTime) % 24;

};

var findDelayedArrivalTime = function(arrivalTime, delayedTime) {
    let time = arrivalTime + delayedTime
    return time >= 24 ? time - 24 : time
};

var findDelayedArrivalTime = function(arrivalTime, delayedTime) {
    return arrivalTime + delayedTime < 24 ? arrivalTime + delayedTime : arrivalTime + delayedTime - 24
}; */

var findDelayedArrivalTime = function (arrivalTime, delayedTime) {
    let totalTime = arrivalTime + delayedTime; // initialize totalTime is the sum of arrivalTime and delayedTime

    if (totalTime == 24) { // if totalTime is equal to 24 then return 0
        return 0;
    } else if (totalTime < 24) { // if totalTime is less than 24 then return totalTime
        return totalTime;
    } else { // else return subtraction of totalTime to 24
        return totalTime - 24;
    }/*var missingNumber = function (nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  let actualSum = 0;

  for (let i = 0; i < nums.length; i++) {
    actualSum = actualSum + nums[i]
  }
  
  return expectedSum-actualSum
};*/

var missingNumber = function(nums) {
  const n = nums.length;

  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((sum, num) => sum + num, 0);

  return expectedSum - actualSum;
}
};
------------------------------------------------
Feb Day 20:Missing Number

Input: nums = [3,0,1]
Output: 2
Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.

/*var missingNumber = function (nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  let actualSum = 0;

  for (let i = 0; i < nums.length; i++) {
    actualSum = actualSum + nums[i]
  }
  
  return expectedSum-actualSum
};*/

var missingNumber = function(nums) {
  const n = nums.length;

  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((sum, num) => sum + num, 0);

  return expectedSum - actualSum;
}
--------------------------------------------------------
Feb Day 21: Maximum Value of a String in an Array
The value of an alphanumeric string can be defined as:

The numeric representation of the string in base 10, if it comprises of digits only.
The length of the string, otherwise.
Given an array strs of alphanumeric strings, return the maximum value of any string in strs.

Example 1:

Input: strs = ["alic3","bob","3","4","00000"]
Output: 5
Explanation: 
- "alic3" consists of both letters and digits, so its value is its length, i.e. 5.
- "bob" consists only of letters, so its value is also its length, i.e. 3.
- "3" consists only of digits, so its value is its numeric equivalent, i.e. 3.
- "4" also consists only of digits, so its value is 4.
- "00000" consists only of digits, so its value is 0.
Hence, the maximum value is 5, of "alic3".

/*var maximumValue = function (strs) {
  return Math.max(...strs.map((x) => (isNaN(+x) ? x.length : +x)));
};

var maximumValue = function(strs) {
    return Math.max(...strs.map((str) => Number.isInteger(+str) ? +str : str.length))
};*/

var maximumValue = function(strs) {
    let ans = 0
    for(let i of strs){
        if(isNaN(i)){
            ans = Math.max(i.length,ans)
        } else{
            ans = Math.max(Number(i),ans)
        }
    }
    return ans
};
--------------------------------------------------------
Feb Day 22: Intersection of Multiple Arrays

Given a 2D integer array nums where nums[i] is a non-empty array of distinct positive integers, return the list of integers that are present in each array of nums sorted in ascending order.
 
/*var intersection = function(nums) {
     let ref = [...nums[0]]
     for(let i = 1; i < nums.length; i++){
         ref = ref.filter(n => nums[i].includes(n))
     }
    return ref.sort((a,b) => a-b)
};

var intersection = function (nums) {
  const result = [];
  for (let i = 0; i < nums[0].length; i++) {
    if (nums.every((x) => x.includes(nums[0][i]))) {
      result.push(nums[0][i]);
    }
  }
  return result.sort((a, b) => a - b);
};*/

var intersection = function(nums) {
    const res = []
    for (let i = 0; i < nums[0].length; i++) {
        const num = nums[0][i]
        if (nums.every(el => el.includes(num))) res.push(num)
    }
    return res.sort((a,b) => a - b)
};
--------------------------------------------------------
Feb Day 23: Percentage of Letter in String

Input: s = "foobar", letter = "o"
Output: 33
Explanation:
The percentage of characters in s that equal the letter 'o' is 2 / 6 * 100% = 33% when rounded down, so we return 33.

/*
var percentageLetter = function(s, letter) {
    let count =0;
    for(let i=0; i<=s.length; i++){
      if(s[i]=== letter){
        count++;
      }
    }
    let res = (count/s.length)*100
    return res;
};

const percentageLetter = (s, letter) => Math.floor((s.length - s.replaceAll(letter, '').length) * 100 / s.length);


var percentageLetter = function (s, letter) {
    let letterFilter = s.split('').filter(char => char == letter)
	
    return Math.trunc((letterFilter.length/ s.length) * 100)
}; */

var percentageLetter = function(s, letter) {
    const count= s.split('').reduce((a,c)=>{
        if(c==letter) a++
        return a
    },0)
    return Math.floor((count/s.length)*100)
};
--------------------------------------------------------------
Feb Day 24: Split Strings by Separator

Example 1:

Input: words = ["one.two.three","four.five","six"], separator = "."
Output: ["one","two","three","four","five","six"]

/*var splitWordsBySeparator = function(words, separator) {
  return words.join(separator).split(separator).filter(Boolean)
};

var splitWordsBySeparator = function (words, separator) {
  const res = []

  for (let i = 0; i < words.length; i++) {
    const splited = words[i].split(separator)
    const filtered = splited.filter(item => item.length > 0)
    res.push(...filtered)
  }

  return res
};*/

var splitWordsBySeparator = function(words, separator) {
    return words.join(separator).split(separator).filter(e=>e.length)
};
-----------------------------------------------------------------------------
Feb Day 25: 3Sum Closest

Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target.

Return the sum of the three integers.

You may assume that each input would have exactly one solution.

 

Example 1:

Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).

/*

function threeSumClosest(nums, target) {
    nums.sort((a, b) => a - b);
    let closestSum = nums[0] + nums[1] + nums[2];

    for (let i = 0; i < nums.length - 2; i++) {
        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            let currentSum = nums[i] + nums[left] + nums[right];
            if (Math.abs(target - currentSum) < Math.abs(target - closestSum)) {
                closestSum = currentSum;
            }

            if (currentSum < target) {
                left++;
            } else if (currentSum > target) {
                right--;
            } else {
                return closestSum;
            }
        }
    }

    return closestSum;
}
*/

function threeSumClosest(nums, target) {
    let closestSum = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < nums.length - 2; i++) {
        for (let j = i + 1; j < nums.length - 1; j++) {
            for (let k = j + 1; k < nums.length; k++) {
                const currentSum = nums[i] + nums[j] + nums[k];
                if (Math.abs(target - currentSum) < Math.abs(target - closestSum)) {
                    closestSum = currentSum;
                }
            }
        }
    }

    return closestSum;
}
----------------------------------------------------
GAP
----------------------------------------------------
Feb DAY 29: Rotate Array
Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.
Example 1:
Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]

/*var rotate = function(nums, k) {
    for (let i = 0; i < k; i++) {
        nums.unshift(nums.pop());
    }
};

var rotate = function(nums, k) {
    if(k === 0) return nums
    let rotations = k % nums.length
    let tempArr = nums.splice(nums.length - rotations, rotations)
    return nums.unshift(...tempArr)
}; */

var rotate = function(nums, k) {
   const n = nums.length;
    k %= n; // in case k is greater than the length of the array

    // Reverse the whole array
    reverse(nums, 0, n - 1);
    // Reverse the first k elements
    reverse(nums, 0, k - 1);
    // Reverse the remaining n-k elements
    reverse(nums, k, n - 1);

    return nums;   
};
const reverse = (nums, start, end) => {
   while (start < end) {
        const temp = nums[start];
        nums[start] = nums[end];
        nums[end] = temp;
        start++;
        end--;
    }
}
----------------------
March Day 1: Permutations II

Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.
Example 1:

Input: nums = [1,1,2]
Output:
[[1,1,2],
 [1,2,1],
 [2,1,1]]

var permuteUnique = function(nums) {
    const result = [];
    nums.sort((a, b) => a - b); 

    function backtrack(current, arr) {
        if (arr.length === 0) {
            result.push([...current]);
            return;
        }
        for (let i = 0; i < arr.length; i++) {
            if (i > 0 && arr[i] === arr[i - 1]) continue;
            backtrack([...current, arr[i]], arr.filter((_, index) => index !== i));
        }
    }
    
    backtrack([], nums);
    return result;
};
---------------------------
March Day 2: Dulicates Zeros

Given a fixed-length integer array arr, duplicate each occurrence of zero, shifting the remaining elements to the right.

Note that elements beyond the length of the original array are not written. Do the above modifications to the input array in place and do not return anything.

 

Example 1:

Input: arr = [1,0,2,3,0,4,5,0]
Output: [1,0,0,2,3,0,0,4]
Explanation: After calling your function, the input array is modified to: [1,0,0,2,3,0,0,4]

var duplicateZeros = function(arr) {
    for (i = 0; i < arr.length; i++) {
        if (arr[i] == 0) {
            arr.splice(i, 0, 0);
            arr.pop();
            i++;
        }
    }
};
----------------------------
March Day 3: Palindrome Number

Given an integer x, return true if x is a 
palindrome
, and false otherwise.

Example 1:
Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.

/*var isPalindrome = function(x) {
   if(x<0) return false;
   if(x.toString()===x.toString().split('').reverse().join('')) return true;
   return false;  
}

var isPalindrome = function(x) {
  if (x < 0) return false

  let rev = 0
  for(let i = x; i >= 1; i = Math.floor(i/10)) rev = rev*10 + i%10
  return rev === x
}; 

var isPalindrome = function(x) {
    const arr = String(x).split('');
        
    while (arr.length > 1) {
        if (arr.shift() !== arr.pop()) {
            return false;
        }
    }
    
    return true;
};*/

var isPalindrome = function (x) {
  const str = x.toString();
  let leftIndex = 0;
  let rightIndex = str.length - 1;

  while (leftIndex < rightIndex) {
    if (str.charAt(leftIndex) !== str.charAt(rightIndex)) {
      return false;
    }
    leftIndex++;
    rightIndex--;
  }

  return true;
};
-------------------------------------------------------
March Day 4: Best Time to Buy and Sell Stock II

You are given an integer array prices where prices[i] is the price of a given stock on the ith day.

On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it then immediately sell it on the same day.

Find and return the maximum profit you can achieve.

 

Example 1:

Input: prices = [7,1,5,3,6,4]
Output: 7
Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
Total profit is 4 + 3 = 7.

/*var maxProfit = function(prices) {
    // Initialize the max profit...
    let maximumProfit = 0;
    // Traverse all the element through loop...
    for (let i = 1; i < prices.length; i++) {
        // check if the price is greater at i...
        if (prices[i] > prices[i - 1])
            // Add the difference to profit and increse it...
            maximumProfit += prices[i] - prices[i - 1];
    }
    return maximumProfit;      // Return the meximum profit...
};

var maxProfit = function(prices) {
    if (prices === null || prices.length === 0) {
        return 0;
    }
    let profit = 0;
    let buyingPrice = prices[0];
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > buyingPrice) {
            profit += prices[i] - buyingPrice;
            buyingPrice = prices[i]; // Re-buying 
        } else if (prices[i] < buyingPrice) {
            buyingPrice = prices[i]; // Better price
        }
    }
    return profit;
    // T.C: O(N)
    // S.C: O(1)
};*/

var maxProfit = function(prices) {
    let diff = 0
    if (prices.length > 0) { // []
        prices.reduce((acc, next) => {
            if (next > acc) {
                diff += next - acc
            }
            return next
        })
    }
    return diff
};
--------------------------------------------
Day 5 March Monotonic Array:
An array is monotonic if it is either monotone increasing or monotone decreasing.

An array nums is monotone increasing if for all i <= j, nums[i] <= nums[j]. An array nums is monotone decreasing if for all i <= j, nums[i] >= nums[j].

Given an integer array nums, return true if the given array is monotonic, or false otherwise.

 

Example 1:

Input: nums = [1,2,2,3]
Output: true
Example 2:

Input: nums = [6,5,4,4]
Output: true

/*var isMonotonic = function(nums) {
    if (nums.length < 2) return true;

    let direction = 0;  // 0 means unknown, 1 means increasing, -1 means decreasing

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i-1]) {  // increasing
            if (direction === 0) direction = 1;
            else if (direction === -1) return false;
        } else if (nums[i] < nums[i-1]) {  // decreasing
            if (direction === 0) direction = -1;
            else if (direction === 1) return false;
        }
    }

    return true;
};

var isMonotonic = function(nums) {
    let increasing = true;
    let decreasing = true;

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i - 1]) {
            decreasing = false;
        } else if (nums[i] < nums[i - 1]) {
            increasing = false;
        }

        if (!increasing && !decreasing) {
            return false;
        }
    }

    return true; 
}; */

var isMonotonic = function(nums) {
    let increasing = true;
    let decreasing = true;

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i - 1]) {
            decreasing = false;
        } else if (nums[i] < nums[i - 1]) {
            increasing = false;
        }
    }

    return increasing || decreasing;
};

-------------------------------------------------
March Day 6: Valid Mountain Array

Input: arr = [3,5,5]
Output: false
Input: arr = [0,3,2,1]
Output: true

var validMountainArray = function(arr) {
    // 2 pointers - one will move from left to right and other will move from right to left so that both meet at the peak point
    let left = 0,
        right = arr.length - 1;
    
	// condition: while either of the pointer is able to move
    while(arr[left] < arr[left + 1] || arr[right] < arr[right - 1]) {
        if(arr[left] < arr[left + 1]) {
            ++left;
        }
        if(arr[right] < arr[right - 1]) {
            --right;
        }
    }
	// if left and right pointer does not meet at the peak - array contains equal integers or zig-zag pattern
	// OR all integers are in ascending order
	// OR all integers are in descending order
    if(left !== right || left === arr.length - 1 || right === 0) {
        return false;
    }
    return true;
};
----------------------------------------------------------------------
March Day 7: Count Pairs Whose Sum is Less than Target

Input: nums = [-1,1,2,3,1], target = 2
Output: 3
Explanation: There are 3 pairs of indices that satisfy the conditions in the statement:
- (0, 1) since 0 < 1 and nums[0] + nums[1] = 0 < target
- (0, 2) since 0 < 2 and nums[0] + nums[2] = 1 < target 
- (0, 4) since 0 < 4 and nums[0] + nums[4] = 0 < target
Note that (0, 3) is not counted since nums[0] + nums[3] is not strictly less than the target.

/*var countPairs = function(nums, target) {
    let count = 0;
    for(let i=0; i< nums.length; i++){
        for(let j=i+1; j<nums.length; j++){
            if(nums[i]+nums[j]<target){
              count++;
            }
        }
    }
    return count;
};*/

var countPairs = function(nums, target) {
    nums.sort((a, b) => a-b); // sort the vector nums
    let count = 0; // variable to store the count
    let left = 0; // variable to store the left
    let right = nums.length-1; // variable to store the right
    while(left < right){ // loop until left is less than right
        if(nums[left] + nums[right] < target){ // if nums[left] + nums[right] is less than target
            count += right-left; // update the count  // All pairs with nums[left] contribute to the count
            left++; // increment the left
        }
        else{ // else
            right--; // decrement the right
        }
    }
    return count; // return the count
};
---------------------------------------------------
March Day 8:  Set Mismatch

Example 1:

Input: nums = [1,2,2,4]
Output: [2,3]
Example 2:

Input: nums = [1,1]
Output: [1,2]


var findErrorNums = function(nums) {
    // Ex: [1,2,2,4]
    const n = nums.length
    const expect = n * (n + 1) / 2  // 1 + 2 + 3 + 4
    const actual = nums.reduce((curr,acc) => curr + acc) // 1 + 2 + 2 + 4
    const setSum = [...new Set(nums)].reduce((curr,acc) => curr + acc) // 1 + 2 + 4 
    
    // numSum - setSum = [1 + 2 + 2 + 4] - [1 + 2 + 4] = 2
    // except - setSum = [1 + 2 + 3 + 4] - [1 + 2 + 4] = 3
    
    return [actual - setSum, expect - setSum]
};
--------------------------------------------------------
March Day 9: Minimum Common Value

Example 1:

Input: nums1 = [1,2,3], nums2 = [2,4]
Output: 2
Explanation: The smallest element common to both arrays is 2, so we return 2.

/*var getCommon = function(nums1, nums2) {
    let i = 0;
    let j = 0;
    
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] === nums2[j])
            return nums1[i];
        else if (nums1[i] > nums2[j])
            j++;
        else
            i++;
    }
    
    return -1;
};*/

const getCommon = function (nums1, nums2) {
  const set = new Set(nums1);
  for (const n of nums2) {
    if (set.has(n)) return n;
  }
  return -1;
};
---------------------------------------
March Day 10: Find Maximum Number of String Pairs

Input: words = ["cd","ac","dc","ca","zz"]
Output: 2
Explanation: In this example, we can form 2 pair of strings in the following way:
- We pair the 0th string with the 2nd string, as the reversed string of word[0] is "dc" and is equal to words[2].
- We pair the 1st string with the 3rd string, as the reversed string of word[1] is "ca" and is equal to words[3].
It can be proven that 2 is the maximum number of pairs that can be formed.

/*var maximumNumberOfStringPairs = function(words) {
    count = 0 

    for (let i = 0; i < words.length; i++) 
        for (let j = i + 1; j < words.length; j++) 
            if (words[i][0] == words[j][1] && words[i][1] == words[j][0])
                    count ++            
           
    return count
};*/

var maximumNumberOfStringPairs = function(words) {
    count = 0 
    obj = {}
    
    for (let word of words) {
        reverse = word[1] + word[0]        

        if (obj[reverse] == true) count ++

        obj[word] = true        
    }    
    
    return count
};
---------------------------------------
March Day 11: Sort the People

Example 1:

Input: names = ["Mary","John","Emma"], heights = [180,165,170]
Output: ["Mary","Emma","John"]
Explanation: Mary is the tallest, followed by Emma and John.

/*var sortPeople = function (names, heights) {
  //creating a array to store name , height as key value pair
  let d = [];
  for (let i = 0; i < names.length; i++) {
    d.push([names[i], heights[i]]);
  }
  //sorting heights based on decending order
  d.sort((a, b) => b[1] - a[1]);

  d = d.map((x) => x[0]);
  return d;
};

var sortPeople = function(names, heights) {
    let track = names.map((name, ind) => ({name:names[ind], age : heights[ind]}));
    
    track.sort((a,b) => b.age - a.age);
    
    return track.map(person => person.name)
    
};*/

var sortPeople = function(names, heights) {
    return new Array(names.length).fill(null).map((item, index) => ({name: names[index], height: heights[index]})).sort((a, b) => b.height - a.height).map(({name}) => name);
};
----------------------------------------------------------------
March Day 12: Number of Changing Keys

Input: s = "aAbBcC"
Output: 2
Explanation: 
From s[0] = 'a' to s[1] = 'A', there is no change of key as caps lock or shift is not counted.
From s[1] = 'A' to s[2] = 'b', there is a change of key.
From s[2] = 'b' to s[3] = 'B', there is no change of key as caps lock or shift is not counted.
From s[3] = 'B' to s[4] = 'c', there is a change of key.
From s[4] = 'c' to s[5] = 'C', there is no change of key as caps lock or shift is not counted.

const countKeyChanges=(s)=>{
  let count=0;
  let res = s.toLowerCase()
  for(let i=0; i<res.length-1; i++){
    if(res[i] != res[i+1]){
      count++
    }
  }
  //console.log(res, count)
  return count;
}
-------------------------------------------------------------
March Day 13: Minimum String Length After Removing Substrings

Example 1:

Input: s = "ABFCACDB"
Output: 2
Explanation: We can do the following operations:
- Remove the substring "ABFCACDB", so s = "FCACDB".
- Remove the substring "FCACDB", so s = "FCAB".
- Remove the substring "FCAB", so s = "FC".
So the resulting length of the string is 2.
It can be shown that it is the minimum length that we can obtain.

/*var minLength = function(s) {
        while( s.includes("AB") || s.includes("CD"))
            {
                if(s.includes("AB"))
                s = s.replace("AB","")

                if(s.includes("CD"))
                s = s.replace("CD", '')
            }
        return s.length;    
};*/

var minLength = function(s) {
    let arr = s.split('')
    for(let i=0; i<arr.length-1; i++){
        if( arr[i]==='A' && arr[i+1] === 'B' || arr[i] === 'C' && arr[i+1]==='D' ){
            arr.splice(i,2)
            i = -1    
        }
    }
    return arr.length
};
----------------------------------------------------------------
March Day 14: Minimum Number of Steps to Make Two Strings Anagram
Input: s = "bab", t = "aba"
Output: 1
Explanation: Replace the first 'a' in t with b, t = "bba" which is anagram of s.


var minSteps = function(s, t) {
    /*  create a hashMap for s iterate throgh t 
        and check how many letters are missing
		O(N) - time
		O(1) - space, since there are only 26 letters in the alphabet
    */
    let hashMap = {};
    for (let letter of s) {
        if (hashMap[letter]) hashMap[letter] ++;
        else hashMap[letter] = 1;
    }
    let changes = 0;
    for (let letter of t) {
        if (hashMap[letter]) hashMap[letter] --;
        else changes ++;
    }
    return changes;
};
----------------------------------------------------------------------------
March Day 15:

------------------------------------------------------------------------------
March Day 16: Contiguous Array


var findMaxLength = function(nums) {
    const map = new Map();
    map.set(0, -1);
    let maxLen = 0;
    let count = 0;

    for (let i = 0; i < nums.length; i++) {
        count += nums[i] === 0 ? -1 : 1;

        if (map.has(count)) {
            maxLen = Math.max(maxLen, i - map.get(count));
        } else {
            map.set(count, i);
        }
    }

    return maxLen;
};


Initializing Variables:

We start by initializing a Map called map to store cumulative sums and their corresponding indices. We set the initial cumulative sum of 0s and 1s encountered to index -1 since at the beginning we haven't encountered any elements.
We initialize maxLen to keep track of the maximum length of the contiguous subarray found so far.
We initialize count to keep track of the cumulative sum of 0s and 1s encountered so far.
Iterating through the Array:

We iterate through the nums array using a for loop.
Updating Cumulative Sum:

For each element in the array, we update the count variable:
If the element is 0, we decrement count by 1.
If the element is 1, we increment count by 1.
Checking for Contiguous Array:

We check if the current cumulative sum count is already in the map.
If it is present, it means that we have encountered the same cumulative sum before. This implies that the subarray between the current index and the index stored in the map for the same cumulative sum has an equal number of 0s and 1s. We update maxLen accordingly by finding the difference in indices.
If it is not present, we store the current cumulative sum count in the map with its corresponding index.
Updating Maximum Length:

During each iteration, we update the maximum length of the contiguous subarray found so far.
Returning the Result:

Finally, we return maxLen, which represents the maximum length of a contiguous subarray with an equal number of 0s and 1s.
-------------------------------------------------------
Day 17:
--------------------------------------------------------
Day 18: Build Array from Permutation

Example 1:

Input: nums = [0,2,1,5,3,4]
Output: [0,1,2,4,5,3]
Explanation: The array ans is built as follows: 
ans = [nums[nums[0]], nums[nums[1]], nums[nums[2]], nums[nums[3]], nums[nums[4]], nums[nums[5]]]
    = [nums[0], nums[2], nums[1], nums[5], nums[3], nums[4]]
    = [0,1,2,4,5,3]

/*var buildArray = function(nums) {
    return nums.map(a=>nums[a]);
};

var buildArray = function(nums) {
   arr = []
   for(let i=0; i<nums.length; i++){
       arr.push(nums[nums[i]])
   }
   return arr
}; */

var buildArray = function (nums) {
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    result[i] = nums[nums[i]];
  }

  return result;
};
----------------------------------------------------------------------
March Day 19: Most Frequent Number Following Key In an Array
Example 1:

Input: nums = [1,100,200,1,100], key = 1
Output: 100
Explanation: For target = 100, there are 2 occurrences at indices 1 and 4 which follow an occurrence of key.
No other integers follow an occurrence of key, so we return 100.

const mostFrequent = (nums, key) => {
  const freq = {};
  let ret = 0;
  for (let i = 0, max = 0; i < nums.length - 1; i++) {
    if (nums[i] !== key) continue;
    const target = nums[i + 1];
    freq[target] = (freq[target] || 0) + 1;
    if (freq[target] > max) {
      max = freq[target];
      ret = target;
    }
  }
  return ret;
};