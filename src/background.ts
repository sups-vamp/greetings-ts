// Produces a smoothly, continuously interpolated background gradient based
// on the exact time of day, instead of snapping between fixed buckets.

interface ColorAnchor {
  hour: number; // 0–24, decimal hours allowed
  colors: [string, string, string]; // hex colors for the 3 gradient stops
}

// Same mood palettes as before, pinned to the start hour of each period.
// The last anchor (24) repeats the first (0) so the cycle loops seamlessly
// across midnight.
const ANCHORS: ColorAnchor[] = [
  { hour: 0, colors: ['#02030a', '#0a1130', '#141b3d'] }, // midnight
  { hour: 4, colors: ['#0f1a3d', '#4a3364', '#c96e82'] }, // dawn
  { hour: 6, colors: ['#3d2b4a', '#b8562f', '#ffce7a'] }, // sunrise
  { hour: 8, colors: ['#1b3a5c', '#4f8fc0', '#bfe6c8'] }, // morning
  { hour: 10, colors: ['#123a5e', '#2f79b0', '#a9dcf0'] }, // forenoon
  { hour: 12, colors: ['#245a86', '#dba53f', '#fff4d6'] }, // noon
  { hour: 13, colors: ['#5c3a1e', '#d97f2e', '#ffd39b'] }, // afternoon
  { hour: 16, colors: ['#241738', '#8a3a6b', '#ff9a76'] }, // dusk
  { hour: 18, colors: ['#150f30', '#362b6b', '#6d5aa6'] }, // twilight
  { hour: 20, colors: ['#0b1130', '#1c2a5e', '#3a4d8f'] }, // evening
  { hour: 22, colors: ['#03040c', '#0c1024', '#171c3d'] }, // night
  { hour: 24, colors: ['#02030a', '#0a1130', '#141b3d'] }, // back to midnight
];

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex([r, g, b]: [number, number, number]): string {
  const toHex = (c: number) => Math.round(c).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function lerpColor(a: string, b: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  return rgbToHex([r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t]);
}

/** Returns a CSS linear-gradient string for the exact decimal hour given. */
export function getGradientForTime(hours: number, minutes: number, seconds: number): string {
  const decimalHour = hours + minutes / 60 + seconds / 3600;

  let i = 0;
  while (i < ANCHORS.length - 2 && ANCHORS[i + 1].hour <= decimalHour) {
    i++;
  }

  const from = ANCHORS[i];
  const to = ANCHORS[i + 1];
  const span = to.hour - from.hour;
  const t = span === 0 ? 0 : (decimalHour - from.hour) / span;

  const c1 = lerpColor(from.colors[0], to.colors[0], t);
  const c2 = lerpColor(from.colors[1], to.colors[1], t);
  const c3 = lerpColor(from.colors[2], to.colors[2], t);

  return `linear-gradient(160deg, ${c1} 0%, ${c2} 55%, ${c3} 100%)`;
}