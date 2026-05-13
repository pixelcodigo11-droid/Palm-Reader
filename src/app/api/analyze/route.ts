import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Return dummy data
    return NextResponse.json({
      scores: {
        life: 85,
        heart: 72,
        career: 90,
      },
      details: {
        life: "Your life line indicates strong vitality and a long, energetic journey. You have a resilient constitution.",
        heart: "Your heart line suggests you are passionate but sometimes guarded. A significant emotional event is in your near future.",
        career: "Your career line is exceptionally clear, indicating focused ambition and impending financial success.",
      },
      summary: "Your palm reveals a balanced individual poised for significant professional growth, provided you maintain your physical and emotional well-being.",
    });
  } catch {
    return NextResponse.json({ error: "Failed to analyze image" }, { status: 500 });
  }
}
