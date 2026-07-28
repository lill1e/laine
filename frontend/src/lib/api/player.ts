import { get } from './core';

interface APIPlayer {
	id: string;
	username: string;
	elevated: boolean;
	avatar: string;
}

export class Player {
	static readonly #CACHE: Map<string, Player> = new Map();
	readonly id: string;
	readonly username: string;
	readonly elevated: boolean;
	readonly avatar: string;

	constructor(api: APIPlayer) {
		this.id = api.id;
		this.username = api.username;
		this.elevated = api.elevated;
		this.avatar = api.avatar;
		Player.#CACHE.set(api.id, this);
	}

	static getOrCreate(api: APIPlayer): Player {
		if (this.#CACHE.has(api.id)) return this.#CACHE.get(api.id)!;
		return new Player(api);
	}

	static async getOrFetch(id: string): Promise<Player> {
		await this.getAllPlayers();
		return Player.#CACHE.get(id)!;
	}

	static async getAllPlayers(): Promise<Player[]> {
		const response: APIPlayer[] = await get(`/users/all`);
		return response.map((x) => Player.getOrCreate(x));
	}

	static getCached(id: string): Player | undefined {
		return this.#CACHE.get(id);
	}
}
