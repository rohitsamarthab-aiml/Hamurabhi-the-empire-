import { notFound } from "next/navigation";
import { getGameBySlug, games } from "@/data/games";
import GameDetailsClient from "./GameDetailsClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export default async function GameDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  return <GameDetailsClient game={game} />;
}
