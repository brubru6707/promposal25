// route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = ` You were told no. In one sentence, say that you won't accept that (also add emojis).`;
  const result = await model.generateContent(prompt);
  const text = await result.response.text();

  return NextResponse.json({ text });
}
