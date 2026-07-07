import type { ParentProps } from "solid-js";
import styles from "./button.module.css";

interface Props extends ParentProps {
  class?: string;
  onClick?: () => void;
  kind?: "primary" | "default" | "link";
}

export function Button(props: Props) {
  return (
    <button
      class={[props.class, styles.button, styles[props.kind ?? "default"]]
        .filter(Boolean)
        .join(" ")}
      onClick={() => props.onClick?.()}
    >
      {props.children}
    </button>
  );
}
