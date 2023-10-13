// No BS TS #4 - Function Overloading in Typescript
// https://www.youtube.com/watch?v=XnyZXNnWAOA&list=PLNqp92_EXZBJYFrpEzdO2EapvU0GOJ09n&index=4

// No BS TS #18 - Conditional Types in Typescript
// https://www.youtube.com/watch?v=jdzLpEnRAqg&list=PLNqp92_EXZBJYFrpEzdO2EapvU0GOJ09n&index=21

export type HandlerType<T> = (
  message: T
  //   options: {
  //     next: () => void;
  //     stop: () => void;
  //   }
  //   next: () => void
) => undefined | unknown | Promise<undefined | unknown>;

const defaultOptions = {
  breakOnFirst: true, // or continue all
};

export function createMessageHandler<T>(options?: typeof defaultOptions) {
  const subscribers = new Set<HandlerType<T>>();
  const opts = Object.assign({}, defaultOptions, options);

  return {
    subscribe(cb: HandlerType<T>): () => void {
      subscribers.add(cb);
      return () => {
        subscribers.delete(cb);
      };
    },

    async publish(message: T): Promise<undefined | unknown> {
      let res: unknown = undefined;
      for (const handler of Array.from(subscribers)) {
        const current = await handler(message);
        if (current === undefined) {
          continue;
        }
        res = current;
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
