import type { FrameLike } from "@/api/frame";
import { FrameBase } from "./base";
import styles from "./display.module.css";

interface Props {
  frame: FrameLike;
  total: number;
}

export function DisplayFrame(props: Props) {
  return (
    <FrameBase
      frame={props.frame}
      total={props.total}
      renderRollOne={(value) => (
        <span class={[styles.span, props.frame.split && styles.split].filter(Boolean).join(" ")}>
          {value}
        </span>
      )}
      renderRollTwo={(value) => <span class={styles.span}>{value}</span>}
      renderExtraRoll={(value) => <span class={styles.span}>{value}</span>}
      renderTotal={(value) => <span class={styles.total}>{value}</span>}
    />
  );
}
