// Tiny Deep Merge 🧠
// Deeply merges multiple plain objects. Arrays are overwritten (not concatenated).
// Only merges plain objects. Does NOT mutate inputs.

/**
 * Determines whether a value is a plain object.
 * Excludes arrays, null, class instances, etc.
 */
export function is_plain_object(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    Object.prototype.toString.call(value) === "[object Object]"
  )
}

/**
 * Recursively merges two plain objects.
 *
 * - Nested plain objects are deeply merged.
 * - Arrays and primitives are overwritten.
 * - Original inputs are not mutated.
 *
 * @param a - Target object (base)
 * @param b - Source object (applied on top of `a`)
 * @returns A new deeply merged object of type T & U
 */
function merge_two<T extends object, U extends object>(a: T, b: U): T & U {
  const result: Record<string, unknown> = {}

  // Shallow copy keys from `a`
  for (const key in a) {
    const val = (a as Record<string, unknown>)[key]
    result[key] = is_plain_object(val) ? merge_two({}, val) : val
  }

  // Merge/override keys from `b`
  for (const key in b) {
    const val = (b as Record<string, unknown>)[key]
    const existing = result[key]

    result[key] =
      is_plain_object(val) && is_plain_object(existing)
        ? merge_two(existing, val)
        : val
  }

  return result as T & U
}

/**
 * Recursively intersects the types of all provided objects.
 * Used to infer the final return type from `merge(...)`.
 */
type MergeResult<T extends object[]> = T extends [infer First, ...infer Rest]
  ? First & MergeResult<Extract<Rest, object[]>>
  : Record<string, unknown>

/**
 * Merges multiple plain objects deeply.
 *
 * - Objects are merged left-to-right: last object overrides earlier ones.
 * - Arrays and primitives are overwritten, not merged.
 * - Non-mutating: all inputs are left untouched.
 *
 * @param objects - List of plain objects to merge
 * @returns A new object representing the deeply merged result
 */
export function merge<T extends object[]>(...objects: T): MergeResult<T> {
  return objects.reduce(
    (acc, curr) => merge_two(acc, curr),
    {},
  ) as MergeResult<T>
}
