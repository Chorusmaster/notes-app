import { CATEGORIES } from "./categories";

export const TABS = [
  { value: "all", label: "All" },
  ...CATEGORIES
] as const;

export type Tab = (typeof TABS)[number]["value"];

export function isTab(value: string): value is Tab {
  return TABS.some(tab => tab.value === value);
}