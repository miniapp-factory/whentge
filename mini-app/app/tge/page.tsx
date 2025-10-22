import { Metadata } from "next";
import { TGEForm } from "@/components/tge-form";
import { title, description } from "@/lib/metadata";

export const metadata: Metadata = {
  title: `${title} - TGE Planner`,
  description: `${description} Plan your TGE date with confidence.`,
};

export default function TGEPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">TGE Planner</h1>
      <TGEForm />
    </main>
  );
}
