export async function get<T>(endpoint: string): Promise<T> {
	return await (await fetch(`http://localhost:5174${endpoint}`)).json();
}

export async function post<T>(endpoint: string, data: object): Promise<T> {
	return await (
		await fetch(`http://localhost:5174${endpoint}`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	).json();
}
