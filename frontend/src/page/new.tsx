import { createStore } from "solid-js/store";
import { Button } from "@/component/core/button";
import { Card, CardBody, CardHeader } from "@/component/core/card";
import { GameEditor } from "@/component/game/edit/editor";
import { newEditableGame } from "@/util/edit";
import styles from "./new.module.css";

export function NewGamePage() {
  const [game, setGame] = createStore(newEditableGame());
  return (
    <Card>
      <CardHeader>Create a game</CardHeader>
      <CardBody>
        <GameEditor game={game} setGame={setGame} />
        <div class={styles.footer}>
          <Button kind="default">Cancel</Button>
          <Button kind="primary">Create</Button>
        </div>
      </CardBody>
    </Card>
  );
}
