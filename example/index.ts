import { objectMapper } from "oz-branch-free";

const mapper = objectMapper(
  {
    a: 1,
    b: false,
    c: [1, 2, 3],
  },
  "Some default"
);

console.log(mapper.a); // returns a number: 1
console.log(mapper["a"]); // returns a number: 1
console.log(mapper.b); // returns a boolean: false
console.log(mapper["b"]); // returns a boolean: false
console.log(mapper.c); // returns an array: [1, 2, 3]
console.log(mapper["c"]); // returns an array: [1, 2, 3]
console.log(mapper.d); // returns a string: 'Some default'
console.log(mapper.anyValidPropName); // returns a string: 'Some default'
