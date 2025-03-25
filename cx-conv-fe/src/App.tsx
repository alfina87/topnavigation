import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Sparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import apiService from "@/services/apiService.ts";

function App() {
  const [email, setEmail] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    additionalInfo?: string;
  }>({});

  const validateForm = () => {
    const newErrors: { email?: string; additionalInfo?: string } = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please provide a valid email address";
    }

    if (!additionalInfo) {
      newErrors.additionalInfo = "Additional information is required";
    } else if (additionalInfo.length < 10) {
      newErrors.additionalInfo =
        "Additional information must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);

    try {
      await apiService.submitForm(email, additionalInfo);
      setShowSuccess(true);
      setErrors({});
    } catch (error) {
      console.error("Submission failed:", error);
      setErrors({ email: "Submission failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAnotherEmail = (e: FormEvent) => {
    e.preventDefault();
    setShowSuccess(false);
    setAdditionalInfo("");
    setErrors({});
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex items-center justify-center p-4">
        <Card className="max-w-lg w-full p-8 text-center">
          <Sparkles className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h2 className="text-2xl font-bold mb-4">Thank you for signing up!</h2>
          <p className="text-muted-foreground mb-6">
            We're analyzing your website and will send you detailed UX &
            conversion insights shortly in your mail.
          </p>
          <Button onClick={handleAnotherEmail}>Submit Another Website</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            AI-Powered UX & Conversion Insights
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get actionable insights to improve your website's user experience
            and boost conversions using advanced AI analysis.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="pb-2">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="additionalInfo" className="pb-2">
                  Additional Information
                </Label>
                <Textarea
                  id="additionalInfo"
                  placeholder="Tell us more about your website and specific areas you'd like us to analyze..."
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  className={`min-h-[120px] resize-y ${
                    errors.additionalInfo ? "border-destructive" : ""
                  }`}
                />
                {errors.additionalInfo && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.additionalInfo}
                  </p>
                )}
              </div>
            </div>

            <Separator />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                "Analyzing..."
              ) : (
                <>
                  Get Free UX Analysis
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default App;
