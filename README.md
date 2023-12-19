# oz-branch-free

Library with alternatives to hard coded switch-case and if-else blocks

[`createMessageHandler`](#createmessagehandler)

[`objectMapper`](#objectmapper)

[`buildSwitch`](#buildSwitch)

### createMessageHandler

`createMessageHandler` creates a handler so any subscriber can decide if it can and should handle the message arriving and return the a value accordingly.

```typescript
import { createMessageHandler } from "oz-branch-free";

const handler = createMessageHandler<string>();

const unsubscribeTooShort = handler.subscribe(
  (str: string) => str.length < 4,
  (str: string) => `'${str}' is too short`
);

const unsubscribeTooLong = handler.subscribe(
  (str: string) => str.length > 9,
  (str: string) => `'${str}' is too long`
);

const resShort = await handler.handle("abc");
console.log(resShort); // output: 'abc' is too short

const resLong = await handler.handle("1234567890");
console.log(resLong); // output: '1234567890' is too long

unsubscribeTooShort();

const resShortUnSubscribe = await handler.handle("abc");
console.log(resShortUnSubscribe); // output: undefined
```

Each subscription can be removed.

Constructor options:

```typescript
{
  breakOnFirst: boolean;
}
```

If `breakOnFirst` is `true` (default), the message handler stops once it find a match. The callback has action `next()` to override this behavior.

Otherwise (`breakOnFirest` is `false`), the message handler continue for all subscribers. The callback has action `stop()` to override this behavior.
![action can overide behavior](https://github.com/ofir-zeitoun/oz-branch-free/blob/main/assets/images/message-handler-continue-all.jpeg?raw=true)

The next code shows that even if we init the message handler to run all (`breakOnFirst` is `false`), we can still stop it at the handler.
![action can overide behavior](https://github.com/ofir-zeitoun/oz-branch-free/blob/main/assets/images/message-handler-break-on-first.jpeg?raw=true)

```typescript
const handler = createMessageHandler<string>({ breakOnFirst: false });

handler.subscribe(
  (str: string) => str.length > 3,
  (str: string, action: ContinueAllActionable) => {
    action.stop();
    return `Longer: ${str.length}`;
  }
);
handler.subscribe(
  (str: string) => str.length > 3,
  (str: string) => {
    return "This will not run";
  }
);

const res = await handler.handle("abcd"); // Longer 4
```

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
![object-mapper with types](https://github.com/ofir-zeitoun/oz-branch-free/blob/main/assets/images/object-mapper.jpeg)?raw=true

as well as for non existing properties:

![object-mapper with default type](https://github.com/ofir-zeitoun/oz-branch-free/blob/main/assets/images/object-mapper-default.jpeg?raw=true)

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

### buildSwitch

`buildSwitch` is an alternative for enriched [switch-case](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) with more options to compare and to handle.

`buildSwitcher` has an input and output types.
You can use a value or a function to when / then statements.

After `when` must come `then`.<BR>
After `default`, `execute` is the only option.

```typescript
// converts grades numbers to letters
// order is important
const grades = buildSwitch<number, string>()
  .when((g) => g > 100 || g < 0)
  .then((g) => {
    throw new Error(`invalid grade ${g}`);
  })
  .when(100)
  .then("Ace") // special case :-)
  .when((g) => g >= 90)
  .then("A")
  .when((g) => g >= 80)
  .then("B")
  .when((g) => g >= 70)
  .then("C")
  .when((g) => g >= 60)
  .then("D")
  .default("F");

const grade = grades.execute(95); // "A"
```

![switcher](https://github.com/ofir-zeitoun/oz-branch-free/blob/main/assets/images/switcher.gif?raw=true)
