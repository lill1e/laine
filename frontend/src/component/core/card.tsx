import type { ParentProps } from "solid-js";
import styles from "./card.module.css";

export function Card(props: ParentProps) {
  return <section class={styles.card}>{props.children}</section>;
}

export function CardHeader(props: ParentProps) {
  return <header class={styles.header}>{props.children}</header>;
}

interface CardBodyProps extends ParentProps {
  flex?: boolean;
}

export function CardBody(props: CardBodyProps) {
  return (
    <div class={[styles.body, props.flex && styles.flex].filter(Boolean).join(" ")}>
      {props.children}
    </div>
  );
}

export function CardActions(props: ParentProps) {
  return <div class={styles.actions}>{props.children}</div>;
}
