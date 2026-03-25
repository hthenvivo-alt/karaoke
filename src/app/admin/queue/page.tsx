'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useSocket } from '@/hooks/useSocket'

interface Registration {
  id: string
  singerName: string
  position: number
  status: 'WAITING' | 'CALLED' | 'SUNG'
  song: { id: string; title: string; artist: string }
}

interface ActiveEvent {
  id: string
  name: string
}

function SortableItem({
  reg,
  onCall,
  onSung,
  onReset,
}: {
  reg: Registration
  onCall: (id: string) => void
  onSung: (id: string) => void
  onReset: (id: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: reg.id })
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }

  return (
    <div ref={setNodeRef} style={style} className={`glass-card p-4 ${reg.status === 'SUNG' ? 'opacity-40' : ''}`}>
      <div className="flex items-center gap-3">
        <div {...attributes} {...listeners} className="drag-handle text-xl select-none">⠿</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {reg.status === 'CALLED' && <span className="badge badge-called">¡AHORA!</span>}
            {reg.status === 'WAITING' && <span className="badge badge-waiting">Esperando</span>}
            {reg.status === 'SUNG' && <span className="badge badge-sung">Cantó</span>}
          </div>
          <p className="font-bold text-white">{reg.singerName}</p>
          <p className="text-slate-400 text-sm truncate">{reg.song.title} — {reg.song.artist}</p>
        </div>
        <div className="flex flex-col gap-2 flex-shrink-0">
          {reg.status !== 'SUNG' && (
            <>
              {reg.status !== 'CALLED' ? (
                <button
                  onClick={() => onCall(reg.id)}
                  className="badge badge-called px-3 py-1.5 text-xs cursor-pointer hover:scale-105 transition-transform"
                >
                  🎤 Llamar
                </button>
              ) : (
                <button
                  onClick={() => onReset(reg.id)}
                  className="badge badge-waiting px-3 py-1.5 text-xs cursor-pointer"
                >
                  ↩ Esperar
                </button>
              )}
              <button
                onClick={() => onSung(reg.id)}
                className="badge badge-sung px-3 py-1.5 text-xs cursor-pointer hover:scale-105 transition-transform"
              >
                ✓ Cantó
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AdminQueuePage() {
  const router = useRouter()
  const [activeEvent, setActiveEvent] = useState<ActiveEvent | null>(null)
  const [queue, setQueue] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [showSung, setShowSung] = useState(false)

  const { on } = useSocket(activeEvent?.id)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const loadQueue = useCallback(async (eventId: string) => {
    const res = await fetch(`/api/queue?eventId=${eventId}`)
    const data = await res.json()
    setQueue(Array.isArray(data) ? data : [])
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && !sessionStorage.getItem('admin_auth')) {
      router.replace('/admin')
      return
    }
    fetch('/api/events/active')
      .then(r => r.json())
      .then(event => {
        setActiveEvent(event)
        if (event?.id) return loadQueue(event.id)
      })
      .finally(() => setLoading(false))
  }, [router, loadQueue])

  useEffect(() => {
    if (!activeEvent?.id) return
    const unsub = on(`queue:update:${activeEvent.id}`, () => loadQueue(activeEvent.id))
    return unsub
  }, [activeEvent?.id, on, loadQueue])

  const handleCall = async (id: string) => {
    if (!activeEvent) return
    await fetch('/api/queue', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'call', registrationId: id, eventId: activeEvent.id }),
    })
    await loadQueue(activeEvent.id)
  }

  const handleSung = async (id: string) => {
    if (!activeEvent) return
    await fetch('/api/queue', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'sung', registrationId: id, eventId: activeEvent.id }),
    })
    await loadQueue(activeEvent.id)
  }

  const handleReset = async (id: string) => {
    if (!activeEvent) return
    await fetch('/api/queue', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'reset', registrationId: id, eventId: activeEvent.id }),
    })
    await loadQueue(activeEvent.id)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id || !activeEvent) return

    const waiting = queue.filter(r => r.status !== 'SUNG')
    const oldIndex = waiting.findIndex(r => r.id === active.id)
    const newIndex = waiting.findIndex(r => r.id === over.id)
    const reordered = arrayMove(waiting, oldIndex, newIndex)
    const sung = queue.filter(r => r.status === 'SUNG')
    setQueue([...reordered, ...sung])

    const newPositions = reordered.map((r, i) => ({ id: r.id, position: i + 1 }))
    await fetch('/api/queue', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'reorder', eventId: activeEvent.id, newPositions }),
    })
  }

  const waiting = queue.filter(r => r.status !== 'SUNG')
  const sung = queue.filter(r => r.status === 'SUNG')
  const sortableIds = waiting.map(r => r.id)

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
        <div className="flex items-center justify-between">
          <div>
            <button onClick={() => router.push('/admin/dashboard')} className="text-slate-500 text-sm mb-1">← Dashboard</button>
            <h1 className="font-display text-3xl neon-text-purple">Cola en vivo</h1>
            {activeEvent && <p className="text-slate-400 text-xs">{activeEvent.name}</p>}
          </div>
          <div className="text-right">
            <div className="text-2xl font-display neon-text-pink">{waiting.length}</div>
            <div className="text-slate-500 text-xs">pendientes</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-safe">
        {!activeEvent ? (
          <div className="text-center mt-20">
            <p className="text-slate-400 text-lg">No hay evento activo</p>
            <button onClick={() => router.push('/admin/events')} className="btn-neon mt-4 max-w-xs mx-auto">
              Ir a eventos
            </button>
          </div>
        ) : waiting.length === 0 && sung.length === 0 ? (
          <div className="text-center mt-20">
            <div className="text-4xl mb-4">🎵</div>
            <p className="text-slate-400">Nadie se anotó todavía</p>
          </div>
        ) : (
          <>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={sortableIds} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col gap-3">
                  {waiting.map(reg => (
                    <SortableItem
                      key={reg.id}
                      reg={reg}
                      onCall={handleCall}
                      onSung={handleSung}
                      onReset={handleReset}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {sung.length > 0 && (
              <div className="mt-6">
                <button
                  onClick={() => setShowSung(!showSung)}
                  className="btn-secondary text-sm"
                >
                  {showSung ? 'Ocultar' : 'Ver'} ya cantaron ({sung.length})
                </button>
                {showSung && (
                  <div className="flex flex-col gap-2 mt-3">
                    {sung.map(reg => (
                      <div key={reg.id} className="glass-card p-3 opacity-40">
                        <p className="font-semibold text-white text-sm">{reg.singerName}</p>
                        <p className="text-slate-400 text-xs">{reg.song.title}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
