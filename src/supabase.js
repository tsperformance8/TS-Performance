import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ddvumpxblvblqclhaehc.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkdnVtcHhibHZibHFjbGhhZWhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MzU5NTEsImV4cCI6MjA4ODMxMTk1MX0.xYmcHOwXpKNn41YP-r400QYUTA0myAZEhHxhYvvZoQs'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)