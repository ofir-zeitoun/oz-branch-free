import { buildSwitch } from "./switcher";

const grades = buildSwitch<number, string>()
  .when((g) => g > 100 || g < 0)
  .then((g) => {
    throw new Error(`invalid grade ${g}`);
  })
  .when((g) => g >= 90).then("A")
  .when((g) => g >= 80).then("B")
  .when((g) => g >= 70).then("C")
  .when((g) => g >= 60).then("D")
  .default("F");

const grade = grades.execute(85); // "B"