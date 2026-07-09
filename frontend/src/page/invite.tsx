import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import { Button } from "@/component/core/button";
import { Card, CardActions, CardBody, CardHeader } from "@/component/core/card";
import { CardColumn } from "@/component/core/cardColumn";
import { TextInput } from "@/component/core/textInput";

export function InvitePage() {
  const nav = useNavigate();
  const [id, setId] = createSignal("");
  const cancel = () => {
    nav(-1);
  };
  const submit = () => {};
  return (
    <CardColumn>
      <Card>
        <CardHeader>Invite a user</CardHeader>
        <CardBody>
          <TextInput value={id()} onInput={(x) => setId(x.target.value)} placeholder="Discord ID" />
        </CardBody>
        <CardActions>
          <Button kind="default" onClick={cancel}>
            Cancel
          </Button>
          <Button kind="primary" onClick={submit}>
            Invite
          </Button>
        </CardActions>
      </Card>
    </CardColumn>
  );
}
