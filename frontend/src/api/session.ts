import { dataToGame, type DataGame, type Game } from "./game";

export interface Session {
  date: string;
  games: Game[];
}

export interface DataSession {
  date: string;
  games: {
    [id: string]: DataGame;
  };
}

export function dataToSession(data: DataSession): Session {
  return {
    date: data.date,
    games: Object.values(data.games).map(dataToGame),
  };
}
