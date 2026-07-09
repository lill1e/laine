import { Route, Router } from "@solidjs/router";
import "./index.css";
import type { ParentProps } from "solid-js";
/* @refresh reload */
import { render } from "solid-js/web";
import { Header } from "./component/core/header.tsx";
import { AdminPage } from "./page/admin.tsx";
import { EditPage } from "./page/edit.tsx";
import { GamesPage } from "./page/games.tsx";
import { InvitePage } from "./page/invite.tsx";
import { NewGamePage } from "./page/new.tsx";

const Layout = (props: ParentProps) => (
  <>
    <Header />
    <main>{props.children}</main>
  </>
);

const root = document.getElementById("root");

render(
  () => (
    <Router root={Layout}>
      <Route path="/" component={GamesPage} />
      <Route path="/new" component={NewGamePage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/edit/:id" component={EditPage} />
      <Route path="/invite" component={InvitePage} />
    </Router>
  ),
  root!,
);
