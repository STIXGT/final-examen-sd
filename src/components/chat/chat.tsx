"use client";

import { useChat } from "@ai-sdk/react";
import { Input } from "../ui/input";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { formatTextWithBold } from "@/lib/utils";

export default function Chat() {
  const supabase = createClient();
  const [data, setData] = useState<{ user: User } | { user: null } | null>(
    null
  );

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase.auth.getUser();
      setData(data);
    }
    fetchData();
  }, [supabase]);

  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto stretch">
      <div className="flex-1 overflow-y-auto pb-24 ">
        {messages.map((m) => (
          <div
            key={m.id}
            className="flex items-start rounded-3xl bg-gray-100 p-4 mb-4"
          >
            <div className="flex-shrink-0 w-[28px] h-[28px] relative mr-4">
              <Image
                src={
                  m.role === "user"
                    ? "https://github.com/luisroft.png"
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
              <div className="flex items-center">
                <h4 className="font-bold text-sm">
                  {m.role === "user"
                    ? `${data?.user?.user_metadata.full_name}`
                    : "AI: "}
                </h4>
              </div>
              <p
                className="text-gray-700 text-sm whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html: formatTextWithBold(m.content),
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          className="bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 h-14 rounded-full mb-8 fixed bottom-0 w-full max-w-2xl p-2 px-6 shadow-md"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
