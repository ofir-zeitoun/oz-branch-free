import { describe, expect, test } from "@jest/globals";
import { createMessageHandler } from "./message-handler";

describe("message-handler - break on first", () => {
  const handler = createMessageHandler<string>();

  let unsubscribe1: () => void;
  let unsubscribe2: () => void;

  const toUpperCaseFn = jest.fn((str: string) => str.toUpperCase());
  const whenAtLeast3Chars = jest.fn((str: string) => str.length > 3);

  const toLowerCaseFn = jest.fn((str: string) => str.toLowerCase());
  const whenStartsWithLetterA = jest.fn((str: string) =>
    str.toLocaleLowerCase().startsWith("a")
  );

  beforeEach(() => {
    unsubscribe1 = handler.subscribe(whenAtLeast3Chars, toUpperCaseFn);
    unsubscribe2 = handler.subscribe(whenStartsWithLetterA, toLowerCaseFn);
  });

  afterEach(() => {
    toUpperCaseFn.mockClear();
    whenAtLeast3Chars.mockClear();
    toLowerCaseFn.mockClear();
    whenStartsWithLetterA.mockClear();

    unsubscribe1?.();
    unsubscribe2?.();
    handler.clearAll();
  });

  test("should call first func", async () => {
    const input = "aaaa";
    const res = await handler.handle(input);
    expect(whenAtLeast3Chars).toHaveBeenCalledWith(input);
    expect(whenStartsWithLetterA).not.toHaveBeenCalledWith(input);
    expect(toUpperCaseFn).toBeCalled();
    expect(toLowerCaseFn).not.toBeCalled();
    expect(res).toBe("AAAA");
  });

  test("should call second func", async () => {
    const input = "A";

    const res = await handler.handle(input);
    expect(whenAtLeast3Chars).toHaveBeenCalledWith(input);
    expect(whenStartsWithLetterA).toHaveBeenCalledWith(input);
    expect(toUpperCaseFn).not.toBeCalled();
    expect(toLowerCaseFn).toBeCalled();
    expect(res).toBe("a");
  });

  test("should not call any func", async () => {
    const input = "B";

    const res = await handler.handle(input);
    expect(whenAtLeast3Chars).toHaveBeenCalledWith(input);
    expect(whenStartsWithLetterA).toHaveBeenCalledWith(input);
    expect(toUpperCaseFn).not.toBeCalled();
    expect(toLowerCaseFn).not.toBeCalled();
    expect(res).toBe(undefined);
  });

  test("should ignore call second func", async () => {
    const input = "A";
    unsubscribe2();
    const res = await handler.handle(input);
    expect(whenAtLeast3Chars).toHaveBeenCalledWith(input);
    expect(whenStartsWithLetterA).not.toHaveBeenCalledWith(input);
    expect(toUpperCaseFn).not.toBeCalled();
    expect(toLowerCaseFn).not.toBeCalled();
    expect(res).toBe(undefined);
  });

  test("should ignore all calls - using unsubscribe", async () => {
    const input = "A";
    unsubscribe1();
    unsubscribe2();
    const res = await handler.handle(input);
    expect(whenAtLeast3Chars).not.toHaveBeenCalledWith(input);
    expect(whenStartsWithLetterA).not.toHaveBeenCalledWith(input);
    expect(toUpperCaseFn).not.toBeCalled();
    expect(toLowerCaseFn).not.toBeCalled();
    expect(res).toBe(undefined);
  });

  test("should ignore all calls - using clearAll", async () => {
    const input = "A";
    handler.clearAll();
    const res = await handler.handle(input);
    expect(whenAtLeast3Chars).not.toHaveBeenCalledWith(input);
    expect(whenStartsWithLetterA).not.toHaveBeenCalledWith(input);
    expect(toUpperCaseFn).not.toBeCalled();
    expect(toLowerCaseFn).not.toBeCalled();
    expect(res).toBe(undefined);
  });
});
