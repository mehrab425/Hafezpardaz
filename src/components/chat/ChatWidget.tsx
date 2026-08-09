"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, X, Send, Loader2, ChevronDown } from "lucide-react";

interface ChatMessage {
  id: number;
  content: string;
  role: string;
  createdAt: string;
}

const SESSION_KEY = "hps_chat_session";
const POLL_MS = 3000;

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  const existing = localStorage.getItem(SESSION_KEY);
  if (existing) return existing;
  const id = crypto.randomUUID();
  localStorage.setItem(SESSION_KEY, id);
  return id;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [sessionId] = useState(getOrCreateSessionId);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [unread, setUnread] = useState(0);
  const pollRef = useRef<NodeJS.Timeout | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const prevCountRef = useRef(0);

  const fetchMessages = useCallback(async () => {
    if (!sessionId) return;
    const res = await fetch(`/api/chat/${sessionId}/messages`).catch(() => null);
    if (!res?.ok) return;
    const { data } = await res.json();
    if (Array.isArray(data)) {
      setMessages(data);
      if (!open && data.length > prevCountRef.current) {
        setUnread((u) => u + (data.length - prevCountRef.current));
      }
      prevCountRef.current = data.length;
    }
  }, [sessionId, open]);

  useEffect(() => {
    if (!open) {
      if (pollRef.current) clearInterval(pollRef.current);
      return;
    }
    setUnread(0);
    fetchMessages();
    pollRef.current = setInterval(fetchMessages, POLL_MS);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [open, fetchMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || !sessionId) return;
    setSending(true);

    await fetch(`/api/chat/${sessionId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: input,
        role: "VISITOR",
        sessionId,
        visitorName: visitorName || undefined,
      }),
    }).catch(() => {});

    setInput("");
    setSending(false);
    fetchMessages();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (nameSubmitted) { sendMessage(); } else { handleNameSubmit(); }
    }
  }

  function handleNameSubmit() {
    if (!visitorName.trim()) return;
    setNameSubmitted(true);
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 left-6 z-[100] w-14 h-14 bg-[#C6FF34] text-black rounded-full shadow-lg hover:bg-[#b8f025] transition-all hover:scale-110 flex items-center justify-center"
        aria-label="پشتیبانی آنلاین"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {unread}
          </span>
        )}
      </button>

      {/* Chat modal */}
      {open && (
        <div className="fixed bottom-24 left-6 z-[100] w-80 sm:w-96 bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ maxHeight: "500px" }}
        >
          {/* Header */}
          <div className="bg-[#C6FF34] p-4 flex items-center justify-between">
            <div>
              <p className="text-black font-bold text-sm">پشتیبانی آنلاین</p>
              <p className="text-black/70 text-xs">حافظ پرداز سپهر</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-black/70 hover:text-black">
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Name gate */}
          {!nameSubmitted ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-4">
              <MessageCircle className="w-10 h-10 text-[#C6FF34]" />
              <p className="text-white text-sm text-center">
                خوش آمدید! نام خود را وارد کنید تا شروع کنیم.
              </p>
              <input
                autoFocus
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="نام شما..."
                className="w-full bg-[#242424] border border-white/10 rounded-xl py-2.5 px-4 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#C6FF34]/50 transition-colors"
              />
              <button
                onClick={handleNameSubmit}
                disabled={!visitorName.trim()}
                className="w-full bg-[#C6FF34] text-black font-bold py-2.5 rounded-xl hover:bg-[#b8f025] transition-colors disabled:opacity-50 text-sm"
              >
                شروع گفتگو
              </button>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0" style={{ maxHeight: "300px" }}>
                <div className="flex justify-start">
                  <div className="bg-[#C6FF34]/10 text-[#C6FF34] rounded-2xl rounded-tl-none px-3 py-2 text-xs max-w-[80%]">
                    سلام {visitorName}! چطور می‌توانم کمکتان کنم؟
                  </div>
                </div>
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === "ADMIN" ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`rounded-2xl px-3 py-2 text-xs max-w-[80%] ${
                        msg.role === "ADMIN"
                          ? "bg-[#C6FF34]/10 text-[#C6FF34] rounded-tl-none"
                          : "bg-white/10 text-white rounded-tr-none"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-white/5">
                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="پیام خود را بنویسید..."
                    className="flex-1 bg-[#242424] border border-white/10 rounded-xl py-2 px-3 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-[#C6FF34]/50 transition-colors"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || sending}
                    className="bg-[#C6FF34] text-black p-2 rounded-xl hover:bg-[#b8f025] transition-colors disabled:opacity-50"
                  >
                    {sending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
