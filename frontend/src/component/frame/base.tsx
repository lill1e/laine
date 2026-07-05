import { createMemo, Show, type JSX } from "solid-js";
import type { FrameLike } from "@/api/frame";
import { toHumanReadableFrameLike } from "@/util/frames";
import styles from "./base.module.css";

type Props = {
  class?: string;
  frame: FrameLike;
  total: number;
  doRenderBlanks?: boolean;
  doRenderAsLast?: boolean;
  renderRollOne: (value: string) => JSX.Element;
  renderRollTwo: (value: string) => JSX.Element;
  renderExtraRoll: (value: string) => JSX.Element;
  renderTotal: (value: string) => JSX.Element;
};

function safeValue(value: string | true): string {
  if (value === true) return "";
  return value;
}

export function FrameBase(props: Props) {
  const humanReadable = createMemo(() => toHumanReadableFrameLike(props.frame));

  // If we render with BLANKS (e.g. EditableFrame), we want to render "as if" we have a second roll,
  // even though we don't. This means that the first roll appears at the top-left position, NOT the top-right,
  // as it would for only having roll one.
  // BUT if the first roll is a STRIKE, then we DON'T want to render as if it is roll two.
  // This logic does NOT apply on the final frame, though.
  const renderAsHavingRollTwo = () =>
    props.doRenderBlanks && (props.frame.rollOne !== 10 || props.doRenderAsLast);

  const renderAsHavingExtraRoll = () => {
    const x = props.doRenderBlanks && props.frame.rollTwo === 10;
    return x;
  };

  return (
    <div
      class={[
        styles.container,
        props.class,
        (!!humanReadable().rollTwo || renderAsHavingRollTwo()) && styles.hasRollTwo,
        (!!humanReadable().extraRoll || renderAsHavingExtraRoll()) && styles.hasExtra,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Show when={humanReadable().rollOne || props.doRenderBlanks}>
        {(value) => <div class={styles.one}>{props.renderRollOne(safeValue(value()))}</div>}
      </Show>
      {/* We only want to "always" show roll two IF there is a first roll */}
      <Show
        when={humanReadable().rollTwo || (!!humanReadable().rollOne && renderAsHavingRollTwo())}
      >
        {(value) => <div class={styles.two}>{props.renderRollTwo(safeValue(value()))}</div>}
      </Show>
      <Show when={humanReadable().extraRoll || renderAsHavingExtraRoll()}>
        {(value) => <div class={styles.extra}>{props.renderExtraRoll(safeValue(value()))}</div>}
      </Show>
      <div class={styles.total}>{props.renderTotal(props.total.toString())}</div>
    </div>
  );
}
