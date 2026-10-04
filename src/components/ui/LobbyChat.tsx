'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useMuseum, type ChatMessage } from '@/context/MuseumContext';

const MAX_LENGTH = 140;
const MAX_LOG = 40;
const SEND_COOLDOWN_MS = 700; // khớp giới hạn chống spam phía server
const LOG_IDLE_FADE_MS = 8000;

type LogEntry = ChatMessage & { key: string; isMine: boolean };

/**
 * Khung chat của sảnh 3D. Tin nhắn hiện ở đây và đồng thời thành bong bóng
 * trên đầu người gửi (xem chatBubble.ts). Enter để gõ, Esc để thoát.
 */
export const LobbyChat: React.FC = () => {
  const { socket, nickname, currentRoom, showChatBubble, language, selectedExhibit, miniGameOpen, roomFourInteractionOpen } = useMuseum();
  // Không chiếm phím Enter khi đang mở hiện vật / minigame / trạm Phòng 04.
  const overlayOpen = !!selectedExhibit || miniGameOpen || roomFourInteractionOpen;
  const overlayOpenRef = useRef(overlayOpen);
  useEffect(() => {
    overlayOpenRef.current = overlayOpen;
  }, [overlayOpen]);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [draft, setDraft] = useState('');
  const [focused, setFocused] = useState(false);
  const [lastActivity, setLastActivity] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const lastSentAt = useRef(0);
  const keySeq = useRef(0);
  const vi = language === 'vi';

  // Nhận tin nhắn của người khác trong cùng phòng.
  useEffect(() => {
    if (!socket) return;
    const onMessage = (msg: ChatMessage) => {
      if (msg.galleryId && msg.galleryId !== currentRoom) return;
      keySeq.current += 1;
      setLog((prev) => [...prev, { ...msg, key: `m${keySeq.current}`, isMine: false }].slice(-MAX_LOG));
      setLastActivity(Date.now());
    };
    socket.on('receive-message', onMessage);
    return () => {
      socket.off('receive-message', onMessage);
    };
  }, [socket, currentRoom]);

  // Enter mở ô chat (khi không đang gõ ở ô khác); Esc thoát.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' || e.isComposing || overlayOpenRef.current) return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;
      e.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Đồng hồ thô để làm mờ khung chat khi lâu không có hoạt động.
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [log, focused]);

  const send = () => {
    const text = draft.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, MAX_LENGTH);
    if (!text || !socket) return;
    const sentAt = Date.now();
    if (sentAt - lastSentAt.current < SEND_COOLDOWN_MS) return;
    lastSentAt.current = sentAt;

    socket.emit('send-message', { text });

    // Server không gửi lại cho chính người gửi, nên tự hiện bong bóng + log của mình.
    if (socket.id) showChatBubble(socket.id, text);
    keySeq.current += 1;
    setLog((prev) => [
      ...prev,
      {
        key: `m${keySeq.current}`,
        isMine: true,
        userId: socket.id ?? 'me',
        nickname,
        text,
        galleryId: currentRoom,
        sentAt,
        timestamp: new Date(sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ].slice(-MAX_LOG));
    setDraft('');
    setLastActivity(sentAt);
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Phím mũi tên được đi tiếp để điều khiển nhân vật trong khi gõ; các phím khác chỉ dành cho ô chat.
    if (!e.key.startsWith('Arrow')) e.stopPropagation();
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      if (draft.trim()) send();
      else inputRef.current?.blur();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      inputRef.current?.blur();
    }
  };

  const idle = !focused && now - lastActivity > LOG_IDLE_FADE_MS;
  const visibleLog = focused ? log : log.slice(-6);

  return (
    <div className="pointer-events-none absolute bottom-16 left-4 z-40 flex w-[min(340px,calc(100vw-32px))] flex-col gap-2 sm:bottom-4">
      {visibleLog.length > 0 && (
        <div
          ref={listRef}
          className={`flex flex-col gap-1 overflow-y-auto rounded-xl p-2 transition-opacity duration-500 ${
            focused ? 'pointer-events-auto max-h-64 bg-slate-950/80 backdrop-blur-md' : 'max-h-40'
          } ${idle ? 'opacity-0' : 'opacity-100'}`}
          aria-live="polite"
        >
          {visibleLog.map((msg) => (
            <p key={msg.key} className="text-[12px] leading-snug text-white [text-shadow:0_1px_2px_rgba(0,0,0,.9)]">
              <span className={`font-bold ${msg.isMine ? 'text-amber-300' : 'text-cyan-300'}`}>{msg.nickname}:</span>{' '}
              <span className="break-words">{msg.text}</span>
            </p>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/80 py-1 pl-4 pr-1 shadow-xl backdrop-blur-md focus-within:border-cyan-400/60"
      >
        <label htmlFor="lobby-chat-input" className="sr-only">
          {vi ? 'Tin nhắn trò chuyện' : 'Chat message'}
        </label>
        <input
          id="lobby-chat-input"
          ref={inputRef}
          value={draft}
          maxLength={MAX_LENGTH}
          autoComplete="off"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onInputKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={focused ? (vi ? 'Nhập tin nhắn… (phím mũi tên để đi, Esc để thoát)' : 'Type a message… (arrow keys to walk, Esc to exit)') : (vi ? 'Nhấn Enter để trò chuyện' : 'Press Enter to chat')}
          className="min-w-0 flex-1 bg-transparent text-[13px] text-white placeholder:text-slate-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!draft.trim()}
          className="shrink-0 rounded-full bg-cyan-500 px-3 py-1.5 text-[11px] font-bold text-slate-950 transition-colors hover:bg-cyan-400 disabled:bg-slate-700 disabled:text-slate-400"
        >
          {vi ? 'Gửi' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default LobbyChat;
