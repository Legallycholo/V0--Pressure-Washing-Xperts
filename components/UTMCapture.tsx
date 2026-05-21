'use client'
import { useEffect } from 'react'
import { captureUTMs } from '@/lib/analytics'

export function UTMCapture() {
  useEffect(() => { captureUTMs() }, [])
  return null
}
