/**
 * Welcome to Exercises.js!
 *
 * This file is imported in App.js and the functions below (ex1, ex2, ex3) are
 * ran whenever the app is reloaded. You can view the output of these functions
 * in the terminal.
 *
 * To complete this part of the assignment, fill in code for ex1, ex2, and
 * makeCircle.
 *
 * Once you're done, you can set RUN_EXERCISES to false so the output from these
 * exercises don't keep spamming your terminal.
 */

const RUN_EXERCISES = false;

const ONE_TO_A_HUNDRED = Array(100)
  .fill(1)
  .map((n, i) => n + i);

/**
 * Print the numbers from 1 to 100. But for multiples of three, print "Fizz"
 * instead of the number and for the multiples of five, print "Buzz".
 * For numbers which are both multiples of three and five, print "FizzBuzz".
 *
 * An array of numbers is provided for you as a variable called ONE_TO_A_HUNDRED.
 *
 * The result should print something like this to the console, with each number
 * or string on its own line (ignore the commas):
 *   1, 2, Fizz, 4, Buzz, ..., 14, FizzBuzz, 16, ..., 100
 */
const ex1 = () => {
  // loop from array and check if divisible by 3,5 or both
  for (let i = 0; i < ONE_TO_A_HUNDRED.length; i++) {
    if (ONE_TO_A_HUNDRED[i] % 3 === 0 && ONE_TO_A_HUNDRED[i] % 5 === 0) {
      console.log("FizzBuzz");
    } else if (ONE_TO_A_HUNDRED[i] % 3 === 0) {
      console.log("Fizz");
    } else if (ONE_TO_A_HUNDRED[i] % 5 === 0) {
      console.log("Buzz");
    } else {
      console.log(ONE_TO_A_HUNDRED[i]);
    }
  }
};

/**
 * Print an array containing the squares for all the even numbers between
 * 1 and 100, using the map() and filter() methods of arrays.
 *
 * An array of numbers is provided for you as a variable called ONE_TO_A_HUNDRED.
 *
 * The resulting array should look something like:
 *   [4, 16, 36, ..., 9216, 9604, 10000]
 */
function ex2() {
  const squaresOfEvens = ONE_TO_A_HUNDRED.filter((n) => n % 2 === 0) // check if even
    .map((n) => n * n); // adds square to array
  console.log(squaresOfEvens);
}

/**
 * Write a function called makeCircle that, given the radius of a circle, returns
 * an object containing two properties:
 *  - "radius", which contains the given radius
 *  - "diameter", which contains the diameter of the circle (2 * radius)
 *  - "circumference", which contains the circumference of the circle (2 * pi * radius)
 *  - "area", which contains the area of the circle (pi * radius ^ 2)
 *
 *  If the radius is negative, return an object with all the same properties but with
 *  a null value for each property.
 *
 * Example:
 * - Input: 10
 * - Output: {"radius": 10, "diameter": 20, "circumference": 62.83185307179586, "area": 314.1592653589793}
 */

const PI = Math.PI;
const ex3 = (radius) => {
  // first we must check if in bounds
  if (radius < 0) {
    return {
      radius: null,
      diameter: null,
      circumference: null,
      area: null,
    };
  }
  // calculate proper data
  const calc_diameter = radius * 2;
  const calc_circumference = 2 * PI * radius;
  const calc_area = PI * radius * radius;

  return {
    radius: radius,
    diameter: calc_diameter,
    circumference: calc_circumference,
    area: calc_area,
  };
};

const ex3Test = () => {
  console.log(ex3(1));
  console.log(ex3(50));
  console.log(ex3(-10));
};

// Don't modify this code!
export default runExercises = () => {
  if (RUN_EXERCISES) {
    console.log("\x1b[32m", "Output for Exercise 1 (FizzBuzz):");
    ex1();
    console.log("\x1b[32m", "Output for Exercise 2 (Squares):");
    ex2();
    console.log("\x1b[32m", "Output for Exercise 3 (Circle):");
    ex3Test();
    console.log(
      "\x1b[32m",
      "End of output for the JS exercises. To disable this, set RUN_EXERCISES to false in Exercises.js."
    );
  } else {
    console.log(
      "\x1b[31m",
      "Exercises skipped. Please make sure you've completed the exercises in Exercises.js before submitting."
    );
  }
};
