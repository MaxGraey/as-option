[![NPM registry](https://img.shields.io/npm/v/as-option.svg?style=for-the-badge)](https://www.npmjs.com/package/as-option)[![NPM license](https://img.shields.io/badge/license-MIT-green.svg?style=for-the-badge)](LICENSE.md)

Option
===

_Work In Progress_

Zero cost abstraction for `Option<T>` type. This abstraction is completely free for reference types, while other types that cannot yet be nullable such as `bool`, `i32` or `f64` will be wrapped in the class.

### Usage

```ts
import { Option, Some, None } from "as-option/assembly"

function maybeArray(arr: i32[] | null): Option<i32[]> {
  if (arr != null) {
    return Some(arr);
  } else {
    return None<i32[]>();
  }
}

function getDefaultFloat(input: Option<f64>): f64 {
  return input.unwrapOr(0.0);
}

function getDefaultInt(input: Option<i32>): i32 {
  return input.unwrapOrElse(() => -1);
}
```

## TODO

- [ ] support zero cost for types `sizeof<T>() < 32`
- [ ] tests
