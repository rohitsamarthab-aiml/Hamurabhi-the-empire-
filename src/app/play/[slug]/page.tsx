import { notFound } from "next/navigation";
import { getGameBySlug, games } from "@/data/games";
import PlayerClient from "./PlayerClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return games
    .filter((g) => g.deliveryMode === "browser")
    .map((game) => ({ slug: game.slug }));
}

export default async function PlayPage({ params }: PageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game || game.deliveryMode !== "browser") {
    notFound();
  }

  return <PlayerClient game={game} />;
}
