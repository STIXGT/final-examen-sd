import Chat from "@/components/chat/chat";
import { createClient } from "@/utils/supabase/server";

export default async function ChatPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col h-full w-full max-w-2xl mx-auto">
      <div className="flex-shrink-0 mb-10">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">
            Hello, {data?.user?.user_metadata.full_name}!
          </h1>
          <p>
            How can we help you today? If you have any questions, feel free to
            ask
          </p>
        </div>
      </div>
      <div className="flex-1 relative">
        <Chat />
      </div>
    </div>
  );
}
