import type { ChatBubble } from '@/context/MuseumContext';

export interface ChatBubbleSyncState {
  seq: number;
  shown: boolean;
}

/**
 * Cập nhật trực tiếp DOM của bong bóng chat trong useFrame, không qua React state,
 * để nhiều người chat cùng lúc vẫn không làm re-render cảnh 3D.
 * Dùng textContent nên nội dung người dùng không bao giờ được hiểu là HTML.
 */
export function syncChatBubble(
  el: HTMLDivElement | null,
  bubble: ChatBubble | undefined,
  sync: ChatBubbleSyncState,
  now: number,
) {
  if (!el) return;
  const active = !!bubble && bubble.expiresAt > now;
  if (active && bubble.seq !== sync.seq) {
    el.textContent = bubble.text;
    sync.seq = bubble.seq;
  }
  if (active !== sync.shown) {
    el.style.display = active ? 'block' : 'none';
    sync.shown = active;
  }
}

export const CHAT_BUBBLE_CLASS =
  // w-max: bong bóng giãn theo nội dung (tới 220px) thay vì co về độ rộng một từ trong khung Html.
  'w-max max-w-[220px] text-center whitespace-normal break-words rounded-2xl rounded-bl-sm border border-white/70 bg-white/95 px-3 py-1.5 text-[11px] font-semibold leading-snug text-slate-900 shadow-lg';
