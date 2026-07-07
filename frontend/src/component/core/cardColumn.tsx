import type { ParentProps } from "solid-js";
import styles from "./cardColumn.module.css";

export function CardColumn(props: ParentProps) {
  return <div class={styles.container}>{props.children}</div>;
}
