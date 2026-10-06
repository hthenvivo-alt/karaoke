// Pure helpers, safe to use in client components

export interface Singers {
  singerName: string
  members?: { singerName: string }[]
}

// Who sings a registration: the titular first, then companions in join order
export function singersOf(reg: Singers) {
  return [reg.singerName, ...(reg.members ?? []).map((m) => m.singerName)]
}

// "Ana", "Ana y Beto", "Ana, Beto y Caro"
export function formatSingers(reg: Singers) {
  const names = singersOf(reg)
  return names.length <= 1 ? names.join('') : `${names.slice(0, -1).join(', ')} y ${names[names.length - 1]}`
}

export function isSingerIn(reg: Singers, name: string) {
  const me = name.toLowerCase().trim()
  return singersOf(reg).some((n) => n.toLowerCase().trim() === me)
}
