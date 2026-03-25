'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Event {
  id: string
  name: string
  date: string
  status: string
  _count?: { registrations: number }
}

export default function AdminDashboard() {
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined' && !sessionStorage.getItem('admin_auth')) {
      router.replace('/admin')
      return
    }
    fetch('/api/events').then(r => r.json()).then(data => {
      setEvents(Array.isArray(data) ? data : [])
      setLoading(false)
    })
  }, [router])

  const nav = [
    { label: '🎤 Cola en vivo', path: '/admin/queue', desc: 'Ver y gestionar quién canta' },
    { label: '📅 Eventos', path: '/admin/events', desc: 'Crear y administrar fechas' },
    { label: '🎵 Catálogo', path: '/admin/catalog', desc: 'Agregar canciones y letras' },
    { label: '📺 Pantalla grande', path: '/admin/screen', desc: 'Modo proyector / TV' },
  ]

  const activeEvent = events.find(e => e.status === 'ACTIVE')

  if (loading) {
    return (
      <div className="gradient-bg min-h-dvh flex items-center justify-center">
        <p className="neon-text-purple animate-pulse">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="gradient-bg min-h-dvh flex flex-col px-4 pt-safe pt-6 pb-safe">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-4xl neon-text-purple">Panel Admin</h1>
          <p className="text-slate-500 text-xs">KaraOK 🎤</p>
        </div>
        <button
          onClick={() => { sessionStorage.removeItem('admin_auth'); router.push('/') }}
          className="text-slate-600 text-sm hover:text-slate-400"
        >
          Salir
        </button>
      </div>

      {/* Active event status */}
      <div className="glass-card p-4 mb-6">
        {activeEvent ? (
          <div className="flex items-center justify-between">
            <div>
              <span className="badge badge-available mb-1">● EN VIVO</span>
              <p className="font-bold text-white">{activeEvent.name}</p>
              <p className="text-slate-400 text-xs">
                {new Date(activeEvent.date).toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' })}
                {activeEvent._count && ` • ${activeEvent._count.registrations} inscriptos`}
              </p>
            </div>
            <button
              onClick={() => router.push('/admin/queue')}
              className="badge badge-called px-4 py-2 text-sm"
            >
              Ver cola →
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-slate-400 text-sm">No hay evento activo</p>
            <button onClick={() => router.push('/admin/events')} className="btn-neon mt-3 py-2 text-sm">
              Crear / activar evento
            </button>
          </div>
        )}
      </div>

      {/* Navigation cards */}
      <div className="grid grid-cols-2 gap-3">
        {nav.map(item => (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className="glass-card p-4 text-left hover:border-purple-500/50 transition-all active:scale-95"
          >
            <div className="text-2xl mb-2">{item.label.split(' ')[0]}</div>
            <div className="font-semibold text-white text-sm">{item.label.split(' ').slice(1).join(' ')}</div>
            <div className="text-slate-500 text-xs mt-1">{item.desc}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
