import { describe, expect, test } from "@jest/globals";
import { createMessageHandler } from "./message-handler";

describe("message-handler", () => {
  const handler = createMessageHandler<string>();

  let unsubscribe1: () => void;
  let unsubscribe2: () => void;

  const toUpperCaseFn = jest.fn((str: string) => str.toUpperCase());
  const toLowerCaseFn = jest.fn((str: string) => str.toLowerCase());
  const whenAtLeast3Chars = jest.fn((str: string) => str.length > 3);
  const whenStartsWithLetterA = jest.fn((str: string) => str.startsWith("a"));

  beforeEach(() => {
    unsubscribe1 = handler.subscribe(whenAtLeast3Chars, toUpperCaseFn);
    unsubscribe2 = handler.subscribe(whenStartsWithLetterA, toLowerCaseFn);
  });

  afterEach(() => {
    toUpperCaseFn.mockClear();
    toLowerCaseFn.mockClear();
    whenAtLeast3Chars.mockClear();
    whenStartsWithLetterA.mockClear();

    unsubscribe1?.();
    unsubscribe2?.();
    handler.clearAll();
  });

  test("should call first func", () => {
    handler.handle("aaaa");
    expect(whenAtLeast3Chars).toHaveBeenCalledWith("aaaa");
    expect(whenStartsWithLetterA).not.toHaveBeenCalledWith("aaaa");
  });
});
