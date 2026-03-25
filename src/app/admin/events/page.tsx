'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Event {
  id: string
  name: string
  date: string
  status: string
  maxSingers: number
  _count?: { registrations: number }
}

interface Song {
  id: string
  title: string
  artist: string
}

export default function AdminEventsPage() {
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([])
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState({ name: '', date: '', maxSingers: '' })

  useEffect(() => {
    if (typeof window !== 'undefined' && !sessionStorage.getItem('admin_auth')) {
      router.replace('/admin')
      return
    }
    Promise.all([
      fetch('/api/events').then(r => r.json()),
      fetch('/api/songs').then(r => r.json()),
    ]).then(([evts, sngs]) => {
      setEvents(Array.isArray(evts) ? evts : [])
      setSongs(Array.isArray(sngs) ? sngs : [])
      setLoading(false)
    })
  }, [router])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.date) return
    setCreating(true)
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, date: form.date, maxSingers: form.maxSingers || 0 }),
    })
    const event = await res.json()
    setEvents(prev => [event, ...prev])
    setForm({ name: '', date: '', maxSingers: '' })
    setCreating(false)
  }

  const handleStatus = async (id: string, status: string) => {
    await fetch(`/api/events/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    const res = await fetch('/api/events')
    setEvents(await res.json())
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este evento? Se borrarán todas las inscripciones.')) return
    await fetch(`/api/events/${id}`, { method: 'DELETE' })
    setEvents(prev => prev.filter(e => e.id !== id))
  }

  const statusLabel: Record<string, string> = { UPCOMING: 'Próximo', ACTIVE: 'Activo', CLOSED: 'Cerrado' }
  const statusBadge: Record<string, string> = {
    UPCOMING: 'badge-waiting',
    ACTIVE: 'badge-available',
    CLOSED: 'badge-sung',
  }

  if (loading) {
    return (
      <div className="gradient-bg min-h-dvh flex items-center justify-center">
        <p className="neon-text-purple animate-pulse">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="gradient-bg min-h-dvh flex flex-col">
      <div className="glass-card rounded-none border-x-0 border-t-0 px-4 pt-safe pt-4 pb-3 sticky top-0 z-10">
        <button onClick={() => router.push('/admin/dashboard')} className="text-slate-500 text-sm mb-1">← Dashboard</button>
        <h1 className="font-display text-3xl neon-text-purple">Eventos</h1>
        <p className="text-slate-500 text-xs">{songs.length} canciones en el catálogo</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-safe">
        {/* Create form */}
        <div className="glass-card p-4 mb-6">
          <h2 className="font-semibold text-white mb-3">Crear nuevo evento</h2>
          <form onSubmit={handleCreate} className="flex flex-col gap-3">
            <input
              className="input-neon text-sm"
              placeholder="Nombre del evento"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
            <input
              className="input-neon text-sm"
              type="date"
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            />
            <div className="flex items-center gap-2">
              <input
                className="input-neon text-sm flex-1"
                type="number"
                min="0"
                placeholder="Máx. cantantes (0 = sin límite)"
                value={form.maxSingers}
                onChange={e => setForm(f => ({ ...f, maxSingers: e.target.value }))}
              />
            </div>
            <p className="text-slate-500 text-xs -mt-1">Dejá en 0 o vacío si no querés límite de inscriptos.</p>
            <button type="submit" className="btn-neon py-3 text-sm" disabled={!form.name || !form.date || creating}>
              {creating ? 'Creando...' : '+ Crear evento (todas las canciones activas)'}
            </button>
          </form>
        </div>

        {/* Event list */}
        <div className="flex flex-col gap-3">
          {events.map(event => (
            <div key={event.id} className="glass-card p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`badge ${statusBadge[event.status]}`}>{statusLabel[event.status]}</span>
                  </div>
                  <p className="font-bold text-white">{event.name}</p>
                  <p className="text-slate-400 text-xs">
                    {new Date(event.date).toLocaleDateString('es-AR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
                  </p>
                  {event._count && (
                    <p className="text-slate-500 text-xs">
                      {event._count.registrations} inscriptos
                      {event.maxSingers > 0 && ` / ${event.maxSingers} máximo`}
                      {event.maxSingers > 0 && event._count.registrations >= event.maxSingers && (
                        <span className="ml-2 text-red-400 font-semibold">● LLENO</span>
                      )}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {event.status !== 'ACTIVE' && (
                  <button
                    onClick={() => handleStatus(event.id, 'ACTIVE')}
                    className="badge badge-available cursor-pointer px-3 py-1.5 text-xs hover:scale-105 transition-transform"
                  >
                    ▶ Activar
                  </button>
                )}
                {event.status === 'ACTIVE' && (
                  <button
                    onClick={() => handleStatus(event.id, 'CLOSED')}
                    className="badge badge-sung cursor-pointer px-3 py-1.5 text-xs hover:scale-105 transition-transform"
                  >
                    ■ Cerrar
                  </button>
                )}
                {event.status !== 'CLOSED' && (
                  <button
                    onClick={() => handleStatus(event.id, 'UPCOMING')}
                    className="badge badge-waiting cursor-pointer px-3 py-1.5 text-xs"
                  >
                    ⏸ Próximo
                  </button>
                )}
                <button
                  onClick={() => handleDelete(event.id)}
                  className="badge cursor-pointer px-3 py-1.5 text-xs text-red-400 border-red-400/30 bg-red-400/10 hover:scale-105 transition-transform"
                >
                  🗑 Borrar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
