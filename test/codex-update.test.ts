import { assertEquals } from "std/assert/mod.ts";
import {
  formatCodexUpdateError,
  formatCodexUpdateResult,
} from "../src/codex-update.ts";

Deno.test("formatCodexUpdateResult: 出力ありの成功メッセージを整形する", () => {
  assertEquals(
    formatCodexUpdateResult({ code: 0, output: "updated to 0.135.0" }),
    "Codex update が完了しました。\n\nupdated to 0.135.0",
  );
});

Deno.test("formatCodexUpdateResult: 成功出力は省略せずrestart案内だけ差し替える", () => {
  const output = [
    "Updating Codex via npm install -g @openai/codex...",
    "npm output line ".repeat(160),
    "🎉 Update ran successfully! Please restart Codex.",
  ].join("\n");

  assertEquals(
    formatCodexUpdateResult({ code: 0, output }),
    [
      "Codex update が完了しました。",
      "",
      "Updating Codex via npm install -g @openai/codex...",
      "npm output line ".repeat(160),
      "🎉 Update ran successfully! BOT は Codex を実行ごとに起動するため、通常は追加の restart は不要です。",
    ].join("\n"),
  );
});

Deno.test("formatCodexUpdateError: 失敗メッセージを整形する", () => {
  assertEquals(
    formatCodexUpdateError({
      type: "COMMAND_FAILED",
      code: 1,
      output: "permission denied",
    }),
    "Codex update に失敗しました (終了コード: 1)。\n\npermission denied",
  );
});
