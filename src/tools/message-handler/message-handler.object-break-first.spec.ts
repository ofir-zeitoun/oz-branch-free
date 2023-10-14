import { describe, expect, test } from "@jest/globals";
import { createMessageHandler } from "./message-handler";

type TestType = Partial<{ a: number; b: boolean }>;
describe("message-handler -Object break on first", () => {
  const handler = createMessageHandler<TestType, string>();

  let unsubscribe1: () => void;
  let unsubscribe2: () => void;

  const aIsThere = jest.fn((obj: TestType) => `a=${obj.a}`);
  const whenAExists = jest.fn((obj: TestType) => obj?.a !== undefined);

  const bIsThere = jest.fn((obj: TestType) => `b=${obj.b}`);
  const whenBExists = jest.fn((obj: TestType) => obj?.b !== undefined);

  beforeEach(() => {
    unsubscribe1 = handler.subscribe(whenAExists, aIsThere);
    unsubscribe2 = handler.subscribe(whenBExists, bIsThere);
  });

  afterEach(() => {
    aIsThere.mockClear();
    whenAExists.mockClear();
    bIsThere.mockClear();
    whenBExists.mockClear();

    unsubscribe1?.();
    unsubscribe2?.();
    handler.clearAll();
  });

  test("should call first func", async () => {
    const input = { a: 1 };
    const res = await handler.handle(input);
    expect(whenAExists).toHaveBeenCalledWith(input);
    expect(whenBExists).not.toHaveBeenCalledWith(input);
    expect(aIsThere).toBeCalled();
    expect(bIsThere).not.toBeCalled();
    expect(res).toBe("a=1");
  });

  test("should call second func", async () => {
    const input = { b: false };

    const res = await handler.handle(input);
    expect(whenAExists).toHaveBeenCalledWith(input);
    expect(whenBExists).toHaveBeenCalledWith(input);
    expect(aIsThere).not.toBeCalled();
    expect(bIsThere).toBeCalled();
    expect(res).toBe("b=false");
  });

  test("should not call any func", async () => {
    const input = {};

    const res = await handler.handle(input);
    expect(whenAExists).toHaveBeenCalledWith(input);
    expect(whenBExists).toHaveBeenCalledWith(input);
    expect(aIsThere).not.toBeCalled();
    expect(bIsThere).not.toBeCalled();
    expect(res).toBe(undefined);
  });

  test("should ignore call second func", async () => {
    const input = { b: true };
    unsubscribe2();
    const res = await handler.handle(input);
    expect(whenAExists).toHaveBeenCalledWith(input);
    expect(whenBExists).not.toHaveBeenCalledWith(input);
    expect(aIsThere).not.toBeCalled();
    expect(bIsThere).not.toBeCalled();
    expect(res).toBe(undefined);
  });

  test("should ignore all calls - using unsubscribe", async () => {
    const input = { a: 1, b: true };
    unsubscribe1();
    unsubscribe2();
    const res = await handler.handle(input);
    expect(whenAExists).not.toHaveBeenCalledWith(input);
    expect(whenBExists).not.toHaveBeenCalledWith(input);
    expect(aIsThere).not.toBeCalled();
    expect(bIsThere).not.toBeCalled();
    expect(res).toBe(undefined);
  });

  test("should ignore all calls - using clearAll", async () => {
    const input = { a: 1, b: true };
    handler.clearAll();
    const res = await handler.handle(input);
    expect(whenAExists).not.toHaveBeenCalledWith(input);
    expect(whenBExists).not.toHaveBeenCalledWith(input);
    expect(aIsThere).not.toBeCalled();
    expect(bIsThere).not.toBeCalled();
    expect(res).toBe(undefined);
  });
});
