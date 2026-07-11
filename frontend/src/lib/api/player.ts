export class Player {
	static readonly #CACHE: Map<string, Player> = new Map();
	readonly id: string;
	readonly username: string;

	constructor(id: string, username: string) {
		this.id = id;
		this.username = username;
		Player.#CACHE.set(id, this);
	}

	static getOrCreate(id: string, username: string): Player {
		if (this.#CACHE.has(id)) return this.#CACHE.get(id)!;
		return new Player(id, username);
	}

	static getAllPlayers(): Player[] {
		const players = [new Player('abc', '123'), new Player('test', 'test')];
		for (const player of players) {
			this.#CACHE.set(player.id, player);
		}
		return players;
	}

	static getCached(id: string): Player | undefined {
		return this.#CACHE.get(id);
	}
}
