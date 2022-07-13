import { add, updateFormDataByKey } from "../index.js";

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
