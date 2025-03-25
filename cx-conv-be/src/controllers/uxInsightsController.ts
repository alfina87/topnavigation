import { Request, Response, NextFunction } from "express";
import { openaiService } from "../services";
import configsEnv from "../configs/configs.env";
import { marked } from "marked";
import { mailService } from "../services";
import uxInsightsSchema from "../validations/uxInsightsValidation";

class UxInsightsController {
  public getUXInsights = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email, additionalInfo } = req.body;

      const { error } = uxInsightsSchema.validate({ email, additionalInfo });
      if (error) {
        res.status(400).json({
          data: null,
          message: error.details[0].message,
        });
        return;
      }

      const response = await openaiService.getUXInsights(additionalInfo);
      const emailSubject = "UX Insights Report";
      const formattedText = marked(response.data);
      const emailContent = this.generateEmailContent(formattedText);

      await mailService.sendEmail(
        configsEnv.ADMIN_EMAIL,
        email,
        emailSubject,
        emailContent,
        configsEnv.ADMIN_EMAIL
      );

      res.status(200).json({
        email,
        message: "UX insights generated and sent to your email.",
      });
    } catch (error) {
      next(error);
    }
  };

  private generateEmailContent(
    formattedText: string | Promise<string>
  ): string {
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
}

export default new UxInsightsController();
