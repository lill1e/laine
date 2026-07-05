import { A } from "@solidjs/router";
import { Card, CardBody, CardHeader } from "@/component/core/card";

export function AdminPage() {
  return (
    <>
      <Card>
        <CardHeader>Admin tools</CardHeader>
        <CardBody>
          <A href={"/new"}>Create a new game</A>
        </CardBody>
      </Card>
    </>
  );
}
