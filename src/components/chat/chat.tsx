"use client";

import type React from "react";

import { useChat } from "@ai-sdk/react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState, useRef } from "react";
import type { User } from "@supabase/supabase-js";
import { formatTextWithBold } from "@/lib/utils";
import { ImagePlus, X, Send } from "lucide-react";

export default function Chat() {
  const supabase = createClient();
  const [data, setData] = useState<{ user: User } | { user: null } | null>(
    null
  );
  const [attachment, setAttachment] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.auth.getUser();
      setData(data);
    }
    fetchData();
  }, [supabase]);

  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleRemoveAttachment = () => {
    setAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e);
    setAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto stretch">
      <div className="flex-1 overflow-y-auto pb-24">
        {messages.map((m) => (
          <div
            key={m.id}
            className="flex items-start rounded-3xl bg-gray-100 p-4 mb-4"
          >
            <div className="flex-shrink-0 w-[28px] h-[28px] relative mr-4">
              <Image
                src={
                  m.role === "user"
                    ? "/avatar.png"
                    : "https://github.com/shadcn.png"
                }
                alt={`${m.role === "user" ? "User" : "AI"} Avatar`}
                className="rounded-full"
                fill
                sizes="28px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center"></div>
              <p
                className="text-gray-700 text-sm whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html: formatTextWithBold(m.content),
                }}
              />
              {m.experimental_attachments?.map((attachment, index) => (
                <Image
                  key={index}
                  src={attachment.url || "/placeholder.svg"}
                  alt={`Attachment ${index + 1}`}
                  width={200}
                  height={200}
                  className="mt-2 rounded-md"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="fixed bottom-0 w-full max-w-2xl">
        {attachment && (
          <div className="mb-2 relative inline-block">
            <Image
              src={URL.createObjectURL(attachment) || "/placeholder.svg"}
              alt="Attachment preview"
              width={100}
              height={100}
              className="rounded-md object-cover"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md"
              onClick={handleRemoveAttachment}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        <div className="relative">
          <Input
            className="bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 h-14 rounded-full mb-8 w-full p-2 pl-12 pr-16 shadow-md"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full bg-slate-300 hover:bg-slate-200"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImagePlus className="h-5 w-5" />
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-slate-300 hover:bg-slate-200"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}
