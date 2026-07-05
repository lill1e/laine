import { Trash2 } from "lucide-solid";
import { createEffect, mapArray } from "solid-js";
import { produce, type SetStoreFunction } from "solid-js/store";
import type { FrameLike } from "@/api/frame";
import type { Player } from "@/api/player";
import { Button } from "@/component/core/button";
import { ScoreTable } from "@/component/game/scoreTable";
import { PlayerSelector } from "@/component/playerSelector";
import type { EditableGame } from "@/util/edit";
import { calculateTotals } from "@/util/frames";
import { EditorFrame } from "./frame";
import styles from "./editor.module.css";

export interface EditingFrame extends FrameLike {
  rollOne: number | null;
  rollTwo: number | null;
  extraRoll: number | null;
  total: number;
}

export type EditingEntry = {
  player: {
    user?: string;
    nickname?: string;
  };
  frames: EditingFrame[];
};

export type Props = {
  game: EditableGame;
  setGame: SetStoreFunction<EditableGame>;
};

export function GameEditor(props: Props) {
  const cellRefs: HTMLInputElement[] = [];

  const newPlayer = () => {
    props.setGame("entries", props.game.entries.length, {
      player: null,
      alias: null,
      frames: Array.from({ length: 10 })
        .fill(0)
        .map(() => ({
          rollOne: null,
          rollTwo: null,
          extraRoll: null,
          total: 0,
          split: false,
        })),
    });
  };

  const removePlayer = (index: number) => {
    props.setGame("entries", props.game.entries.toSpliced(index, 1));
  };

  createEffect(
    mapArray(
      () => props.game.entries,
      (entry, index) => {
        createEffect(() => {
          const frames = entry.frames;
          props.setGame(
            "entries",
            index(),
            "frames",
            produce((draftFrames) => {
              const totals = calculateTotals(frames);
              draftFrames.forEach((f, i) => (f.total = totals[i]));
            }),
          );
        });
      },
    ),
  );

  const dateValue = () =>
    props.game.date ? new Date(props.game.date).toISOString().substring(0, 10) : undefined;

  return (
    <div class={styles.container}>
      <h2 class={styles.label}>Date</h2>
      <input
        class={styles.date}
        type="date"
        value={dateValue()}
        onInput={(event: Event & { currentTarget: HTMLInputElement }) =>
          props.setGame("date", event.currentTarget.value)
        }
      />
      <h2 class={styles.label}>Frames</h2>
      <ScoreTable
        player={(player, alias, i) => (
          <div class={styles.playerCell}>
            <div class={styles.actions}>
              <Button kind="default">
                <Trash2 onClick={() => removePlayer(i)} />
              </Button>
            </div>
            <div class={styles.player}>
              <PlayerSelector
                player={player}
                setPlayer={(player: Player) => props.setGame("entries", i, "player", player)}
              />
              <input
                class={styles.nickname}
                type="text"
                value={alias ?? ""}
                onChange={(event: Event & { currentTarget: HTMLInputElement }) =>
                  props.setGame("entries", i, "alias", event.currentTarget.value)
                }
                placeholder="Alias..."
              />
            </div>
          </div>
        )}
        frame={(frame, row, col) => (
          <EditorFrame
            setFrame={(frame: EditingFrame) => props.setGame("entries", row, "frames", col, frame)}
            cellRefs={cellRefs}
            col={col}
            row={row}
            frame={frame}
            isLast={col === 9}
          />
        )}
        rows={props.game.entries}
      />
      <Button
        kind="default"
        class={[styles.newPlayerButton, props.game.entries.length === 0 && styles.noPlayers]
          .filter(Boolean)
          .join(" ")}
        onClick={newPlayer}
      >
        + Add Player
      </Button>
    </div>
  );
}
