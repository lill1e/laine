import { A, useNavigate } from "@solidjs/router";
import logo from "@/assets/header.webp";
import { LoginButton } from "./login";
import styles from "./header.module.css";

export function Header() {
  const navigate = useNavigate();

  return (
    <nav class={styles.container}>
      <div class={styles.logoWrapper}>
        <div onClick={() => navigate("/")} class={styles.logoContainer}>
          <img class={styles.logo} src={logo} />
        </div>
      </div>
      <div class={styles.links}>
        <A end activeClass={styles.active} href="/">
          Games
        </A>
        <A activeClass={styles.active} href="/players">
          Players
        </A>
        <a>Leaderboards</a>
      </div>
      <div class={styles.account}>
        <LoginButton />
      </div>
    </nav>
  );
}
