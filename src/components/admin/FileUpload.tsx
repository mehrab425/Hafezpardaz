"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import Image from "next/image";

interface Props {
  value: string;
  onChange: (url: string) => void;
  onClear: () => void;
  label?: string;
}

export function FileUpload({ value, onChange, onClear, label = "تصویر" }: Props) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    // Show local preview immediately
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setError("");
    setUploading(true);

    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: form }).catch(() => null);

    setUploading(false);

    if (!res?.ok) {
      const data = await res?.json().catch(() => ({}));
      setError(data?.message ?? "خطا در آپلود");
      setPreview(null);
      return;
    }

    const data = await res.json();
    if (data.success) {
      URL.revokeObjectURL(objectUrl);
      setPreview(null);
      onChange(data.url as string);
    } else {
      setError(data.message ?? "خطا در آپلود");
      setPreview(null);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  const displaySrc = preview ?? value;

  return (
    <div className="space-y-3">
      {displaySrc ? (
        <div className="relative w-full max-w-xs">
          <div className="relative h-48 rounded-xl overflow-hidden border border-white/10 bg-[#1a1a1a]">
            <Image
              src={displaySrc}
              alt={label}
              fill
              className="object-cover"
              unoptimized
            />
            {uploading && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-[#C6FF34] animate-spin" />
                <span className="text-white text-sm mr-2">در حال آپلود...</span>
              </div>
            )}
          </div>
          {!uploading && (
            <button
              type="button"
              onClick={() => { onClear(); setPreview(null); }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-400 transition-colors"
            >
              <X className="w-3.5 h-3.5 text-white" />
            </button>
          )}
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-3 h-40 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-[#C6FF34]/40 hover:bg-[#C6FF34]/5 transition-all"
        >
          {uploading ? (
            <>
              <Loader2 className="w-8 h-8 text-[#C6FF34] animate-spin" />
              <span className="text-gray-400 text-sm">در حال آپلود...</span>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-gray-500" />
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  <span className="text-[#C6FF34]">انتخاب فایل</span> یا اینجا رها کنید
                </p>
                <p className="text-gray-600 text-xs mt-1">JPG, PNG, WebP, GIF — حداکثر ۵ مگابایت</p>
              </div>
            </>
          )}
        </div>
      )}

      {error && (
        <p className="text-red-400 text-xs flex items-center gap-1">
          <X className="w-3 h-3" /> {error}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        className="hidden"
        onChange={handleChange}
      />

      {displaySrc && !uploading && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors"
        >
          <Upload className="w-3 h-3" /> تغییر تصویر
        </button>
      )}
    </div>
  );
}
