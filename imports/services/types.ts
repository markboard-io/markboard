import type { AccountService } from './AccountService'
import type { BoardService } from './BoardService'
import type { ExcalidrawSyncService } from './ExcalidrawSyncService'
import type { StaticAssetsService } from './StaticAssetsService'
import type { AppService } from './AppService'
import type { FilesService } from './FilesService'
import type { RedirectService } from './RedirectService'
import type { BoardFavoriteService } from './BoardFavoriteService'

type OmitPrivateProperties<T> = Omit<T, '_startup' | 'startup' | 'serviceName'>

export type Promisify<T extends (...args: any) => any> = (
  ...args: Parameters<T>
) => ReturnType<T> extends Promise<any> ? ReturnType<T> : Promise<ReturnType<T>>

export type PromisifyClass<T> = {
  [K in keyof T]: T[K] extends (...args: any) => any ? Promisify<T[K]> : T[K]
}

export interface IServices {
  app: AppService
  account: AccountService
  excalidrawSync: ExcalidrawSyncService
  staticAssets: StaticAssetsService
  board: BoardService
  board_favorite: BoardFavoriteService
  files: FilesService
  redirect: RedirectService
}

export type ServerServices = {
  [K in keyof IServices]: OmitPrivateProperties<IServices[K]>
}

export type ClientServices = {
  [K in keyof IServices]: OmitPrivateProperties<PromisifyClass<IServices[K]>>
}
