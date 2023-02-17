export type StoreMethod<T> = (value: T) => void
export type StoreSetter<T> = (value: T | ((value: T) => T)) => void
