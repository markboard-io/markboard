import type { AccountService } from './AccountService'
import type { ExcalidrawSyncService } from './ExcalidrawSyncService'

type OmitPrivateProperties<T> = Omit<T, '_startup' | 'startup' | 'serviceName'>

export interface IServices {
  account: OmitPrivateProperties<AccountService>
  excalidrawSync: OmitPrivateProperties<ExcalidrawSyncService>
}
