import { getGames } from '$lib/api/game';
import { Player } from '$lib/api/player';
import { getSessions } from '$lib/api/session';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	await getSessions();
	const player = await Player.getOrFetch(params.id)!;
	const games = (await getGames()).filter((g) => g.entries.find((e) => e.player === player));

	return {
		player,
		games
	};
};
