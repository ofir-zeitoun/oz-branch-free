type Func<T, ResultType> = (value: T) => ResultType;
type CaseValueOrHandler<T, ResultType> = Func<T, ResultType> | ResultType;
type WhenValueOrPredicate<T> = Func<T, boolean> | T;
export type SwitcherBuilder<T, ResultType = T> = {
    when: (whenPredicate: WhenValueOrPredicate<T>) => SwitcherWhen<T, ResultType | undefined>;
    default: (handler: CaseValueOrHandler<T, ResultType>) => SwitcherExecute<T, ResultType>;
};
type SwitcherWhen<T, ResultType = T> = {
    then: (handler: CaseValueOrHandler<T, ResultType>) => SwitcherBuilder<T, ResultType> & SwitcherExecute<T, ResultType>;
};
type SwitcherExecute<T, ResultType = T> = {
    execute: (value: T) => ResultType;
};
export declare const buildSwitch: <T, ResultType = T>() => SwitcherBuilder<T, ResultType>;
export {};
