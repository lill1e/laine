import type { FrameLike } from "@/api/frame";

export function frameTotal(
  frame: FrameLike,
  running: number,
  next: FrameLike | null,
  nextNext: FrameLike | null,
): number {
  let valueSum = (frame.rollOne ?? 0) + (frame.rollTwo ?? 0) + (frame.extraRoll ?? 0);
  let strike = false;
  let spare = false;

  if (frame.rollOne === 10) {
    strike = true;
  } else if (valueSum === 10) {
    spare = true;
  }

  if (strike && next) {
    const nextFirst = next.rollOne ?? 0;
    const nextSecond = next.rollTwo ?? 0;
    valueSum += nextFirst + nextSecond;
    if (next.rollOne === 10 && nextNext) {
      valueSum += nextNext.rollOne ?? 0;
    }
  } else if (spare && next) {
    valueSum += next.rollOne ?? 0;
  } else if (spare) {
    valueSum += frame.extraRoll ?? 0;
  }

  return running + valueSum;
}

/**
 * Calculate frame totals
 */
export function calculateTotals(frames: FrameLike[]): number[] {
  const out = [];
  let running = 0;
  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];
    const next = i + 1 < frames.length ? frames[i + 1] : null;
    const nextNext = i + 2 < frames.length ? frames[i + 2] : null;
    const total = frameTotal(frame, running, next, nextNext);
    running += total - running;
    out.push(total);
  }

  return out;
}

type HumanReadableFrameLike = {
  rollOne: string | null;
  rollTwo: string | null;
  extraRoll: string | null;
};

function stringifyFrameNumber(value: number): string {
  switch (value) {
    case 10:
      return "X";
    case 0:
      return "–";
    default:
      return value.toString();
  }
}

export function toHumanReadableFrameLike(frame: FrameLike): HumanReadableFrameLike {
  let rollOne = frame.rollOne !== null ? stringifyFrameNumber(frame.rollOne) : null;
  let rollTwo = frame.rollTwo !== null ? stringifyFrameNumber(frame.rollTwo) : null;
  let extraRoll = frame.extraRoll !== null ? stringifyFrameNumber(frame.extraRoll) : null;

  if (
    frame.rollOne !== null &&
    frame.rollTwo !== null &&
    frame.rollOne !== 10 &&
    frame.rollOne + frame.rollTwo === 10
  ) {
    rollTwo = "/";
  }

  return {
    rollOne,
    rollTwo,
    extraRoll,
  };
}
