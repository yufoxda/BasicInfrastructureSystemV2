
import type { Context, Next } from 'hono'
import { AppContext } from '../../types'
import { SupabaseClient } from '@supabase/supabase-js'

export const dbMiddleware = async (c: Context<AppContext>, next: Next) => {
  // if (!c.env.SUPABASE_URL || !c.env.SUPABASE_PUBLISHABLE_KEY) {
  //   throw new Error('SUPABASE_URL or SUPABASE_PUBLISHABLE_KEY is not set')
  // }
  // const dbClient: SupabaseClient = new SupabaseClient(c.env.SUPABASE_URL, c.env.SUPABASE_PUBLISHABLE_KEY)
  c.set('db', null)

  await next()
}