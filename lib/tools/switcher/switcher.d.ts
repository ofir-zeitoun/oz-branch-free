type WhenPredicate<T> = (value: T) => boolean;
type CaseHandler<T, ResultType> = (value: T) => ResultType;
type SwitcherBuilder<T, ResultType = T> = {
    when: (whenPredicate: WhenPredicate<T>) => SwitcherWhen<T, ResultType>;
    default: (handler: CaseHandler<T, ResultType>) => SwitcherExecute<T, ResultType>;
};
type SwitcherWhen<T, ResultType = T> = {
    then: (handler: CaseHandler<T, ResultType>) => SwitcherBuilder<T, ResultType> & SwitcherExecute<T, ResultType>;
};
type SwitcherExecute<T, ResultType = T> = {
    execute: (value: T) => ResultType | undefined;
};
export declare const buildSwitch: <T, ResultType = T>() => SwitcherBuilder<T, ResultType>;
export {};
