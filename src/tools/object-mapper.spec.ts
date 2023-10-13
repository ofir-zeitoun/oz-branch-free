import { describe, expect, test } from "@jest/globals";
import { objectMapper } from "./object-mapper";

describe("object-mapper", () => {
  const obj = objectMapper(
    {
      a: 1,
      b: 2,
    },
    "none"
  );

  test("should get correct value on existing entry", () => {
    expect(obj.a).toBe(1);
  });

  test("should get default value on non existing entry", () => {
    expect(obj.c).toBe("none");
  });
});
