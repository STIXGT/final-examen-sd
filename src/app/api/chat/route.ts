import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { createClient } from "@/utils/supabase/server";
import { generateContext } from "@/prompts/assistant-context";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const userId = data?.user?.id;

  try {
    const { data: user_info } = await supabase
      .from("user_info")
      .select("*")
      .eq("user_id", userId);

    const { messages } = await req.json();

    const context = generateContext(user_info![0]);

    const result = streamText({
      model: google("gemini-1.5-flash"),
      system: context,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error fetching user information:", error);
    throw new Error("Failed to fetch user information");
  }
}
