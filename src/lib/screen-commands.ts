// Commands the admin panel sends to the big screen (/admin/operator) through the server

export type ViewMode = 'lyrics' | 'singer_intro' | 'qr'

export type ScreenCommand =
  | { type: 'play' }
  | { type: 'pause' }
  | { type: 'scroll_top' }
  | { type: 'speed'; value: number }
  | { type: 'font_size'; value: number }
  | { type: 'nudge'; value: 1 | -1 }
  | { type: 'set_view_mode'; value: ViewMode }

export const MIN_FONT_SIZE = 16
export const MAX_FONT_SIZE = 96

const VIEW_MODES: ViewMode[] = ['lyrics', 'singer_intro', 'qr']

// Returns a clean command, or null if the payload is not a valid one
export function parseScreenCommand(input: unknown): ScreenCommand | null {
  if (!input || typeof input !== 'object') return null
  const { type, value } = input as { type?: unknown; value?: unknown }
  switch (type) {
    case 'play':
    case 'pause':
    case 'scroll_top':
      return { type }
    case 'speed':
      return Number.isInteger(value) && (value as number) >= 1 && (value as number) <= 5
        ? { type, value: value as number }
        : null
    case 'font_size':
      return Number.isInteger(value) && (value as number) >= MIN_FONT_SIZE && (value as number) <= MAX_FONT_SIZE
        ? { type, value: value as number }
        : null
    case 'nudge':
      return value === 1 || value === -1 ? { type, value } : null
    case 'set_view_mode':
      return VIEW_MODES.includes(value as ViewMode) ? { type, value: value as ViewMode } : null
    default:
      return null
  }
}
