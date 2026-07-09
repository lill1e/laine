import { useNavigate } from "@solidjs/router";
import { createStore } from "solid-js/store";
import { Button } from "@/component/core/button";
import { Card, CardActions, CardBody, CardHeader } from "@/component/core/card";
import { GameEditor } from "@/component/game/edit/editor";
import { newEditableGame } from "@/util/edit";

export function NewGamePage() {
  const nav = useNavigate();
  const [game, setGame] = createStore(newEditableGame());

  const cancel = () => {
    nav(-1);
  };

  return (
    <Card>
      <CardHeader>Create a game</CardHeader>
      <CardBody>
        <GameEditor game={game} setGame={setGame} />
      </CardBody>
      <CardActions>
        <Button kind="default" onClick={cancel}>
          Cancel
        </Button>
        <Button kind="primary">Create</Button>
      </CardActions>
    </Card>
  );
}
