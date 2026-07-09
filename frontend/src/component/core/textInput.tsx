import { Input } from "./input";
import styles from "./textInput.module.css";

type Props = {
  placeholder?: string;
  value?: string;
  onInput?: (event: Event & { target: HTMLInputElement }) => void;
};

export function TextInput(props: Props) {
  return (
    <Input
      class={styles.input}
      type="text"
      value={props.value}
      onInput={props.onInput}
      placeholder={props.placeholder}
    />
  );
}
