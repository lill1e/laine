import type { ParentProps } from "solid-js";
import styles from "./select.module.css";

interface Props extends ParentProps {
  onChange?: (
    event: Event & { currentTarget: HTMLSelectElement; target: HTMLSelectElement },
  ) => void;
}

export function Select(props: Props) {
  return (
    <select class={styles.select} onChange={(x) => props.onChange?.(x)}>
      {" "}
      {props.children}
    </select>
  );
}
