import { For } from "solid-js";
import { Player } from "@/api/player";
import { Select } from "./core/select";

type Props = {
  class?: string;
  player?: Player | null;
  setPlayer?: (player: Player) => void;
};

export function PlayerSelector(props: Props) {
  const onChange = (event: Event & { currentTarget: HTMLSelectElement }) => {
    const value = event.currentTarget.value;
    props.setPlayer?.(Player.getCached(value)!);
  };

  return (
    <>
      <Select onChange={onChange}>
        <For each={Player.getAllPlayers()}>
          {(player) => <option value={player.id}>{player.username}</option>}
        </For>
      </Select>
    </>
  );
}
