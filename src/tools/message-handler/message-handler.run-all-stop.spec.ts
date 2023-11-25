import { describe, expect, test } from "@jest/globals";
import {
  ContinueAllActionable,
  createMessageHandler,
} from "./message-handler";

describe("message-handler - run all - with stop", () => {
  const handler = createMessageHandler<string>({ breakOnFirst: false });

  let unsubscribe1: () => void;
  let unsubscribe2: () => void;

  const whenAtLeast3CharsHandler = jest.fn(
    (_str: string, action: ContinueAllActionable) => {
      action.stop();
      return "3 letters";
    }
  );
  const whenAtLeast3Chars = jest.fn((str: string) => str.length >= 3);

  const whenStartWithLetterAHandler = jest.fn(
    (_str: string) => "Starts with 'a'"
  );
  const whenStartsWithLetterA = jest.fn((str: string) =>
    str.toLocaleLowerCase().startsWith("a")
  );

  beforeEach(() => {
    unsubscribe1 = handler.subscribe(
      whenAtLeast3Chars,
      whenAtLeast3CharsHandler
    );
    unsubscribe2 = handler.subscribe(
      whenStartsWithLetterA,
      whenStartWithLetterAHandler
    );
  });

  afterEach(() => {
    whenAtLeast3CharsHandler.mockClear();
    whenAtLeast3Chars.mockClear();
    whenStartWithLetterAHandler.mockClear();
    whenStartsWithLetterA.mockClear();

    unsubscribe1?.();
    unsubscribe2?.();
    handler.clearAll();
  });

  test("should call first AND second func", async () => {
    const input = "aaaa";
    const res = await handler.handle(input);
    expect(whenAtLeast3Chars).toHaveBeenCalledWith(input);
    expect(whenStartsWithLetterA).not.toHaveBeenCalledWith(input);
    expect(whenAtLeast3CharsHandler).toBeCalled();
    expect(whenStartWithLetterAHandler).not.toBeCalled();
    expect(res).toBe("3 letters");
  });
});
