import { Session } from '$lib/api/session';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const session = (await Session.getForDate(params.date))!;
	const stats = await session.stats();
	return {
		session,
		stats,
		winnerStats: await stats.winner.stats()
	};
};
