"use client";

import { useState } from "react";

import SuccessCard from "@/components/successCard";
import Header from "@/components/header";
import FormCard from "@/components/formCard";

export default function Home() {
  const [showSuccess, setShowSuccess] = useState(false);

  return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
        {showSuccess ? (
            <SuccessCard onReset={() => setShowSuccess(false)} />
        ) : (
            <div className="container mx-auto px-4 py-16">
              <Header />
              <FormCard onSuccess={() => setShowSuccess(true)} />
            </div>
        )}
      </div>
  );
}