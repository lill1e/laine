import { getGames } from '$lib/api/game';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return {
		games: await getGames()
	};
};
