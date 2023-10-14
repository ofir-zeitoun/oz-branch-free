type WhenPredicate<T> = (value: T) => boolean;
type CaseHandler<T, ResultType> = (value: T) => ResultType;

export type SwitcherBuilder<T, ResultType = T> = {
  when: (whenPredicate: WhenPredicate<T>) => SwitcherWhen<T, ResultType>;
  default: (
    handler: CaseHandler<T, ResultType>
  ) => SwitcherExecute<T, ResultType>;
};

type SwitcherWhen<T, ResultType = T> = {
  then: (
    handler: CaseHandler<T, ResultType>
  ) => SwitcherBuilder<T, ResultType> & SwitcherExecute<T, ResultType>;
};

type SwitcherExecute<T, ResultType = T> = {
  execute: (value: T) => ResultType | undefined;
};

type CaseTuple<T, ResultType = T> = [
  WhenPredicate<T>,
  CaseHandler<T, ResultType>
];

const truthyFn = () => true;

export const buildSwitch = <T, ResultType = T>(): SwitcherBuilder<
  T,
  ResultType
> => {
  const cases = new Set<CaseTuple<T, ResultType>>();

  let lastWhen: WhenPredicate<T>;

  const builder = {
    when: (whenPredicate: WhenPredicate<T>): SwitcherWhen<T, ResultType> => {
      lastWhen = whenPredicate;
      return builder as SwitcherWhen<T, ResultType>;
    },

    then: (
      handler: CaseHandler<T, ResultType>
    ): SwitcherBuilder<T, ResultType> & SwitcherExecute<T, ResultType> => {
      cases.add([lastWhen, handler]);
      return builder as SwitcherBuilder<T, ResultType> &
        SwitcherExecute<T, ResultType>;
    },

    default: (
      handler: CaseHandler<T, ResultType>
    ): SwitcherExecute<T, ResultType> => {
      cases.add([truthyFn, handler]);
      return builder as SwitcherExecute<T, ResultType>;
    },

    execute: (value: T): ResultType | undefined => {
      for (const [when, handler] of Array.from(cases)) {
        if (when(value)) {
          return handler(value);
        }
      }
      return undefined;
    },
  };

  return builder as SwitcherBuilder<T, ResultType>;
};
