import { createMessageHandler } from "oz-branch-free";

const handler = createMessageHandler<string>();

const unsubsribeTooShort = handler.subscribe(
  (str) => str.length < 4,
  (str) => `'${str}' is too short`
);

const unsubsribeTooLong = handler.subscribe(
  (str) => str.length > 9,
  (str) => `'${str}' is too long`
);

const resShort = handler.handle("abc");
console.log(resShort); // output: 'abc' is too short

const resLong = handler.handle("1234567890");
console.log(resLong); // output: 'abc' is too long

unsubsribeTooShort();

const resShortUnSubscribe = handler.handle("abc");
console.log(resShortUnSubscribe); // output: undefined