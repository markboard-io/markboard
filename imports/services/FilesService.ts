import { Collections } from '../models/Collections'
import { BaseService } from './BaseService'
import { WebApp } from 'meteor/webapp'
import fs from 'fs'

export class FilesService extends BaseService {
  constructor() {
    super('files')
  }

  public startup(): void {
    const FilesCollection = Collections.getCollectionByName('files')
    WebApp.rawConnectHandlers.use((req, res, next) => {
      if (req.url?.startsWith('/files/')) {
        const matches = req.url!.match(/\/files\/([^/]+)/)
        if (matches != null) {
          const id = matches[1]
          const cursor = FilesCollection.findOne(id)
          if (cursor) {
            const readStream = fs.createReadStream(cursor.get('path'))
            return readStream.pipe(res)
          }
        }
        res.writeHead(404)
        return res.end()
      }
      return next()
    })
  }
}
