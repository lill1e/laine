import styles from "./input.module.css";

type InputProps = {
  tabindex?: number;
  class?: string;
  type: "text" | "date" | "checkbox";
  disabled?: boolean;
  placeholder?: string;
  checked?: boolean;
  onInput?: (event: Event & { currentTarget: HTMLInputElement; target: HTMLInputElement }) => void;
  value?: string;
};

export function Input(props: InputProps) {
  return (
    <input
      value={props.value}
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
