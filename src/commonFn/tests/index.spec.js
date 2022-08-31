import {
  add,
  updateFormDataByKey,
  getSequence,
  gcd,
  typeOf,
} from "../index.js";

it("test", () => {
  expect(add(1, 2)).toBe(3);
});

describe("更新对象中的某个key值", () => {
  it("happy path", () => {
    const obj = {};
    updateFormDataByKey(obj, "a", "a");
    expect(obj.a).toBe("a");
    updateFormDataByKey(obj, "arr.0.name", "john");
    updateFormDataByKey(obj, "arr.0.age", "12");
    expect(obj.arr[0].name).toBe("john");
    expect(obj.arr[0].age).toBe("12");
    expect(obj.a).toBe("a");
    updateFormDataByKey(obj, "arr.1.name", "tom");
    updateFormDataByKey(obj, "arr.1.age", "20");
    expect(obj.arr[0].name).toBe("john");
    expect(obj.arr[0].age).toBe("12");
    expect(obj.arr[1].name).toBe("tom");
    expect(obj.arr[1].age).toBe("20");
    expect(obj.a).toBe("a");
  });
});

describe("最长递增序列", () => {
  const result = getSequence([7, 7, 7, 7, 7]);
  expect(result).toEqual([0]);

  const result2 = getSequence([
    0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15,
  ]);
  expect(result2).toEqual([0, 4, 6, 9, 13, 15]);
});
describe("最大公约数", () => {
  expect(gcd(10, 5)).toBe(5);
  expect(gcd(2000, 475)).toBe(25);
  expect(gcd(2000, 1)).toBe(1);
});

describe("判断类型", () => {
  expect(typeOf(10)).toBe('number');
  expect(typeOf('10')).toBe('string');
  expect(typeOf({obj: 10})).toBe('object');
  expect(typeOf([])).toBe('array');
  expect(typeOf(true)).toBe('boolean');
  expect(typeOf(() => {})).toBe('function');
  expect(typeOf(null)).toBe('null');
});
