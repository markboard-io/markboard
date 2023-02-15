export type StoreSetter<T> = (value: T | ((value: T) => T)) => void
