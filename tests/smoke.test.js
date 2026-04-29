import { describe, expect, it } from "vitest";

describe("test environment", () => {
  it("provides browser APIs needed by the BizTrack scripts", () => {
    document.body.innerHTML = "<main id=\"app\"></main>";
    localStorage.setItem("bizTrackSmoke", JSON.stringify([{ ok: true }]));

    expect(document.getElementById("app")).not.toBeNull();
    expect(JSON.parse(localStorage.getItem("bizTrackSmoke"))).toEqual([{ ok: true }]);
    expect(typeof window.URL.createObjectURL).toBe("function");
  });
});
