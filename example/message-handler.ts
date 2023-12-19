import { createMessageHandler } from "oz-branch-free";

const handler = createMessageHandler<string>();

const unsubscribeTooShort = handler.subscribe(
  (str) => str.length < 4,
  (str) => `'${str}' is too short`
);

const unsubscribeTooLong = handler.subscribe(
  (str) => str.length > 9,
  (str) => `'${str}' is too long`
);

const resShort = handler.handle("abc");
console.log(resShort); // output: 'abc' is too short

const resLong = handler.handle("1234567890");
console.log(resLong); // output: 'abc' is too long

unsubscribeTooShort();

const resShortUnSubscribe = handler.handle("abc");
console.log(resShortUnSubscribe); // output: undefined
