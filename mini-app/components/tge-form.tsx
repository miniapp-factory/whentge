"use client";

import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type ChecklistItem = {
  id: string;
  label: string;
};

const categories: { title: string; items: ChecklistItem[] }[] = [
  {
    title: "Legal & Regulatory Readiness",
    items: [
      { id: "jurisdiction", label: "Jurisdiction Compliance" },
      { id: "securities", label: "Securities Classification" },
      { id: "aml", label: "AML/KYC Processes" },
      { id: "terms", label: "Terms of Sale & Contracts" },
      { id: "ip", label: "IP & Licenses" },
    ],
  },
  {
    title: "Technical Readiness",
    items: [
      { id: "audit", label: "Smart Contract Audit Completed" },
      { id: "testing", label: "Testing & Stress Testing" },
      { id: "wallet", label: "Wallet & Exchange Readiness" },
      { id: "upgradability", label: "Upgradability & Contingency Plans" },
    ],
  },
  {
    title: "Tokenomics & Distribution",
    items: [
      { id: "supply", label: "Total Supply & Allocation" },
      { id: "vesting", label: "Vesting & Lockups" },
      { id: "usecase", label: "Use Cases & Utility" },
      { id: "liquidity", label: "Liquidity Planning" },
    ],
  },
  {
    title: "Community & Market Readiness",
    items: [
      { id: "community", label: "Community Size & Engagement" },
      { id: "education", label: "Education Materials" },
      { id: "marketing", label: "Marketing Plan Aligned with Date" },
      { id: "expectation", label: "Expectation Management" },
    ],
  },
  {
    title: "Operational & Team Readiness",
    items: [
      { id: "team", label: "Team Availability" },
      { id: "support", label: "Customer Support" },
      { id: "finance", label: "Financial & Treasury Readiness" },
      { id: "exchange", label: "Exchange / DEX Coordination" },
    ],
  },
  {
    title: "Strategic Timing",
    items: [
      { id: "market", label: "Market Conditions" },
      { id: "overpromise", label: "Avoid Overpromising" },
      { id: "contingency", label: "Internal Contingencies" },
    ],
  },
];

export function TGEForm() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<string | null>(null);

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allChecked = categories.flatMap((c) => c.items).every((item) => checked[item.id]);
    if (allChecked) {
      setResult("✅ All checks passed! You’re ready to set a TGE date.");
    } else {
      setResult("⚠️ Some items are still incomplete. Please address them before announcing a TGE date.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6">
      <Accordion type="single" collapsible className="w-full">
        {categories.map((cat, idx) => (
          <AccordionItem key={idx} value={`item-${idx}`}>
            <AccordionTrigger>{cat.title}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {cat.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={item.id}
                      checked={!!checked[item.id]}
                      onCheckedChange={() => toggle(item.id)}
                    />
                    <label htmlFor={item.id} className="cursor-pointer">
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Button type="submit" className="w-full">
        Evaluate Readiness
      </Button>
      {result && (
        <Alert variant={result.startsWith("✅") ? "success" : "destructive"}>
          <AlertTitle>{result.startsWith("✅") ? "Success" : "Warning"}</AlertTitle>
          <AlertDescription>{result}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}
