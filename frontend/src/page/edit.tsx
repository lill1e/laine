import { createAsync } from "@solidjs/router";
import { createEffect, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { getGames } from "@/api/game";
import { Button } from "@/component/core/button";
import { Card, CardActions, CardBody, CardHeader } from "@/component/core/card";
import { GameEditor } from "@/component/game/edit/editor";
import { type EditableGame, toEditableGame } from "@/util/edit";

export function EditPage() {
  const games = createAsync(async () => await getGames());
  const [game, setGame] = createStore<EditableGame | {}>({});
  createEffect(() => {
    if (games()) {
      setGame(toEditableGame(games()![0]));
    }
  });

  const submit = () => {
    console.log(game);
  };

  return (
    <>
      <Card>
        <CardHeader>Editing Game</CardHeader>
        <Show when={"entries" in game && game}>
          {(game) => (
            <>
              <CardBody>
                <GameEditor game={game()} setGame={setGame} />
              </CardBody>
              <CardActions>
                <Button kind="primary" onClick={submit}>
                  Submit
                </Button>
              </CardActions>
            </>
          )}
        </Show>
      </Card>
    </>
  );
}
