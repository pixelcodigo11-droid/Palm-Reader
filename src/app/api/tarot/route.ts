import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Return dummy data
    return NextResponse.json({
      cards: [
        { name: "The Fool", position: "Past", meaning: "A new beginning, spontaneous action, and stepping into the unknown." },
        { name: "The Magician", position: "Present", meaning: "Manifestation, resourcefulness, and utilizing your current skills to achieve goals." },
        { name: "The Star", position: "Future", meaning: "Hope, renewed faith, and a period of spiritual healing and tranquility." }
      ],
      aiInterpretation: `Regarding "${question || 'your life path'}", the cards suggest a powerful transition. You've recently taken a leap of faith (The Fool). Currently, you have all the tools necessary to manifest your desires (The Magician). If you stay focused, your future holds immense hope and healing (The Star). Trust the process.`,
    });
  } catch {
    return NextResponse.json({ error: "Failed to read tarot cards" }, { status: 500 });
  }
}
