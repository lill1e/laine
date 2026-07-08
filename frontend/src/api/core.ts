export async function get<T>(endpoint: string): Promise<T> {
  return await (await fetch(`http://localhost:5174${endpoint}`)).json();
}
