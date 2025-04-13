# tiny-deep-merge

> A utility to deeply merge multiple plain objects.  
> Arrays are overwritten (not concatenated).  
> No options, no magic — deterministic merges.

---

## 🚀 Why use this?

- Deep merge of nested plain objects
- Merges any number of inputs
- Arrays and primitives are **overwritten** by default
- Zero dependencies (404 B minified and gzipped, compared to 723 B for `deepmerge`)
- Fully type-safe (TypeScript inference preserved)
- Does **not** mutate source objects

---

## 📦 Installation

```bash
npm install tiny-deep-merge
# or
pnpm add tiny-deep-merge
# or
yarn add tiny-deep-merge
```

## 🧪 Usage

```javascript
// ES Module
import { merge } from "tiny-deep-merge"

// CommonJS
const { merge } = require("tiny-deep-merge")

const a = { user: { name: "Jess", age: 25 } }
const b = { user: { age: 31, active: true } }

const result = merge(a, b)
// => { user: { name: "Jess", age: 31, active: true } }
```

## ✅ Multi-object merge

```javascript
merge({ a: 1 }, { b: 2 }, { c: { nested: true } })
// => { a: 1, b: 2, c: { nested: true } }
```

## 🧹 Arrays are overwritten by default

```javascript
merge({ tags: ["a", "b"] }, { tags: ["c"] })
// => { tags: ["c"] }
```

## 🔒 Does not mutate source objects

```javascript
const a = { count: 1 }
const b = { count: 2 }

const result = merge(a, b)

console.log(a) // { count: 1 }
console.log(result) // { count: 2 }
```

## 🧠 Type Safety

```javascript
const merged = merge({ id: 1 }, { name: "Alice" }, { profile: { age: 25 } })

// merged: { id: number, name: string, profile: { age: number } }
```

## 🤨 What this does not do

- No array concatenation — arrays are overwritten.
- No merging of class instances, Maps, Sets, or Dates.
- No custom merge strategies.
- No runtime bloat.

---

## 📄 License

MIT @ John James
