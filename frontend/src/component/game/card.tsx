import { useNavigate } from "@solidjs/router";
import { Pencil } from "lucide-solid";
import type { Game } from "@/api/game";
import { Button } from "@/component/core/button";
import { Card, CardBody, CardHeader } from "@/component/core/card";
import { DisplayFrame } from "@/component/frame/display";
import { ScoreTable } from "./scoreTable";
import styles from "./card.module.css";

interface Props {
  game: Game;
}

export function GameCard(props: Props) {
  const navigate = useNavigate();
  const dtf = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  });

  return (
    <Card>
      <CardHeader>
        <div class={styles.header}>
          <span>{dtf.format(new Date(props.game.date))}</span>
          <div class={styles.actions}>
            <Button class={styles.edit} kind="default" onClick={() => navigate(`/edit/TEMP`)}>
              <Pencil />
              Edit
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <ScoreTable
          player={(player, alias) => (
            <div class={styles.playerCell}>
              <span class={styles.playerCellName}>{player.username}</span>
              <span class={styles.playerCellAs}>{alias}</span>
            </div>
          )}
          frame={(frame) => <DisplayFrame frame={frame} total={frame.total} />}
          rows={props.game.entries}
        />
      </CardBody>
    </Card>
  );
}
