import { getSessions } from '$lib/api/session';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return {
		sessions: await getSessions()
	};
};
