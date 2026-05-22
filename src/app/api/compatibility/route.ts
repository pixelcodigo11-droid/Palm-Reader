import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { sign1, sign2 } = await req.json();

    if (!sign1 || !sign2) {
      return NextResponse.json({ error: "Both zodiac signs are required" }, { status: 400 });
    }

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Return dummy data
    return NextResponse.json({
      score: 87,
      summary: `The match between ${sign1} and ${sign2} is intensely dynamic. You balance each other's elemental energies beautifully, resulting in a strong emotional and intellectual connection.`,
      strengths: ["Communication", "Trust", "Shared values"],
      weaknesses: ["Stubbornness", "Occasional impulsivity"],
      recommendation: "Focus on open dialogue when tensions rise. Your natural synergy will easily overcome minor disagreements.",
    });
  } catch {
    return NextResponse.json({ error: "Failed to calculate compatibility" }, { status: 500 });
  }
}
