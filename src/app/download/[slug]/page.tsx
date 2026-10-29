import { notFound } from "next/navigation";
import { getGameBySlug, games } from "@/data/games";
import DownloadClient from "./DownloadClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return games
    .filter((g) => g.deliveryMode === "download")
    .map((game) => ({ slug: game.slug }));
}

export default async function DownloadPage({ params }: PageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game || game.deliveryMode !== "download") {
    notFound();
  }

  return <DownloadClient game={game} />;
}
