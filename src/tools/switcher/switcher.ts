type Tuple<T1, T2> = [T1, T2];
type Func<T, ResultType> = (value: T) => ResultType;

type CaseValueOrHandler<T, ResultType> = Func<T, ResultType> | ResultType;
type WhenValueOrPredicate<T> = Func<T, boolean> | T;

export type SwitcherBuilder<T, ResultType = T> = {
  when: (whenPredicate: WhenValueOrPredicate<T>) => SwitcherWhen<T, ResultType | undefined>;
  default: (
    handler: CaseValueOrHandler<T, ResultType>
  ) => SwitcherExecute<T, ResultType>;
};

type SwitcherWhen<T, ResultType = T> = {
  then: (
    handler: CaseValueOrHandler<T, ResultType>
  ) => SwitcherBuilder<T, ResultType> & SwitcherExecute<T, ResultType>;
};

type SwitcherExecute<T, ResultType = T> = {
  execute: (value: T) => ResultType;
};

type CaseTuple<T, ResultType = T> = Tuple<
  WhenValueOrPredicate<T>,
  CaseValueOrHandler<T, ResultType>
>;

function isFunc<T, ResultType>(
  maybeFunc: T | ResultType | Func<T, ResultType>
): maybeFunc is Func<T, ResultType> {
  return typeof maybeFunc === "function";
}

const truthyFn = () => true;

export const buildSwitch = <T, ResultType = T>(): SwitcherBuilder<T, ResultType> => {
  const cases = new Set<CaseTuple<T, ResultType>>();

  let lastWhen: WhenValueOrPredicate<T>;

  const builder = {
    when: (
      whenPredicate: WhenValueOrPredicate<T>
    ): SwitcherWhen<T, ResultType> => {
      lastWhen = whenPredicate;
      return builder as SwitcherWhen<T, ResultType>;
    },
    then: (
      handler: CaseValueOrHandler<T, ResultType>
    ): SwitcherBuilder<T, ResultType> & SwitcherExecute<T, ResultType> => {
      cases.add([lastWhen, handler]);
      return builder as SwitcherBuilder<T, ResultType> &
        SwitcherExecute<T, ResultType>;
    },
    default: (
      handler: CaseValueOrHandler<T, ResultType>
    ): SwitcherExecute<T, ResultType> => {
      cases.add([truthyFn, handler]);
      return builder as SwitcherExecute<T, ResultType>;
    },
    execute: (value: T): ResultType | undefined => {
      for (const [when, handlerOrValue] of Array.from(cases)) {
        if (when === value || (isFunc(when) && when(value))) {
          return isFunc(handlerOrValue)
            ? handlerOrValue(value)
            : handlerOrValue;
        }
      }
      return undefined;
    },
  };

  return builder as SwitcherBuilder<T, ResultType>;
};
