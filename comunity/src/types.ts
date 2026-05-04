import { authUser, appUser } from './api/core/auth'

export type CloudflareBindings = {
  SUPABASE_PUBLISHABLE_KEY: string
  SUPABASE_URL: string
}

export type AppContext = {
  Bindings: CloudflareBindings
  Variables: {
    db: unknown // todo: dbclient
    appUser: appUser
  }
}