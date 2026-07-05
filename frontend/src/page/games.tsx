import { For } from "solid-js";
import { Game } from "@/api/game";
import { GameCard } from "@/component/game/card";
import data from "@/games.json";

export function GamesPage() {
  const games = [new Game(data["1"])];
  return <For each={games}>{(game) => <GameCard game={game} />}</For>;
}
