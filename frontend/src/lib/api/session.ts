// A Session is multiple games played on the same Date

import { getGames, type Game } from './game';
import { Player } from './player';

interface Stats {
	totals: Record<string, number>;
	winner: Player;
}

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

	async stats(): Promise<Stats> {
		const totals: Record<string, number> = {};

		for (const game of this.games) {
			for (const entry of game.entries) {
				totals[entry.player.id] = entry.frames.at(-1)?.total ?? 0;
			}
		}

		let winnerId;
		for (const id in totals) {
			if (!winnerId || totals[id] > totals[winnerId]) {
				winnerId = id;
			}
		}

		const winner = Player.getCached(winnerId!)!;
		return {
			totals,
			winner
		};
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

	return await Promise.all(
		Object.keys(grouped).map(async (date) => new Session(date, grouped[date]))
	);
}
