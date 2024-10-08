import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS Console ID Smart Care",
  description: "CMS Console ID Smart Care",
  openGraph: {
    title: "CMS Console ID Smart Care",
  },
};

export default function Home() {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      ID Smart Care
    </main>
  );
}
