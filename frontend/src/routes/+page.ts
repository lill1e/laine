import { getSessions } from '$lib/api/session';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const sessions = await getSessions();
	sessions.sort((a, b) => a.date.localeCompare(b.date));
	sessions.reverse();
	return {
		sessions
	};
};
