import { ChatRequest, ChatResponse } from "@/interfaces/chats";
import { buildMedicalPrompt } from "@/prompts/assistant-context";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  try {
    const data: ChatRequest = await req.json();

    if (!data.message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1024,
      },
    });

    // Prompt building
    const prompt = buildMedicalPrompt(data);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = await response.text();

    // Prepare response
    const formattedResponse: ChatResponse = {
      response: output,
      disclaimer:
        "This information is based on general medical guidelines. Consult your doctor for personalized recommendations.",
      references: [
        "Information based on general medical guidelines",
        "Consult your doctor for personalized recommendations",
      ],
    };

    return NextResponse.json(formattedResponse);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error processing your request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
