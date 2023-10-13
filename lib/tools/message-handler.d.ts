export type Handler<T, R = T> = (message: T) => R | Promise<R>;
export type When<T> = Handler<T, boolean>;
declare const defaultOptions: {
    breakOnFirst: boolean;
};
export declare function createMessageHandler<T, R = T>(options?: typeof defaultOptions): {
    subscribe(when: When<T>, cb: Handler<T, R>): () => void;
    handle(message: T): Promise<R | undefined>;
    clearAll(): void;
};
export {};
