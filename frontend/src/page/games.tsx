import { createAsync } from "@solidjs/router";
import { createSignal, For } from "solid-js";
import { getGames } from "@/api/game";
import { Card, CardBody, CardHeader } from "@/component/core/card";
import { CardColumn } from "@/component/core/cardColumn";
import { Checkbox } from "@/component/core/checkbox";
import { DateInput } from "@/component/core/dateInput";
import { Field, Label } from "@/component/core/field";
import { GameCard } from "@/component/game/card";

export function GamesPage() {
  const [enableDateFilter, setEnableDateFilter] = createSignal(false);
  const games = createAsync(async () => await getGames());

  return (
    <>
      <CardColumn>
        <Card>
          <CardHeader>Filters...</CardHeader>
          <CardBody>
            <Field>
              <Checkbox checked={enableDateFilter()} setChecked={setEnableDateFilter} />
              <Label disabled={!enableDateFilter()}>Date:</Label>
              <DateInput disabled={!enableDateFilter()} />
            </Field>
          </CardBody>
        </Card>
      </CardColumn>
      <CardColumn>
        <For each={games.latest}>{(game) => <GameCard game={game} />}</For>
      </CardColumn>
    </>
  );
}
