import { A } from "@solidjs/router";
import { Card, CardBody, CardHeader } from "@/component/core/card";

export function AdminPage() {
  return (
    <>
      <Card>
        <CardHeader>Admin tools</CardHeader>
        <CardBody>
          <ul>
            <li>
              <A href={"/new"}>Create a new game</A>
            </li>
            <li>
              <A href={"/invite"}>Invite a new user</A>
            </li>
          </ul>
        </CardBody>
      </Card>
    </>
  );
}
