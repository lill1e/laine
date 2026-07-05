import type { FrameLike } from "@/api/frame";
import type { Game } from "@/api/game";
import type { Player } from "@/api/player";

export interface EditableGame {
  date: string | null;
  entries: EditableEntry[];
}

export interface EditableEntry {
  player: Player | null;
  alias: string | null;
  frames: EditableFrame[];
}

export interface EditableFrame extends FrameLike {
  rollOne: number | null;
  rollTwo: number | null;
  extraRoll: number | null;
  total: number;
  split: boolean;
}

export function toEditableGame(game: Game): EditableGame {
  return {
    date: game.date,
    entries: game.entries.map((entry) => ({
      player: entry.player,
      alias: entry.alias,
      frames: entry.frames.map((frame) => ({
        rollOne: frame.rollOne,
        rollTwo: frame.rollTwo,
        extraRoll: frame.extraRoll,
        total: frame.total,
        split: frame.split,
      })),
    })),
  };
}

export function newEditableGame(): EditableGame {
  return {
    date: null,
    entries: [],
  };
}
