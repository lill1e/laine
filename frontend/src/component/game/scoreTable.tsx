import { For, type JSX } from "solid-js";
import type { FrameLike } from "@/api/frame";
import styles from "./scoreTable.module.css";

type Props<P, A, C extends FrameLike & { total: number }> = {
  player(player: P, alias: A, rowIndex: number): JSX.Element;
  frame(cell: C, rowIndex: number, colIndex: number): JSX.Element;
  rows: {
    player: P;
    alias: A;
    frames: C[];
  }[];
};

export function ScoreTable<P, A, C extends FrameLike & { total: number }>(props: Props<P, A, C>) {
  return (
    <table class={styles.table}>
      <thead>
        <tr>
          <th scope="col">Player</th>
          <For each={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}>{(x) => <th scope="col">{x}</th>}</For>
          <th scope="col">Final</th>
        </tr>
      </thead>
      <tbody>
        <For each={props.rows}>
          {({ player, alias, frames }, row) => (
            <tr>
              <th scope="row">{props.player(player, alias, row())}</th>
              <For each={frames}>{(frame, col) => <td>{props.frame(frame, row(), col())}</td>}</For>
              <th>{frames[frames.length - 1].total}</th>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
}
