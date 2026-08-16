import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://knrkhnkezubqjcvxlroo.supabase.co'
const supabaseKey = 'sb_publishable_RxeYtfrtBe8j8sHnHWAKHw_cM2Wlgbl'

export const supabase = createClient(supabaseUrl, supabaseKey)