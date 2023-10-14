export type Handler<MessageType, ResultType = MessageType> = (message: MessageType) => ResultType | Promise<ResultType>;
export type When<MessageType> = Handler<MessageType, boolean>;
declare const defaultOptions: {
    breakOnFirst: boolean;
};
export declare function createMessageHandler<T, R = T>(options?: typeof defaultOptions): {
    subscribe(when: When<T>, cb: Handler<T, R>): () => void;
    handle(message: T): Promise<R | undefined>;
    clearAll(): void;
};
export {};
