import { describe, expect, test } from "@jest/globals";
import { SwitcherBuilder, buildSwitch } from "./switcher";

describe("switcher", () => {
  const whenAtLeast4Chars = jest.fn((str: string) => str.length >= 4);
  const whenAtLeast4CharsFn = jest.fn((str: string) => `long: ${str}`);
  const whenAtMost2Chars = jest.fn((str: string) => str.length <= 2);
  const whenAtMost2CharsFn = jest.fn((str: string) => `short: ${str}`);
  const defaultFn = jest.fn((str: string) => `default: ${str}`);

  let switcher: SwitcherBuilder<string>;

  beforeEach(() => {
    switcher = buildSwitch();
  });

  afterEach(() => {
    whenAtLeast4Chars.mockClear();
    whenAtLeast4CharsFn.mockClear();
    whenAtMost2Chars.mockClear();
    whenAtMost2CharsFn.mockClear();
    defaultFn.mockClear();
  });

  test("should have a when -> then", () => {
    const input = "1234";
    const switchCase = switcher
      .when(whenAtLeast4Chars)
      .then(whenAtLeast4CharsFn);
    const res = switchCase.execute(input);

    expect(whenAtLeast4Chars).toBeCalledWith(input);
    expect(whenAtLeast4CharsFn).toBeCalledWith(input);
    expect(res).toBe("long: 1234");
  });

  test("should have default entry", () => {
    const input = "1234";
    const res = switcher.default(defaultFn).execute(input);
    expect(defaultFn).toBeCalledWith(input);
    expect(res).toBe("default: 1234");
  });

  test("should have only execute after default entry", () => {
    const input = "1234";
    const switchCase = switcher.default(defaultFn);

    const res = switchCase.execute(input);
    expect(defaultFn).toBeCalledWith(input);
    expect(res).toBe("default: 1234");
  });

  test("should get undefined when too short", () => {
    const input = "123";
    const switchCase = switcher
      .when(whenAtLeast4Chars)
      .then(whenAtLeast4CharsFn);
    const res = switchCase.execute(input);

    expect(whenAtLeast4Chars).toBeCalledWith(input);
    expect(whenAtLeast4CharsFn).not.toBeCalledWith(input);
    expect(res).toBe(undefined);
  });

  test("should get answer on first match", () => {
    const input = "1234";
    const switchCase = switcher
      .when(whenAtLeast4Chars)
      .then(whenAtLeast4CharsFn)
      .when(whenAtMost2Chars)
      .then(whenAtMost2CharsFn)
      .default(defaultFn);

    const res = switchCase.execute(input);

    expect(whenAtLeast4Chars).toBeCalledWith(input);
    expect(whenAtLeast4CharsFn).toBeCalledWith(input);
    expect(whenAtMost2Chars).not.toBeCalledWith(input);
    expect(whenAtMost2CharsFn).not.toBeCalledWith(input);
    expect(defaultFn).not.toBeCalledWith(input);
    expect(res).toBe("long: 1234");
  });

  test("should get answer on second match", () => {
    const input = "12";
    const switchCase = switcher
      .when(whenAtLeast4Chars)
      .then(whenAtLeast4CharsFn)
      .when(whenAtMost2Chars)
      .then(whenAtMost2CharsFn)
      .default(defaultFn);

    const res = switchCase.execute(input);

    expect(whenAtLeast4Chars).toBeCalledWith(input);
    expect(whenAtLeast4CharsFn).not.toBeCalledWith(input);
    expect(whenAtMost2Chars).toBeCalledWith(input);
    expect(whenAtMost2CharsFn).toBeCalledWith(input);
    expect(defaultFn).not.toBeCalledWith(input);
    expect(res).toBe("short: 12");
  });

  test("should get default when no match", () => {
    const input = "123";
    const switchCase = switcher
      .when(whenAtLeast4Chars)
      .then(whenAtLeast4CharsFn)
      .when(whenAtMost2Chars)
      .then(whenAtMost2CharsFn)
      .default(defaultFn);

    const res = switchCase.execute(input);

    expect(whenAtLeast4Chars).toBeCalledWith(input);
    expect(whenAtLeast4CharsFn).not.toBeCalledWith(input);
    expect(whenAtMost2Chars).toBeCalledWith(input);
    expect(whenAtMost2CharsFn).not.toBeCalledWith(input);
    expect(defaultFn).toBeCalledWith(input);
    expect(res).toBe("default: 123");
  });
});
