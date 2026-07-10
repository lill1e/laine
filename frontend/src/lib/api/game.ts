import { frameTotal } from '$lib/util/frames';
import { get } from './core';
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
	const response: APIGame[] = await get(`/games/all`);
	return Object.values(response).map((x) => new Game(x));
}

export class Game {
	readonly date: string;
	readonly entries: Entry[];
	constructor(data: APIGame) {
		this.date = data.date;
		this.entries = data.entries.map((entry) => new Entry(entry));
	}
}

export class Entry {
	readonly player: Player;
	readonly alias: string;
	readonly frames: Frame[];
	constructor(data: APIEntry) {
		this.player = Player.getOrCreate(data.player, data.username);
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
