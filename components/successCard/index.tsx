import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface SuccessCardProps {
    onReset: () => void;
}

export default function SuccessCard({ onReset }: SuccessCardProps) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex items-center justify-center p-4">
            <Card className="max-w-lg w-full p-8 text-center">
                <Sparkles className="w-16 h-16 mx-auto mb-6 text-primary" />
                <h2 className="text-2xl font-bold mb-4">Thank you for signing up!</h2>
                <p className="text-muted-foreground mb-6">
                    We are analyzing your website and will send you detailed UX & conversion insights shortly in your mail.
                </p>
                <Button onClick={onReset}>Submit Another Website</Button>
            </Card>
        </div>
    );
}