import { createAsync } from "@solidjs/router";
import { For } from "solid-js";
import { getGames } from "@/api/game";
import { GameCard } from "@/component/game/card";

export function GamesPage() {
  const games = createAsync(async () => await getGames());
  return <For each={games.latest}>{(game) => <GameCard game={game} />}</For>;
}
