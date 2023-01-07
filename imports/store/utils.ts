export function attachDebugLabel<T extends object>(atom: T, debugLabel: string): T {
  return Object.assign(atom, { debugLabel })
}
