import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { sign } = await req.json();

    if (!sign) {
      return NextResponse.json({ error: "Zodiac sign is required" }, { status: 400 });
    }

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Return dummy data
    return NextResponse.json({
      sign: sign,
      date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      dailyMessage: `The planetary alignments today suggest a wave of creative energy for ${sign}. Trust your intuition when making decisions, as your ruling planets are highly favorable. A surprise encounter could lead to an interesting opportunity.`,
      luckyColor: "Deep Purple",
      luckyNumber: 7,
      mood: "Inspired",
      compatibility: "Libra",
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch horoscope" }, { status: 500 });
  }
}
