import type { EditableGame } from '$lib/util/edit';
import { frameTotal } from '$lib/util/frames';
import { get, post } from './core';
import { type APIFrame, Frame } from './frame';
import { Player } from './player';

interface APIGame {
	date: string;
	entries: APIEntry[];
}

interface APIEntry {
	entry_id: number;
	player: string;
	username: string;
	alias: string;
	frames: APIFrame[];
}

export async function getGames(): Promise<Game[]> {
	const games: Record<string, APIGame> = await get(`/games/all`);
	return await Promise.all(
		Object.values(games).map(async (api) => {
			const entries = await Promise.all(
				api.entries.map(async (entry) => new Entry(entry, await Player.getOrFetch(entry.player)))
			);
			return new Game(api, entries);
		})
	);
}

export class Game {
	static readonly #CACHE: Map<string, Game> = new Map();
	readonly date: string;
	readonly entries: Entry[];
	readonly id: string;
	nth: number = 0;

	constructor(api: APIGame, entries: Entry[]) {
		this.date = api.date;
		this.entries = entries;
		this.id = 'TEMP';
		Game.#CACHE.set('TEMP', this);
	}

	static async getById(id: string): Promise<Game | undefined> {
		const cached = Game.getCached(id);
		if (cached) return cached;

		await getGames();
		return Game.getCached(id);
	}

	static getCached(id: string): Game | undefined {
		return Game.#CACHE.get(id);
	}
}

export class Entry {
	readonly player: Player;
	readonly alias: string;
	readonly frames: Frame[];
	constructor(data: APIEntry, player: Player) {
		this.player = player;
		this.alias = data.alias;

		this.frames = data.frames.reduce((arr, api, index) => {
			const prev = arr[arr.length - 1];
			const next = index !== data.frames.length - 1 ? data.frames[index + 1] : null;
			const nextNext = index !== data.frames.length - 2 ? data.frames[index + 2] : null;
			const total = frameTotal(
				{
					rollOne: api.roll_one,
					rollTwo: api.roll_two,
					extraRoll: api.extra_roll,
					split: api.split
				},
				prev?.total ?? 0,
				next && {
					rollOne: next.roll_one,
					rollTwo: next.roll_two,
					extraRoll: next.extra_roll,
					split: next.split
				},
				nextNext && {
					rollOne: nextNext.roll_one,
					rollTwo: nextNext.roll_two,
					extraRoll: nextNext.extra_roll,
					split: nextNext.split
				}
			);

			arr.push(new Frame(api, total));
			return arr;
		}, [] as Frame[]);
	}
}

export async function createNewGame(game: EditableGame): Promise<number> {
	interface CreateResult {
		id: number;
	}

	const createResult: CreateResult = await post(`/games`, {
		date: game.date
	});
	const { id } = createResult;

	for (const entry of game.entries) {
		await post(`/games/${id}/entry`, {
			player: entry.player!.id,
			alias: entry.alias,
			frames: entry.frames.map((x) => ({
				roll_one: x.rollOne,
				roll_two: x.rollTwo,
				split: x.split,
				extra_roll: x.extraRoll
			}))
		});
	}

	return id;
}
