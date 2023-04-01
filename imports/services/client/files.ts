import { Collections } from '/imports/models/Collections'
import { Document } from 'bson'

export function uploadFile(file: File): Promise<string> {
  const FilesCollection = Collections.getCollectionByName('files') as any
  return new Promise((resolve, reject) => {
    const upload = FilesCollection.insert(
      {
        file,
        chunkSize: 'dynamic',
        meta: {},
        transport: 'http'
      },
      false
    )
    upload.on('end', (error: Error, file: Document) => {
      if (error) {
        console.error('upload fail', error)
        reject(error)
      } else {
        resolve(`/files/${file._id}`)
      }
    })
    upload.start()
  })
}
