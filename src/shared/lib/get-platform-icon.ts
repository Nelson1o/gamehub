import PcIcon from "../assets/icons/pc-icon.svg";
import { platformIconMap } from "../config";

export const getPlatformIcon = (slug: string): string =>
  platformIconMap[slug] || PcIcon;
