// route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  const { answers } = await req.json();
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `These are the correct answers to personal questions: less than a year (something similar), spanish class, fall guy, the park, fiona/french/france, pineapple, minecraft. Do these answers match closely? ${JSON.stringify(
    answers
  )}`;
  const result = await model.generateContent(prompt);
  const text = await result.response.text();

  const verified = text.toLowerCase().includes("yes");
  return NextResponse.json({ verified });
}
