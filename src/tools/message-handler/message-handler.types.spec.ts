import { describe, expect, test } from "@jest/globals";
import { createMessageHandler } from "./message-handler";

describe("message-handler - types", () => {
  test("should have continue on default (break on first) handler", async () => {
    const handler = createMessageHandler<string>();
    handler.subscribe(
      (str) => str.length > 4,
      (str, action) => {
        action.next();
        // @ts-expect-error
        expect(() => action.stop()).toThrowError();
        return str;
      }
    );
    handler.handle("abcde");
  });

  test("should have continue on break on first handler", async () => {
    const handler = createMessageHandler<string>({ breakOnFirst: true });
    handler.subscribe(
      (str) => str.length > 4,
      (str, action) => {
        action.next();
        // @ts-expect-error
        expect(() => action.stop()).toThrowError();
        return str;
      }
    );
    handler.handle("abcde");
  });

  test("should have stop on continueAll handler", async () => {
    const handler = createMessageHandler<string>({ breakOnFirst: false });
    handler.subscribe(
      (str) => str.length > 4,
      (str, action) => {
        action.stop();
        // @ts-expect-error
        expect(() => action.next()).toThrowError();
        return str;
      }
    );
    handler.handle("abcde");
  });
});
