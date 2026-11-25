// Have You Tried Turning It Off? — make.fun entry
// One funny line a hopeless tech support agent says to a desperate customer.
// Deterministic, Node 22 stdlib only, no wall-clock, no randomness.
//
// FINAL ENTRY (chosen):
// "I hear you — let's try turning you off and on again: lie down, count to ten, and I'll stay right here pretending it worked."
// Why it wins: it twists the classic "turn it off and on again" onto the
// customer instead of the device; the humour is the agent's cheerful
// uselessness ("pretending it worked"), not the customer's pain; "I hear
// you" + "stay right here" lets the desperation be felt, not explained;
// and it sounds like something a real (hopeless) agent would actually say.
//
// REJECTED CANDIDATES (with reasons):
// 1. "Have you tried turning it off and on again? It worked for my hopes once, briefly, in 2019."
//    REJECTED: twist lands late and flat; "in 2019" is a second joke fighting the first, and the
//    customer's desperation is nowhere felt.
// 2. "Great news — the problem is still on. Let's turn it off, count to ten, and pretend that fixed your whole week."
//    REJECTED: "your whole week" makes the customer the butt of the joke and explains the
//    desperation instead of letting it be felt; also two ideas in one line.
// 3. "Have you tried turning your hopes off and on again? Mine rebooted into a shrug, so let's start there."
//    REJECTED: clever but the agent talks about himself, not to the customer; "rebooted into a
//    shrug" needs a second read and sounds written, not spoken by a real agent.
// 4. "Okay, unplug the router, count to ten, and while you wait I'll Google what a router is."
//    REJECTED: funny premise, but it is the stock off-and-on setup with no twist on the classic,
//    and confessing ignorance is a different joke (incompetence, not cheerful uselessness).
// 5. "Have you tried turning the whole company off and on again? I'm just the hold music with a headset."
//    REJECTED: good twist, but "hold music with a headset" is a punchline about the agent's job,
//    not a line an agent would say to a customer mid-call; it breaks the in-scene realism.
// 6. "Don't worry, this is totally fixable — just not by me, and not today, and not with that."
//    REJECTED: a list of three negations; the joke is the agent giving up, but there is no twist,
//    no classic turned, and it reads as a rant rather than one spoken line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export const ENTRY =
  "I hear you \u2014 let's try turning you off and on again: lie down, count to ten, and I'll stay right here pretending it worked.";

export function validate(text: string): void {
  if (typeof text !== "string") throw new Error("entry must be a string");
  if (text.length < 1 || text.length > 199) {
    throw new Error(`entry must be 1-199 chars, got ${text.length}`);
  }
  if (text.trim().length === 0) throw new Error("entry must not be blank");
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

export function main(): void {
  // Output dir: argv[2] wins, then OUTPUT_DIR, then "output".
  const outputDir = process.argv[2] || process.env.OUTPUT_DIR || "output";
  validate(ENTRY);
  mkdirSync(outputDir, { recursive: true });
  const outPath = join(outputDir, "entry.txt");
  // No trailing newline: the gate counts characters, so write exactly ENTRY.
  writeFileSync(outPath, ENTRY, "utf8");
  // Read-back self-check: what landed on disk must be byte-identical.
  const readBack = readFileSync(outPath, "utf8");
  if (readBack !== ENTRY) throw new Error("read-back mismatch");
  validate(readBack);
  console.log(`wrote ${outPath} (${ENTRY.length} chars)`);
}

main();
