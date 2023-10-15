# oz-branch-free

Library with alternatives to hard coded switch-case and if-else blocks

[`createMessageHandler`](#createmessagehandler)

[`objectMapper`](#objectmapper)

### createMessageHandler

`createMessageHandler` creates a handler so any subscriber can decide if it can and should handle the message arriving and return the a value accordingly.

```typescript
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
console.log(resLong); // output: '1234567890' is too short

unsubsribeTooShort();

const resShortUnSubscribe = handler.handle("abc");
console.log(resShortUnSubscribe); // output: undefined
```

Each subsribtion can be removed.

### objectMapper

`objectMapper` takes an expression and returns a value against a series of case clauses.
The default value will be returned if no case matches the expression's value.

`objectMapper` is an alternative to [switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) with `O(1)` access.

```typescript
import { objectMapper } from "oz-branch-free";

const mapper = objectMapper(
  {
    a: 1,
    b: false,
    c: [1, 2, 3],
  },
  "Some default"
);
```

Now you have intelicense with types for existing properties:
![object-mapper with types](/assets/images/object-mapper.jpeg)

as well as for non existing properties:

![object-mapper with default type](/assets/images/object-mapper-default.jpeg)

```typescript
mapper.a; // returns a number: 1
mapper["a"]; // returns a number: 1
mapper.b; // returns a boolean: false
mapper["b"]; // returns a boolean: false
mapper.c; // returns an array: [1, 2, 3]
mapper["c"]; // returns an array: [1, 2, 3]
mapper.d; // returns a string: 'Some default'
mapper.anyValidPropName; // returns a string: 'Some default'
mapper["any-prop-name"]; // returns a string: 'Some default'
```
