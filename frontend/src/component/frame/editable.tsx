import type { FrameLike } from "@/api/frame.ts";
import { Checkbox } from "@/component/core/checkbox.tsx";
import { FrameBase } from "./base.tsx";
import styles from "./editable.module.css";

type InputRef = HTMLInputElement | ((el: HTMLInputElement) => void);
type KeyEvent = KeyboardEvent & { currentTarget: HTMLInputElement; target: Element };

type InputProps = {
  value?: string;
  ref?: InputRef;
  hide?: boolean;
  onKeyDown?: (event: KeyEvent) => void;
};

function Input(props: InputProps) {
  return (
    <input
      ref={props.ref}
      type="text"
      class={[styles.input, props.hide && styles.hide].join(" ")}
      value={props.value ?? ""}
      onFocus={(event: Event & { currentTarget: HTMLInputElement }) => event.currentTarget.select()}
      onKeyDown={(event) => props.onKeyDown?.(event)}
    />
  );
}

type TotalProps = {
  total?: string;
  split?: boolean;
  onSetSplit?: (value: boolean) => void;
};

function Total(props: TotalProps) {
  return (
    <div class={styles.totalContainer}>
      <div class={styles.checkboxContainer}>
        <label>split?</label>
        <Checkbox
          tabindex={-1}
          class={styles.checkbox}
          checked={props.split}
          setChecked={props.onSetSplit}
        />
      </div>
      <strong>{props.total ?? "0"}</strong>
    </div>
  );
}

type Props = {
  frame: FrameLike;
  total: number;
  rollOneRef?: InputRef;
  rollTwoRef?: InputRef;
  extraRollRef?: InputRef;
  onOneKey?: (event: KeyEvent) => void;
  onTwoKey?: (event: KeyEvent) => void;
  onExtraKey?: (event: KeyEvent) => void;
  onSetSplit?: (value: boolean) => void;
  doRenderAsLast?: boolean;
};

export default function EditableFrame(props: Props) {
  return (
    <FrameBase
      doRenderBlanks
      doRenderAsLast={props.doRenderAsLast}
      frame={props.frame}
      total={props.total}
      renderRollOne={(value) => {
        return <Input ref={props.rollOneRef} onKeyDown={props.onOneKey} value={value} />;
      }}
      renderRollTwo={(value) => (
        <Input ref={props.rollTwoRef} onKeyDown={props.onTwoKey} value={value} />
      )}
      renderExtraRoll={(value) => (
        <Input ref={props.extraRollRef} onKeyDown={props.onExtraKey} value={value} />
      )}
      renderTotal={(value) => (
        <Total total={value} split={props.frame.split} onSetSplit={props.onSetSplit} />
      )}
    />
  );
}
