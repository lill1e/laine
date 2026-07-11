// A Session is multiple games played on the same Date

import { getGames, type Game } from './game';

// would be nice if the API supported this natively
export class Session {
	static readonly #CACHE: Map<string, Session> = new Map();
	readonly date: string;
	readonly games: Game[];

	constructor(date: string, games: Game[]) {
		this.date = date;
		this.games = games;
		Session.#CACHE.set(date, this);
	}

	static async getForDate(date: string): Promise<Session | undefined> {
		if (Session.#CACHE.has(date)) {
			return Session.#CACHE.get(date);
		}

		await getSessions();
		return Session.#CACHE.get(date);
	}

	getTotals(): Record<string, number> {
		const out: Record<string, number> = {};

		for (const game of this.games) {
			for (const entry of game.entries) {
				out[entry.player.id] = entry.frames.at(-1)?.total ?? 0;
			}
		}

		return out;
	}
}

export async function getSessions(): Promise<Session[]> {
	const games = await getGames();
	const grouped = games.reduce(
		(map, game) => {
			if (game.date in map) {
				game.nth = map[game.date].length + 1;
				map[game.date].push(game);
			} else {
				game.nth = 1;
				map[game.date] = [game];
			}
			return map;
		},
		{} as Record<string, Game[]>
	);

	return Object.keys(grouped).map((date) => new Session(date, grouped[date]));
}
