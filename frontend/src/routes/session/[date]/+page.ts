import { Session } from '$lib/api/session';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	return {
		session: (await Session.getForDate(params.date))!
	};
};
