import { A } from "@solidjs/router";
import styles from "./login.module.css";

export function LoginButton() {
  return (
    <A href={"/admin"} class={styles.button}>
      Login
    </A>
  );
}
