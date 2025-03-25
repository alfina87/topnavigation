import { NextRequest, NextResponse } from "next/server";
import OpenAIService from "@/services/openaiService";
import EmailService from "@/services/emailService";
import { z } from "zod";
import { marked } from "marked";
import configsEnv from "@/configs/configs.env";

const requestSchema = z.object({
    email: z.string().email(),
    additionalInfo: z.string().min(10),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, additionalInfo } = requestSchema.parse(body);

        const openaiResponse = await OpenAIService.getUXInsights(additionalInfo);
        if (!openaiResponse.success || !openaiResponse.data) {
            throw new Error(openaiResponse.error || "Failed to generate UX insights");
        }

        const emailSubject = "UX Insights Report";
        const formattedText = await marked(openaiResponse.data);
        const emailContent = generateEmailContent(formattedText);

        await EmailService.sendEmail(
            configsEnv.ADMIN_EMAIL,
            email,
            emailSubject,
            emailContent,
            configsEnv.ADMIN_EMAIL,
        );

        return NextResponse.json({
            email,
            message: "UX insights generated and sent to your email.",
        }, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({
                message: error.errors[0].message,
            }, { status: 400 });
        }
        return NextResponse.json({
            message: error instanceof Error ? error.message : "Internal server error",
        }, { status: 500 });
    }
}

function generateEmailContent(formattedText: string): string {
    return `
    <div style="font-family: Arial, sans-serif; line-height: 1.8; color: #333; max-width: 700px; margin: auto; padding: 20px;">
      <h1 style="color: #2C3E50; text-align: center;">📊 UX Insights Report</h1>
      <p style="font-size: 18px; color: #555;">Here are the UX recommendations based on your request:</p>
      <div style="background-color: #f4f4f4; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        ${formattedText}
      </div>
      <p style="font-size: 18px; margin-top: 30px; text-align: center;">🚀 Thank you for using our service!</p>
    </div>
  `;
}