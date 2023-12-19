import { BreakOnFirstActionable, ContinueAllActionable } from "../message-handler";
type BreakOnFirst = {
    breakOnFirst: true;
};
type ContinueAll = {
    breakOnFirst: false;
};
type When<MessageType> = (message: MessageType) => boolean;
type Handler<MessageType, ResultType = MessageType, Actionable extends BreakOnFirstActionable | ContinueAllActionable = BreakOnFirstActionable> = (message: MessageType, actionable: Actionable) => ResultType;
type MessageHandler<T, R, Actionable extends BreakOnFirstActionable | ContinueAllActionable> = {
    subscribe(when: When<T>, handler: Handler<T, R, Actionable>): () => void;
    handle(message: T): R | undefined;
    clearAll(): void;
};
export declare function createMessageHandlerSync<T, R = T, Actionable extends BreakOnFirstActionable | ContinueAllActionable = BreakOnFirstActionable>(options?: BreakOnFirst): MessageHandler<T, R, BreakOnFirstActionable>;
export declare function createMessageHandlerSync<T, R = T, Actionable extends BreakOnFirstActionable | ContinueAllActionable = ContinueAllActionable>(options: ContinueAll): MessageHandler<T, R, ContinueAllActionable>;
export {};
