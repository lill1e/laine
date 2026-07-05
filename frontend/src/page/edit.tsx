import { useParams } from "@solidjs/router";
import { createStore } from "solid-js/store";
import { Game } from "@/api/game";
import { Button } from "@/component/core/button";
import { Card, CardBody, CardHeader } from "@/component/core/card";
import { GameEditor } from "@/component/game/edit/editor";
import data from "@/games.json";
import { type EditableGame, toEditableGame } from "@/util/edit";

const def = new Game(data["1"]);

export function EditPage() {
  const params = useParams();
  const [game, setGame] = createStore<EditableGame>(toEditableGame(def));

  const submit = () => {
    console.log(game);
  };

  return (
    <>
      <Card>
        <CardHeader>Editing Game</CardHeader>
        <CardBody>
          <GameEditor game={game} setGame={setGame} />
          <Button kind="primary" onClick={submit}>
            Submit
          </Button>
        </CardBody>
      </Card>
    </>
  );
}
