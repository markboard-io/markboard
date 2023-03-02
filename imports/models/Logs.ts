import { BaseCollection } from './BaseCollection'
import dayjs from 'dayjs'

export interface ILog {
  type: 'startup' | 'error'
  content: string
  timestamp: number
}

export class LogsCollection extends BaseCollection<ILog> {
  constructor() {
    super('logs')
  }

  public appendStartupLog() {
    this.insert({
      type: 'startup',
      content: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      timestamp: Date.now()
    })
  }
}

export const Logs = new LogsCollection()
