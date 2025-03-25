import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface FormCardProps {
    onSuccess: () => void;
}

export default function FormCard({ onSuccess }: FormCardProps) {
    const [email, setEmail] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<{
        email?: string;
        additionalInfo?: string;
    }>({});

    const validateForm = () => {
        const newErrors: { email?: string; additionalInfo?: string } = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) newErrors.email = "Email is required";
        else if (!emailRegex.test(email))
            newErrors.email = "Please provide a valid email address";

        if (!additionalInfo) newErrors.additionalInfo = "Additional information is required";
        else if (additionalInfo.length < 10)
            newErrors.additionalInfo = "Additional information must be at least 10 characters long";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const res = await fetch("/api/ux-insights", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, additionalInfo }),
            });

            if (!res.ok) throw new Error("Failed to submit");
            onSuccess();
            setEmail("");
            setAdditionalInfo("");
        } catch (error) {
            setErrors({ email: "Submission failed. Please try again." });
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="max-w-2xl mx-auto p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="email" className="pb-2">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                        <Label htmlFor="additionalInfo" className="pb-2">Additional Information</Label>
                        <Textarea
                            id="additionalInfo"
                            placeholder="Tell us more about your website and specific areas you'd like us to analyze..."
                            value={additionalInfo}
                            onChange={(e) => setAdditionalInfo(e.target.value)}
                            className={`min-h-[120px] resize-y ${errors.additionalInfo ? "border-destructive" : ""}`}
                        />
                        {errors.additionalInfo && (
                            <p className="text-destructive text-sm mt-1">{errors.additionalInfo}</p>
                        )}
                    </div>
                </div>
                <Separator />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Analyzing..." : (
                        <>
                            Get Free UX Analysis <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                    )}
                </Button>
            </form>
        </Card>
    );
}