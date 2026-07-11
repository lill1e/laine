export function formatDateString(date: string): string {
	const dtf = new Intl.DateTimeFormat('en-US', {
		dateStyle: 'full',
		timeZone: 'UTC'
	});
	return dtf.format(Date.parse(date));
}
