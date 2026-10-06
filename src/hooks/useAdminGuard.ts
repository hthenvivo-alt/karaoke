'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Sends the user back to the PIN screen when the server-side admin session is missing or expired
export function useAdminGuard() {
  const router = useRouter()
  useEffect(() => {
    fetch('/api/admin/auth')
      .then((r) => r.json())
      .then((data) => {
        if (!data?.ok) router.replace('/admin')
      })
      .catch(() => router.replace('/admin'))
  }, [router])
}
