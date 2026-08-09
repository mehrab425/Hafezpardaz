"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Send, Loader2, MessageCircle } from "lucide-react";

interface ChatMessage {
  id: number;
  content: string;
  role: string;
  createdAt: string;
}

interface Chat {
  id: number;
  sessionId: string;
  visitorName: string | null;
  visitorEmail: string | null;
  status: string;
  messages: ChatMessage[];
  updatedAt: string;
}

export function AdminChatPanel({
  chats,
  activeSessionId,
}: {
  chats: Chat[];
  activeSessionId?: string;
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(activeSessionId ?? chats[0]?.sessionId ?? null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchMessages = useCallback(async () => {
    if (!selected) return;
    const res = await fetch(`/api/chat/${selected}/messages`);
    if (res.ok) {
      const data = await res.json();
      setMessages(data.data ?? []);
    }
  }, [selected]);

  useEffect(() => {
    if (!selected) return;
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [selected, fetchMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendReply() {
    if (!input.trim() || !selected) return;
    setSending(true);
    await fetch(`/api/chat/${selected}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: input, role: "ADMIN", sessionId: selected }),
    });
    setInput("");
    setSending(false);
    fetchMessages();
    router.refresh();
  }

  const selectedChat = chats.find((c) => c.sessionId === selected);

  return (
    <div className="flex h-full">
      <div className="w-72 border-l border-white/5 bg-[#151515] overflow-y-auto">
        {chats.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">هیچ چتی وجود ندارد</p>
        ) : (
          chats.map((chat) => (
            <button
              key={chat.sessionId}
              onClick={() => setSelected(chat.sessionId)}
              className={`w-full text-right p-4 border-b border-white/5 hover:bg-white/5 transition-colors ${selected === chat.sessionId ? "bg-[#C6FF34]/5 border-r-2 border-r-[#C6FF34]" : ""}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {chat.visitorName ?? "ناشناس"}
                  </p>
                  <p className="text-gray-500 text-xs truncate">
                    {chat.messages[0]?.content ?? "بدون پیام"}
                  </p>
                </div>
                <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${chat.status === "OPEN" ? "bg-green-400" : "bg-gray-500"}`} />
              </div>
            </button>
          ))
        )}
      </div>

      <div className="flex-1 flex flex-col">
        {!selected ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500">یک چت را انتخاب کنید</p>
            </div>
          </div>
        ) : (
          <>
            <div className="border-b border-white/5 p-4">
              <p className="text-white font-medium">{selectedChat?.visitorName ?? "ناشناس"}</p>
              {selectedChat?.visitorEmail && (
                <p className="text-gray-400 text-xs">{selectedChat.visitorEmail}</p>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "ADMIN" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === "ADMIN"
                        ? "bg-[#C6FF34]/10 text-[#C6FF34] rounded-tl-none"
                        : "bg-white/10 text-white rounded-tr-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-white/5 p-4">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendReply()}
                  placeholder="پیام پاسخ..."
                  className="flex-1 bg-[#242424] border border-white/10 rounded-xl py-2.5 px-4 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#C6FF34]/50 transition-colors"
                />
                <button
                  onClick={sendReply}
                  disabled={!input.trim() || sending}
                  className="bg-[#C6FF34] text-black p-2.5 rounded-xl hover:bg-[#b8f025] transition-colors disabled:opacity-50"
                >
                  {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
