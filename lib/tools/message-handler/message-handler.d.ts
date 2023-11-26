type BreakOnFirst = {
    breakOnFirst: true;
};
export type BreakOnFirstActionable = {
    next: () => void;
};
type ContinueAll = {
    breakOnFirst: false;
};
export type ContinueAllActionable = {
    stop: () => void;
};
type When<MessageType> = (message: MessageType) => boolean | Promise<boolean>;
type Handler<MessageType, ResultType = MessageType, Actionable extends BreakOnFirstActionable | ContinueAllActionable = BreakOnFirstActionable> = (message: MessageType, actionable: Actionable) => ResultType | Promise<ResultType>;
type MessageHandler<T, R, Actionable extends BreakOnFirstActionable | ContinueAllActionable> = {
    subscribe(when: When<T>, handler: Handler<T, R, Actionable>): () => void;
    handle(message: T): Promise<R | undefined>;
    clearAll(): void;
};
export declare function createMessageHandler<T, R = T, Actionable extends BreakOnFirstActionable | ContinueAllActionable = BreakOnFirstActionable>(options?: BreakOnFirst): MessageHandler<T, R, BreakOnFirstActionable>;
export declare function createMessageHandler<T, R = T, Actionable extends BreakOnFirstActionable | ContinueAllActionable = ContinueAllActionable>(options: ContinueAll): MessageHandler<T, R, ContinueAllActionable>;
export {};
