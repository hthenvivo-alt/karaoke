/**
 * Utilities for parsing lyrics that contain inline chord notation.
 *
 * Chord format: [ChordName] placed inline within lyrics text.
 * Example: "[Em]Muerdo el anzuelo y [A]vuelvo"
 */

export interface ChordLyricToken {
  chord: string | null
  text: string
}

/**
 * Strip all chord notations from lyrics, returning clean readable text.
 * Ensures words split by chords are joined back together.
 *
 * "[Em]Muerdo el anzuelo y [A]vuelvo"  →  "Muerdo el anzuelo y vuelvo"
 * "[B7]costumbres ar[C]genti[D]nas"    →  "costumbres argentinas"
 */
export function stripChords(lyrics: string): string {
  return lyrics.replace(/\[([^\]]+)\]/g, '')
}

/**
 * Parse a single line into tokens of { chord, text } for rendering
 * chords positioned above their corresponding text segment.
 *
 * "[Em]Muerdo el anzuelo y [A]vuelvo"
 *   → [{ chord: "Em", text: "Muerdo el anzuelo y " }, { chord: "A", text: "vuelvo" }]
 */
export function parseLine(line: string): ChordLyricToken[] {
  const regex = /\[([^\]]+)\]/g
  const tokens: ChordLyricToken[] = []

  let match
  let lastIndex = 0
  let currentChord: string | null = null

  while ((match = regex.exec(line)) !== null) {
    const matchIndex = match.index
    const textSegment = line.substring(lastIndex, matchIndex)

    if (textSegment || currentChord) {
      tokens.push({
        chord: currentChord,
        text: textSegment || '',
      })
    }

    currentChord = match[1]
    lastIndex = regex.lastIndex
  }

  const remainingText = line.substring(lastIndex)
  if (remainingText || currentChord) {
    tokens.push({
      chord: currentChord,
      text: remainingText || '',
    })
  }

  if (tokens.length === 0) {
    tokens.push({ chord: null, text: '' })
  }

  return tokens
}

/**
 * Check whether lyrics contain chord notation.
 */
export function hasChords(lyrics: string): boolean {
  return /\[[A-G][^\]]*\]/.test(lyrics)
}
