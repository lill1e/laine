import { Input } from "./input";
import styles from "./dateInput.module.css";

type Props = {
  disabled?: boolean;
};

export function DateInput(props: Props) {
  return <Input class={styles.input} type="date" disabled={props.disabled} placeholder="Date..." />;
}
