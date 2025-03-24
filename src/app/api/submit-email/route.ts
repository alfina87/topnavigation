import { NextRequest, NextResponse } from "next/server";

import OpenAI from "openai";
import sgMail from "@sendgrid/mail";

const openaiApiKey = process.env.OPENAI_API_KEY as string;
const sendgridApiKey = process.env.SENDGRID_API_KEY as string;
const sendgridFromEmail = process.env.SENDGRID_FROM_EMAIL as string;

if (!openaiApiKey || !sendgridApiKey || !sendgridFromEmail) {
  throw new Error("Missing required API keys");
}

const openai = new OpenAI({
  apiKey: openaiApiKey,
});

sgMail.setApiKey(sendgridApiKey);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body.email;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a UX expert providing actionable insights for improving user experience.",
        },
        {
          role: "user",
          content:
            "Generate 5 key UX insights for improving a modern web application. Focus on actionable recommendations.",
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const insights = completion.choices[0].message.content;

    const emailContent = {
      to: email,
      from: sendgridFromEmail,
      subject: "Your Personalized UX Insights",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4F46E5;">Your UX Insights</h1>
          <p>Thank you for requesting UX insights. Here are your personalized recommendations:</p>
          <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            ${insights
              ?.split("\n")
              .map((line) => `<p>${line}</p>`)
              .join("")}
          </div>
          <p>Best regards,<br>UX Insights Team</p>
        </div>
      `,
    };

    await sgMail.send(emailContent);

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to process request" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
