import data from "./data.json";

export function idToName(id: string): string {
  return data.people[id];
}
