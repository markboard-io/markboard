import { Services } from '/imports/services/client'

declare global {
  interface Window {
    /** backend services */
    Services: typeof Services
  }
}
