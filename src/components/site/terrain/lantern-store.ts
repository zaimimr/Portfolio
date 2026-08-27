export type LanternPosition = { x: number; y: number };

let current: LanternPosition | null = null;
const listeners = new Set<(position: LanternPosition) => void>();

export function publishLantern(x: number, y: number) {
  current = { x, y };
  for (const listener of listeners) listener(current);
}

export function subscribeLantern(
  listener: (position: LanternPosition) => void,
) {
  listeners.add(listener);
  if (current) listener(current);
  return () => {
    listeners.delete(listener);
  };
}
