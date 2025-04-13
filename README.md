# tiny-deep-merge

> A tiny utility to deeply merge multiple plain objects.  
> Arrays are overwritten (not concatenated).  
> No options, no magic — just fast, deterministic merges.

---

## 🚀 Why use this?

Because you just want to merge objects.

- ✅ Deep merge of nested plain objects
- ✅ Merges any number of inputs
- ✅ Arrays and primitives are **overwritten** by default
- ✅ Zero dependencies. Size: 413 B
- ✅ Fully type-safe (TypeScript inference preserved)
- ✅ Does **not** mutate source objects
- 🧠 **Ultra lightweight & fast**

---

## 📦 Installation

```bash
npm install tiny-deep-merge
# or
pnpm add tiny-deep-merge
```

## 🧪 Usage

```
import { merge } from "tiny-deep-merge";

const a = { user: { name: "John", age: 30 } };
const b = { user: { age: 31, active: true } };

const result = merge(a, b);
// => { user: { name: "John", age: 31, active: true } }
```

## ✅ Multi-object merge

```
merge(
  { a: 1 },
  { b: 2 },
  { c: { nested: true } }
);
// => { a: 1, b: 2, c: { nested: true } }
```

## 🧹 Arrays are overwritten by default

```
merge(
  { tags: ["a", "b"] },
  { tags: ["c"] }
);
// => { tags: ["c"] }
```

## 🔒 Does not mutate source objects

```
const a = { count: 1 };
const b = { count: 2 };

const result = merge(a, b);

console.log(a); // { count: 1 }
console.log(result); // { count: 2 }
```

## 🧠 Type Safety

```
const merged = merge(
  { id: 1 },
  { name: "Alice" },
  { profile: { age: 25 } }
);

// merged: { id: number, name: string, profile: { age: number } }
```

No need for generics. No need for type gymnastics. It just works.

## 🤨 What this does not do

❌ No array: "concat" — arrays are overwritten.

❌ No merging of class instances, Maps, Sets, Dates.

❌ No custom merge strategies.

❌ No runtime bloat.

This is a tiny, predictable merge.

## 📄 License

MIT © John James
