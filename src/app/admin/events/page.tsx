'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Event {
  id: string
  name: string
  date: string
  status: string
  maxSingers: number
  _count?: { registrations: number; eventSongs: number }
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

  // Song selection states
  const [managingEvent, setManagingEvent] = useState<Event | null>(null)
  const [eventSongs, setEventSongs] = useState<string[]>([])
  const [loadingEventSongs, setLoadingEventSongs] = useState(false)
  const [songSearch, setSongSearch] = useState('')
  const [savingSongs, setSavingSongs] = useState<Record<string, boolean>>({})

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

  const handleReplicate = async (event: Event) => {
    const newName = prompt('Nombre del nuevo evento:', `${event.name} (Copia)`)
    if (!newName) return

    const todayStr = new Date().toISOString().split('T')[0]
    const newDate = prompt('Fecha del nuevo evento (AAAA-MM-DD):', todayStr)
    if (!newDate) return

    setCreating(true)
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName,
          date: newDate,
          maxSingers: event.maxSingers,
          replicateFromEventId: event.id,
        }),
      })
      if (res.ok) {
        const newEvent = await res.json()
        setEvents(prev => [newEvent, ...prev])
      } else {
        alert('Error al replicar el evento.')
      }
    } catch (err) {
      console.error(err)
      alert('Error de red al replicar el evento.')
    } finally {
      setCreating(false)
    }
  }

  const openManageSongs = async (event: Event) => {
    setManagingEvent(event)
    setLoadingEventSongs(true)
    setSongSearch('')
    try {
      const res = await fetch(`/api/events/${event.id}`)
      if (res.ok) {
        const data = await res.json()
        const selectedIds = data.eventSongs?.map((es: any) => es.songId) || []
        setEventSongs(selectedIds)
      }
    } catch (err) {
      console.error('Error fetching event songs:', err)
    } finally {
      setLoadingEventSongs(false)
    }
  }

  const handleToggleSong = async (songId: string, isSelected: boolean) => {
    if (!managingEvent) return

    // Optimistic UI update
    setEventSongs(prev =>
      isSelected ? prev.filter(id => id !== songId) : [...prev, songId]
    )
    setSavingSongs(prev => ({ ...prev, [songId]: true }))

    try {
      const res = await fetch(`/api/events/${managingEvent.id}/songs`, {
        method: isSelected ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ songId }),
      })
      if (!res.ok) {
        throw new Error('Error al actualizar canción')
      }

      // Update the main event list count
      setEvents(prev =>
        prev.map(e => {
          if (e.id === managingEvent.id) {
            const currentCount = e._count?.eventSongs ?? 0
            const nextCount = isSelected ? Math.max(0, currentCount - 1) : currentCount + 1
            return {
              ...e,
              _count: {
                ...e._count,
                registrations: e._count?.registrations ?? 0,
                eventSongs: nextCount,
              },
            }
          }
          return e
        })
      )
    } catch (err) {
      console.error(err)
      // Rollback optimistic update
      setEventSongs(prev =>
        isSelected ? [...prev, songId] : prev.filter(id => id !== songId)
      )
      alert('No se pudo actualizar el estado de la canción.')
    } finally {
      setSavingSongs(prev => ({ ...prev, [songId]: false }))
    }
  }

  const handleBulkSongs = async (action: 'enable_all' | 'disable_all') => {
    if (!managingEvent) return
    const activeSongs = songs.map(s => s.id)
    const isEnable = action === 'enable_all'

    // Optimistic UI update
    setEventSongs(isEnable ? activeSongs : [])

    try {
      const res = await fetch(`/api/events/${managingEvent.id}/songs`, {
        method: isEnable ? 'POST' : 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ songIds: activeSongs }),
      })
      if (!res.ok) {
        throw new Error('Error en actualización masiva')
      }

      // Update the main event list count
      setEvents(prev =>
        prev.map(e => {
          if (e.id === managingEvent.id) {
            return {
              ...e,
              _count: {
                ...e._count,
                registrations: e._count?.registrations ?? 0,
                eventSongs: isEnable ? activeSongs.length : 0,
              },
            }
          }
          return e
        })
      )
    } catch (err) {
      console.error(err)
      // Re-fetch to get accurate state on failure
      const refetchRes = await fetch(`/api/events/${managingEvent.id}`)
      if (refetchRes.ok) {
        const data = await refetchRes.json()
        setEventSongs(data.eventSongs?.map((es: any) => es.songId) || [])
      }
      alert('Error al realizar la acción masiva.')
    }
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
                    <div className="text-slate-500 text-xs mt-1 space-y-0.5">
                      <p>
                        {event._count.registrations} inscriptos
                        {event.maxSingers > 0 && ` / ${event.maxSingers} máximo`}
                        {event.maxSingers > 0 && event._count.registrations >= event.maxSingers && (
                          <span className="ml-2 text-red-400 font-semibold">● LLENO</span>
                        )}
                      </p>
                      <p>
                        🎵 {event._count.eventSongs ?? 0} canciones habilitadas
                      </p>
                    </div>
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
                  onClick={() => openManageSongs(event)}
                  className="badge cursor-pointer px-3 py-1.5 text-xs text-purple-400 border-purple-400/30 bg-purple-400/10 hover:scale-105 transition-transform"
                >
                  🎵 Canciones
                </button>
                <button
                  onClick={() => handleReplicate(event)}
                  className="badge cursor-pointer px-3 py-1.5 text-xs text-emerald-400 border-emerald-400/30 bg-emerald-400/10 hover:scale-105 transition-transform"
                >
                  🔄 Replicar
                </button>
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

      {managingEvent && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.15)]">
            {/* Modal Header */}
            <div className="p-4 border-b border-purple-500/20 flex justify-between items-start">
              <div>
                <h3 className="font-display text-xl text-white font-bold">Gestionar Canciones</h3>
                <p className="text-slate-400 text-xs mt-0.5">{managingEvent.name}</p>
                <p className="text-purple-400 text-xs font-semibold mt-1">
                  {eventSongs.length} de {songs.length} canciones seleccionadas
                </p>
              </div>
              <button
                onClick={() => setManagingEvent(null)}
                className="text-slate-400 hover:text-white text-xl p-1"
              >
                ✕
              </button>
            </div>

            {/* Bulk actions & Search */}
            <div className="p-4 border-b border-purple-500/10 flex flex-col gap-3">
              <input
                type="text"
                placeholder="Buscar canción por título o artista..."
                className="input-neon text-sm w-full"
                value={songSearch}
                onChange={e => setSongSearch(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkSongs('enable_all')}
                  className="flex-1 text-center py-2 rounded-xl text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors cursor-pointer"
                >
                  ✓ Habilitar todas
                </button>
                <button
                  onClick={() => handleBulkSongs('disable_all')}
                  className="flex-1 text-center py-2 rounded-xl text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25 transition-colors cursor-pointer"
                >
                  ✗ Deshabilitar todas
                </button>
              </div>
            </div>

            {/* Songs List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {loadingEventSongs ? (
                <div className="py-8 text-center text-slate-500 text-sm animate-pulse">
                  Cargando canciones del evento...
                </div>
              ) : (
                songs
                  .filter(
                    song =>
                      song.title.toLowerCase().includes(songSearch.toLowerCase()) ||
                      song.artist.toLowerCase().includes(songSearch.toLowerCase())
                  )
                  .map(song => {
                    const isSelected = eventSongs.includes(song.id)
                    const isSaving = savingSongs[song.id]
                    return (
                      <div
                        key={song.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex flex-col pr-3 min-w-0">
                          <span className="text-white font-medium text-sm truncate">{song.title}</span>
                          <span className="text-slate-400 text-xs truncate">{song.artist}</span>
                        </div>
                        <button
                          onClick={() => handleToggleSong(song.id, isSelected)}
                          disabled={isSaving}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.15)] hover:scale-105'
                              : 'bg-slate-500/10 text-slate-400 border border-slate-500/20 hover:scale-105'
                          }`}
                        >
                          {isSaving ? 'Guardando...' : isSelected ? '✓ Habilitada' : '✗ Deshabilitada'}
                        </button>
                      </div>
                    )
                  })
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-purple-500/20 bg-white/5 flex justify-end">
              <button
                onClick={() => setManagingEvent(null)}
                className="btn-neon !w-auto !py-2 !px-6 text-sm"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
