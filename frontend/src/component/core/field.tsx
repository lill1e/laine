import type { ParentProps } from "solid-js";
import styles from "./field.module.css";

export function Field(props: ParentProps) {
  return <div class={styles.field}>{props.children}</div>;
}

interface LabelProps extends ParentProps {
  disabled?: boolean;
}

export function Label(props: LabelProps) {
  return (
    <label class={[styles.label, props.disabled && styles.disabled].filter(Boolean).join(" ")}>
      {props.children}
    </label>
  );
}
