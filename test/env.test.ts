import { assertEquals } from "std/assert/mod.ts";
import { getEnv } from "../src/env.ts";

Deno.test("getEnv: 必須環境変数がある場合に成功する", () => {
  Deno.env.set("DISCORD_TOKEN", "token");
  Deno.env.set("WORK_BASE_DIR", "/tmp/work");
  Deno.env.set("CODEX_APPEND_SYSTEM_PROMPT", "system prompt");

  const env = getEnv();
  if (env.isErr()) {
    throw new Error("env parse failed");
  }
  assertEquals(env.value.WORK_BASE_DIR, "/tmp/work");
  assertEquals(env.value.CODEX_APPEND_SYSTEM_PROMPT, "system prompt");
});

Deno.test("getEnv: WORK_BASE_DIRのチルダをHOMEに展開する", () => {
  Deno.env.set("DISCORD_TOKEN", "token");
  Deno.env.set("WORK_BASE_DIR", "~/codex-bot-work");
  Deno.env.set("HOME", "/home/test-user");

  const env = getEnv();
  if (env.isErr()) {
    throw new Error("env parse failed");
  }
  assertEquals(env.value.WORK_BASE_DIR, "/home/test-user/codex-bot-work");
});
