"use client";

import { Loader2, Trash2, X } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ open, title, message, loading, onConfirm, onCancel }: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onCancel} />
      <div className="relative bg-[#1e1e1e] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <button onClick={onCancel} className="absolute top-4 left-4 text-gray-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
            <Trash2 className="w-5 h-5 text-red-400" />
          </div>
          <h3 className="text-white font-bold">{title}</h3>
        </div>
        <p className="text-gray-400 text-sm mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-lg border border-white/10 text-gray-300 hover:text-white hover:border-white/30 transition-colors text-sm"
          >
            انصراف
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors text-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-3 h-3 animate-spin" />}
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}
