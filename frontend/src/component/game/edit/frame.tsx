import EditableFrame from "@/component/frame/editable";
import type { EditingFrame } from "./editor";

type Props = {
  setFrame: (frame: EditingFrame) => void;
  frame: EditingFrame;
  isLast?: boolean;
  row: number;
  col: number;
  cellRefs: HTMLInputElement[];
};

export function EditorFrame(props: Props) {
  const cellRefs = () => props.cellRefs;
  const lastFrame = () => props.col === 9;

  function select(idx: number) {
    props.cellRefs[idx].select();
  }

  function focusCell(...cells: number[]) {
    for (const cell of cells) {
      if (props.cellRefs[cell]) {
        select(cell);
        return;
      }
    }
  }

  function set(
    prop: "rollOne" | "rollTwo" | "extraRoll" | "split",
    value: number | boolean | null,
  ) {
    props.setFrame({
      ...props.frame,
      [prop]: value,
    });
  }

  const oneIdx = () => props.row * 30 + props.col * 3;
  const twoIdx = () => oneIdx() + 1;
  const extraIdx = () => twoIdx() + 1;
  const nextIdx = () => extraIdx() + 1;

  type Token = "x" | "/" | number | null;

  function inputHandler(
    idx: () => number,
    func: (token: Token, focus: (id: number) => void) => boolean,
  ) {
    // eslint-disable-next-line
    return (event: KeyboardEvent & { currentTarget: HTMLInputElement }) => {
      if (event.ctrlKey || event.metaKey) return;
      if (event.key === "Backspace") {
        event.preventDefault();
        func(null, focusCell);
        event.currentTarget.value = "";
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        let probe = idx() - 1;
        while (probe >= 0) {
          if (props.cellRefs[probe]) {
            select(probe);
            return;
          }
          probe--;
        }
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        let probe = idx() + 1;
        while (probe < props.cellRefs.length) {
          if (props.cellRefs[probe]) {
            select(probe);
            return;
          }
          probe++;
        }
      }

      // for all other non-printable chars (tab, etc) don't handle them
      if (event.key.length !== 1) return;

      // we want to provide our own input values, not use the users
      event.preventDefault();
      const lower = event.key.toLowerCase();
      let token: Token = parseInt(lower);
      if (lower === "x" || lower === "/") {
        token = lower;
      } else if (lower === "-") {
        token = 0;
      } else if (Number.isNaN(token) || token < 0 || token > 10) {
        event.preventDefault();
        event.currentTarget.value = "";
        return;
      }

      // eslint-disable-next-line
      const result = func(token, focusCell);
      if (!result) {
        event.currentTarget.value = "";
      }
    };
  }

  const onOneKey = (token: Token, focus: (...idx: number[]) => void) => {
    if (token === null) {
      set("rollOne", null);
      focus(oneIdx());
      return true;
    }
    switch (token) {
      case "x":
        set("rollOne", 10);
        if (lastFrame()) {
          focus(twoIdx(), oneIdx());
        } else {
          set("rollTwo", null);
          focus(nextIdx(), oneIdx());
        }
        return true;
      case "/":
        return false;
      default:
        set("rollOne", token);
        // Guarantee the second is still valid
        if (props.frame.rollTwo !== null) {
          const newRollTwo = Math.min(10 - token, props.frame.rollTwo);
          set("rollTwo", newRollTwo);
          // Clear extra if not possible
          if (lastFrame() && newRollTwo !== 10) {
            set("extraRoll", null);
          }
        }
        focus(twoIdx(), oneIdx());
        return true;
    }
  };

  const onTwoKey = (token: Token, focus: (...idx: number[]) => void) => {
    if (token === null) {
      set("rollTwo", null);
      set("extraRoll", null);
      focus(twoIdx());
      return true;
    }
    switch (token) {
      case "x":
        if (lastFrame() && (props.frame.rollOne === 10 || props.frame.rollOne === 0)) {
          set("rollTwo", 10);
          focus(extraIdx(), twoIdx());
          return true;
        }
        return false;
      case "/":
        set("rollTwo", 10 - (props.frame.rollOne ?? 0));
        if (lastFrame()) set("extraRoll", null);
        focus(nextIdx(), twoIdx());
        return true;
      default:
        set("rollTwo", token);
        // Guarantee the first is still valid
        if (props.frame.rollOne !== null) {
          set("rollOne", Math.min(10 - token, props.frame.rollOne));
        }
        if (lastFrame()) set("extraRoll", null);
        focus(nextIdx(), twoIdx());
        return true;
    }
  };

  const onExtraKey = (token: Token, focus: (...idx: number[]) => void) => {
    if (token === null) {
      set("extraRoll", null);
      focus(extraIdx());
      return true;
    }
    switch (token) {
      case "x":
        set("extraRoll", 10);
        focus(nextIdx(), extraIdx());
        return true;
      case "/":
        set("extraRoll", 10 - (props.frame.rollTwo ?? 0));
        focus(nextIdx(), extraIdx());
        return true;
      default:
        set("extraRoll", token);
        focus(nextIdx(), extraIdx());
        return true;
    }
  };

  return (
    <EditableFrame
      doRenderAsLast={props.isLast}
      frame={props.frame}
      total={props.frame.total}
      rollOneRef={(ref) => (cellRefs()[oneIdx()] = ref)}
      rollTwoRef={(ref) => (cellRefs()[twoIdx()] = ref)}
      extraRollRef={(ref) => (cellRefs()[extraIdx()] = ref)}
      onOneKey={inputHandler(oneIdx, onOneKey)}
      onTwoKey={inputHandler(twoIdx, onTwoKey)}
      onExtraKey={inputHandler(extraIdx, onExtraKey)}
      onSetSplit={(value) => set("split", value)}
    />
  );
}
