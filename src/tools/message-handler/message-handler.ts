// No BS TS #4 - Function Overloading in Typescript
// https://www.youtube.com/watch?v=XnyZXNnWAOA&list=PLNqp92_EXZBJYFrpEzdO2EapvU0GOJ09n&index=4

// No BS TS #18 - Conditional Types in Typescript
// https://www.youtube.com/watch?v=jdzLpEnRAqg&list=PLNqp92_EXZBJYFrpEzdO2EapvU0GOJ09n&index=21

export type Handler<MessageType, ResultType = MessageType> = (
  message: MessageType
) => ResultType | Promise<ResultType>;

export type When<MessageType> = Handler<MessageType, boolean>;

const defaultOptions = {
  breakOnFirst: true, // or continue all
};

export function createMessageHandler<T, R = T>(
  options?: typeof defaultOptions
) {
  const subscribers = new Set<[When<T>, Handler<T, R>]>();
  const opts = Object.assign({}, defaultOptions, options);

  return {
    subscribe(when: When<T>, cb: Handler<T, R>): () => void {
      const entry: [When<T>, Handler<T, R>] = [when, cb];
      subscribers.add(entry);
      return () => {
        subscribers.delete(entry);
      };
    },

    async handle(message: T): Promise<R | undefined> {
      let res: R | undefined = undefined;
      for (const [when, handler] of Array.from(subscribers)) {
        if (!(await when(message))) {
          continue;
        }
        res = await handler(message);
        if (opts.breakOnFirst) {
          break;
        }
      }
      return res;
    },

    clearAll(): void {
      subscribers.clear();
    },
  };
}
