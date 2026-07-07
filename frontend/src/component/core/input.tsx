import styles from "./input.module.css";

type InputProps = {
  tabindex?: number;
  class?: string;
  type: "date" | "checkbox";
  disabled?: boolean;
  placeholder?: string;
  checked?: boolean;
  onInput?: (event: Event & { currentTarget: HTMLInputElement; target: HTMLInputElement }) => void;
};

export function Input(props: InputProps) {
  return (
    <input
      tabindex={props.tabindex}
      class={[props.class, styles.input].filter(Boolean).join(" ")}
      type={props.type}
      disabled={props.disabled}
      checked={props.checked}
      onInput={(x) => props.onInput?.(x)}
      placeholder={props.placeholder}
    />
  );
}
