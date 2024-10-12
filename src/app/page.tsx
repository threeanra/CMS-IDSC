import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Console - idSmartCare",
  description: "Console - idSmartCare",
  openGraph: {
    title: "Console - idSmartCare",
  },
};

export default function Home() {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      ID Smart Care
    </main>
  );
}
