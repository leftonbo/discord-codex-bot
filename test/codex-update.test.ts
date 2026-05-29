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
