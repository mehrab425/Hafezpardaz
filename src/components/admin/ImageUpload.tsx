"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onClear?: () => void;
  folder?: string;
}

export function ImageUpload({ value, onChange, onClear, folder = "hafezpardaz" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setUploading(false);

    if (data.url) onChange(data.url);
  }

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative w-full h-48 rounded-xl overflow-hidden border border-white/10 group">
          <Image src={value} alt="uploaded" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              onClick={() => { onClear?.(); onChange(""); }}
              className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full h-32 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-[#C6FF34]/40 hover:text-[#C6FF34] transition-all disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                <ImageIcon className="w-5 h-5" />
              </div>
              <span className="text-sm">کلیک کنید یا فایل را بکشید</span>
            </>
          )}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
      />
    </div>
  );
}
