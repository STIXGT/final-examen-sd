import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/server";

export default async function ChatPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col justify-between h-full w-full">
      <div className="flex flex-col ">
        <h1 className="text-2xl font-bold">
          Hello, {data?.user?.user_metadata.full_name}!
        </h1>
        <p>
          How can we help you today? If you have any questions, feel free to ask
        </p>
      </div>
      <div>
        <Input
          placeholder="Type your message here"
          className="bg-gray-500 bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 h-14 rounded-full"
        />
      </div>
    </div>
  );
}
