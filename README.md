# oz-branch-free

Library with alternatives to hard coded switch-case and if-else blocks

[`objectMapper`](#objectmapper)

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
