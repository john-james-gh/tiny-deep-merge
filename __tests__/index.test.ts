import { expect, test } from "vitest"
import { merge } from "../src/index"

test("merges flat objects", () => {
  const result = merge({ a: 1 }, { b: 2 })
  expect(result).toEqual({ a: 1, b: 2 })
})

test("merges nested objects deeply", () => {
  const a = { user: { name: "John", age: 30 } }
  const b = { user: { age: 31, active: true } }

  const result = merge(a, b)
  expect(result).toEqual({ user: { name: "John", age: 31, active: true } })
})

test("overwrites arrays by default", () => {
  const a = { tags: ["a", "b"] }
  const b = { tags: ["c"] }

  const result = merge(a, b)
  expect(result).toEqual({ tags: ["c"] })
})

test("merges multiple objects in sequence", () => {
  const a = { one: 1 }
  const b = { two: 2 }
  const c = { three: 3 }

  const result = merge(a, b, c)
  expect(result).toEqual({ one: 1, two: 2, three: 3 })
})

test("overrides primitives", () => {
  const a = { count: 1, flag: true }
  const b = { count: 9, flag: false }

  const result = merge(a, b)
  expect(result).toEqual({ count: 9, flag: false })
})

test("does not mutate source objects", () => {
  const a = { list: [1, 2], nested: { value: 10 } }
  const b = { list: [3], nested: { value: 20 } }

  const result = merge(a, b)

  expect(a).toEqual({ list: [1, 2], nested: { value: 10 } })
  expect(b).toEqual({ list: [3], nested: { value: 20 } })
  expect(result).toEqual({ list: [3], nested: { value: 20 } })
})
