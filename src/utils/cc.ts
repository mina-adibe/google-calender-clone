export function cc(...classes: unknown[]): string {
  return classes.filter((c) => typeof c === "string").join(" ");
}
