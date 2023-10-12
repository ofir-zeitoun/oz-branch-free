export type HandlerType<T> = (message: T) => undefined | unknown | Promise<undefined | unknown>;
declare const defaultOptions: {
    breakOnFirst: boolean;
};
export declare function createMessageHandler<T>(options: typeof defaultOptions): {
    subscribe(cb: HandlerType<T>): () => void;
    publish(message: T): Promise<undefined | unknown>;
    clearAll(): void;
};
export {};
