import { Input } from "./input";

type Props = {
  tabindex?: number;
  class?: string;
  checked?: boolean;
  setChecked?: (checked: boolean) => void;
};

export function Checkbox(props: Props) {
  const onInput = (event: Event & { target: HTMLInputElement }) => {
    props.setChecked?.(event.target.checked);
  };
  return (
    <Input
      tabindex={props.tabindex}
      class={props.class}
      type="checkbox"
      checked={props.checked}
      onInput={onInput}
    />
  );
}
