'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface Song {
  id: string
  title: string
  artist: string
  genre: string | null
  lyrics: string | null
  active: boolean
}

const GENRES = ['Rock Nacional', 'Pop', 'Cumbia', 'Balada', 'Rock', 'Folk', 'Otro']

export default function AdminCatalogPage() {
  const router = useRouter()
  const [songs, setSongs] = useState<Song[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [editSong, setEditSong] = useState<Song | null>(null)
  const [newSong, setNewSong] = useState({ title: '', artist: '', genre: '', lyrics: '' })
  const [showAddForm, setShowAddForm] = useState(false)
  const [saving, setSaving] = useState(false)

  const loadSongs = useCallback(async () => {
    const res = await fetch('/api/songs')
    const data = await res.json()
    setSongs(Array.isArray(data) ? data : [])
    setLoading(false)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && !sessionStorage.getItem('admin_auth')) {
      router.replace('/admin')
      return
    }
    loadSongs()
  }, [router, loadSongs])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await fetch('/api/songs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSong),
    })
    setNewSong({ title: '', artist: '', genre: '', lyrics: '' })
    setShowAddForm(false)
    await loadSongs()
    setSaving(false)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editSong) return
    setSaving(true)
    await fetch(`/api/songs/${editSong.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: editSong.title,
        artist: editSong.artist,
        genre: editSong.genre,
        lyrics: editSong.lyrics,
        active: editSong.active,
      }),
    })
    setEditSong(null)
    await loadSongs()
    setSaving(false)
  }

  const handleToggleActive = async (song: Song) => {
    await fetch(`/api/songs/${song.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !song.active }),
    })
    await loadSongs()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta canción del catálogo?')) return
    await fetch(`/api/songs/${id}`, { method: 'DELETE' })
    await loadSongs()
  }

  const filtered = songs.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.artist.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="gradient-bg min-h-dvh flex items-center justify-center">
        <p className="neon-text-purple animate-pulse">Cargando catálogo...</p>
      </div>
    )
  }

  return (
    <div className="gradient-bg min-h-dvh flex flex-col">
      <div className="glass-card rounded-none border-x-0 border-t-0 px-4 pt-safe pt-4 pb-3 sticky top-0 z-10">
        <button onClick={() => router.push('/admin/dashboard')} className="text-slate-500 text-sm mb-1">← Dashboard</button>
        <div className="flex items-center justify-between mb-3">
          <h1 className="font-display text-3xl neon-text-purple">Catálogo</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="badge badge-available cursor-pointer px-3 py-1.5 text-sm"
          >
            + Agregar
          </button>
        </div>
        <input
          className="input-neon text-sm py-2.5"
          placeholder="🔍 Buscar..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-safe">
        <p className="text-slate-500 text-xs mb-3">{songs.length} canciones • {songs.filter(s => s.active).length} activas</p>
        <div className="flex flex-col gap-2">
          {filtered.map(song => (
            <div key={song.id} className={`glass-card p-3 ${!song.active ? 'opacity-50' : ''}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm">
                    {song.title}
                    {song.lyrics && <span className="ml-1 text-purple-400 text-xs">📄</span>}
                  </p>
                  <p className="text-slate-400 text-xs">{song.artist}</p>
                  {song.genre && <p className="text-slate-600 text-xs">{song.genre}</p>}
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => setEditSong(song)}
                    className="badge badge-waiting cursor-pointer px-2 py-1 text-xs"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleToggleActive(song)}
                    className={`badge cursor-pointer px-2 py-1 text-xs ${song.active ? 'badge-available' : 'badge-sung'}`}
                    title={song.active ? 'Desactivar' : 'Activar'}
                  >
                    {song.active ? '✓' : '✗'}
                  </button>
                  <button
                    onClick={() => handleDelete(song.id)}
                    className="badge cursor-pointer px-2 py-1 text-xs text-red-400 border-red-400/30 bg-red-400/10"
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add new song modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/70 backdrop-blur-sm">
          <div className="glass-card w-full max-w-lg mx-auto p-5 slide-up max-h-[90dvh] overflow-y-auto">
            <h2 className="font-display text-2xl neon-text-pink mb-4">Nueva canción</h2>
            <form onSubmit={handleAdd} className="flex flex-col gap-3">
              <input className="input-neon text-sm" placeholder="Título *" value={newSong.title} onChange={e => setNewSong(f => ({ ...f, title: e.target.value }))} required />
              <input className="input-neon text-sm" placeholder="Artista *" value={newSong.artist} onChange={e => setNewSong(f => ({ ...f, artist: e.target.value }))} required />
              <select className="input-neon text-sm" value={newSong.genre} onChange={e => setNewSong(f => ({ ...f, genre: e.target.value }))}>
                <option value="">Género (opcional)</option>
                {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
              <textarea
                className="input-neon text-sm"
                placeholder="Letra (opcional)"
                rows={8}
                value={newSong.lyrics}
                onChange={e => setNewSong(f => ({ ...f, lyrics: e.target.value }))}
              />
              <div className="flex gap-3 mt-2">
                <button type="submit" className="btn-neon" disabled={saving}>
                  {saving ? 'Guardando...' : 'Guardar'}
                </button>
                <button type="button" className="btn-secondary" onClick={() => setShowAddForm(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit song modal */}
      {editSong && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/70 backdrop-blur-sm">
          <div className="glass-card w-full max-w-lg mx-auto p-5 slide-up max-h-[90dvh] overflow-y-auto">
            <h2 className="font-display text-2xl neon-text-purple mb-4">Editar canción</h2>
            <form onSubmit={handleUpdate} className="flex flex-col gap-3">
              <input className="input-neon text-sm" placeholder="Título" value={editSong.title} onChange={e => setEditSong(s => s && ({ ...s, title: e.target.value }))} required />
              <input className="input-neon text-sm" placeholder="Artista" value={editSong.artist} onChange={e => setEditSong(s => s && ({ ...s, artist: e.target.value }))} required />
              <select className="input-neon text-sm" value={editSong.genre || ''} onChange={e => setEditSong(s => s && ({ ...s, genre: e.target.value }))}>
                <option value="">Género (opcional)</option>
                {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
              <textarea
                className="input-neon text-sm"
                placeholder="Letra"
                rows={10}
                value={editSong.lyrics || ''}
                onChange={e => setEditSong(s => s && ({ ...s, lyrics: e.target.value }))}
              />
              <label className="flex items-center gap-2 text-slate-300 text-sm">
                <input type="checkbox" checked={editSong.active} onChange={e => setEditSong(s => s && ({ ...s, active: e.target.checked }))} />
                Canción activa (disponible en nuevos eventos)
              </label>
              <div className="flex gap-3 mt-2">
                <button type="submit" className="btn-neon" disabled={saving}>
                  {saving ? 'Guardando...' : 'Guardar cambios'}
                </button>
                <button type="button" className="btn-secondary" onClick={() => setEditSong(null)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
