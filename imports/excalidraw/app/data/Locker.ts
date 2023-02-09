/**
 * Class to manage lock and unlock functionality
 * @template T - Type of lock
 */
export class Locker<T extends string> {
  private locks = new Map<T, true>()

  constructor() {
    this.lock = this.lock.bind(this)
    this.unlock = this.unlock.bind(this)
    this.isLocked = this.isLocked.bind(this)
  }

  /**
   * Function to add lock
   * @param lockType - Type of lock to add
   */
  public lock(lockType: T) {
    this.locks.set(lockType, true)
  }

  /**
   * Function to remove lock
   * @param lockType - Type of lock to remove
   * @returns whether no locks remaining
   */
  public unlock(lockType: T) {
    this.locks.delete(lockType)
    return !this.isLocked()
  }

  /**
   * Function to check if some or specific lock is present
   * @param lockType - Type of lock to check (optional)
   * @returns whether some (or specific) locks are present
   */
  public isLocked(lockType?: T) {
    return lockType ? this.locks.has(lockType) : !!this.locks.size
  }
}
