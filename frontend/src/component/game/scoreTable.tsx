import { For, type JSX } from "solid-js";
import styles from "./scoreTable.module.css";

type Props<P, A, C> = {
  player(player: P, alias: A, rowIndex: number): JSX.Element;
  frame(cell: C, rowIndex: number, colIndex: number): JSX.Element;
  rows: {
    player: P;
    alias: A;
    frames: C[];
  }[];
};

export function ScoreTable<P, A, C>(props: Props<P, A, C>) {
  return (
    <table class={styles.table}>
      <tbody>
        <For each={props.rows}>
          {({ player, alias, frames }, row) => (
            <tr>
              <th scope="row">{props.player(player, alias, row())}</th>
              <For each={frames}>{(frame, col) => <td>{props.frame(frame, row(), col())}</td>}</For>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
}
