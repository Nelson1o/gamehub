import { describe, expect, it } from "vitest";

import MacIcon from "../../assets/icons/mac-icon.svg";
import NintendoIcon from "../../assets/icons/nintendo-icon.svg";
import PcIcon from "../../assets/icons/pc-icon.svg";
import PlaystationIcon from "../../assets/icons/playstation-icon.svg";
import XboxIcon from "../../assets/icons/xbox-icon.svg";
import { platformIconMap } from "../../config";
import { getPlatformIcon } from "./get-platform-icon";

describe("Проверка функции getPlatformIcon", () => {
  it("Проверяем вывод правильной иконки для существующих платформ", () => {
    expect(getPlatformIcon("pc")).toBe(PcIcon);
    expect(getPlatformIcon("playstation")).toBe(PlaystationIcon);
    expect(getPlatformIcon("xbox")).toBe(XboxIcon);
    expect(getPlatformIcon("nintendo")).toBe(NintendoIcon);
    expect(getPlatformIcon("mac")).toBe(MacIcon);
  });

  it("Проверяем вывод иконки PC для неизвестной платформы", () => {
    expect(getPlatformIcon("unknown")).toBe(PcIcon);
    expect(getPlatformIcon("")).toBe(PcIcon);
    expect(getPlatformIcon("   ")).toBe(PcIcon);
  });

  it("Проверяем корректность platformIconMap", () => {
    expect(getPlatformIcon("pc")).toBe(platformIconMap.pc);
    expect(getPlatformIcon("xbox")).toBe(platformIconMap.xbox);
  });

  it("Проверяем platformIconMap со всеми необходимыми ключами", () => {
    expect(platformIconMap).toHaveProperty("pc");
    expect(platformIconMap).toHaveProperty("playstation");
    expect(platformIconMap).toHaveProperty("xbox");
    expect(platformIconMap).toHaveProperty("nintendo");
    expect(platformIconMap).toHaveProperty("mac");
  });
});
