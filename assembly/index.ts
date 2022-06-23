const UNWRAP_ERR = "Option is 'None' during unwrap";

// @ts-ignore: decorator
@inline export function Some<T>(value: T): Option<T> {
  return new Option<T>(value, false);
}

// @ts-ignore: decorator
@inline export function None<T>(): Option<T> {
  return new Option<T>(changetype<T>(0), true);
}

@final export class Option<T> {
  public value: T = changetype<T>(0);
  private none: bool = false;

  constructor(value: T, none: bool) {
    if (isReference<T>()) {
      return changetype<this>(value);
    } else {
      this.value = value;
      this.none = none;
    }
  }

  get isRef(): bool {
    return isReference<T>();
  }

  get isNone(): bool {
    if (isReference<T>()) {
      return changetype<usize>(this) == 0;
    } else {
      return this.none;
    }
  }

  get isSome(): bool {
    if (isReference<T>()) {
      return changetype<usize>(this) != 0;
    } else {
      return !this.none;
    }
  }

  unwrap(): T {
    if (isReference<T>()) {
      if (changetype<usize>(this) == 0) throw new Error(UNWRAP_ERR);
      return changetype<T>(this);
    } else {
      if (this.none) throw new Error(UNWRAP_ERR);
      return this.value;
    }
  }

  @unsafe unwrapUnchecked(): T {
    if (isReference<T>()) {
      return changetype<T>(this);
    } else {
      return this.value;
    }
  }

  unwrapOr(defaultValue: T): T {
    if (isReference<T>()) {
      return changetype<T>(this) || defaultValue;
    } else {
      return !this.none ? this.value : defaultValue;
    }
  }

  unwrapOrElse(action: () => T): T {
    if (isReference<T>()) {
      return changetype<T>(this) || action();
    } else {
      return !this.none ? this.value : action();
    }
  }

  map<U>(fn: (value: T) => U): Option<U> {
    if (isReference<T>()) {
      if (changetype<usize>(this) != 0) {
        return Some(fn(changetype<T>(this)));
      } else {
        return None<U>();
      }
    } else {
      if (!this.none) {
        return Some(fn(this.value));
      } else {
        return None<U>();
      }
    }
  }

  mapOr<U>(fn: (value: T) => U, defaultValue: U): U {
    if (isReference<T>()) {
      if (changetype<usize>(this) != 0) {
        return fn(changetype<T>(this));
      } else {
        return defaultValue;
      }
    } else {
      if (!this.none) {
        return fn(this.value);
      } else {
        return defaultValue;
      }
    }
  }

  and<U>(other: Option<U>): Option<U> {
    if (isReference<T>()) {
      return changetype<usize>(this) != 0 ? other : None<U>();
    } else {
      return !this.none ? other : None<U>();
    }
  }

  or(other: Option<T>): Option<T> {
    if (isReference<T>()) {
      return changetype<Option<T>>(this) || other;
    } else {
      return !this.none ? this : other;
    }
  }

  @inline @operator("==")
  eq(other: Option<T>): bool {
    if (isReference<T>()) {
      return changetype<usize>(this) == changetype<usize>(other);
    } else {
      if (this.none && other.isNone) {
        return true;
      } else if (!this.none && other.isSome) {
        return this.value == other.value;
      } else {
        return false;
      }
    }
  }

  @inline @operator("!=")
  ne(other: Option<T>): bool {
    return !this.eq(other);
  }
}
