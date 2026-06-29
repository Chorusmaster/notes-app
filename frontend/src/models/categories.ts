export const CATEGORIES = [
  { value: "work", label: "Work" },
  { value: "personal", label: "Personal" }
] as const;

export type Category = (typeof CATEGORIES)[number]["value"];

export function isCategory(value: string): value is Category {
  return CATEGORIES.some(tab => tab.value === value);
}