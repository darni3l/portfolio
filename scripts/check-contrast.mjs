// WCAG 2.x contrast check for both themes. Reads src/styles/tokens.css, so tokens stay the single source.
// Usage: npm run check:contrast   (exit code 1 if any required pair fails)
import { readFileSync } from 'node:fs'

const css = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8')

const block = (selector) => {
  const start = css.indexOf(selector + ' {')
  const open = css.indexOf('{', start)
  const close = css.indexOf('\n}', open)
  return css.slice(open, close)
}
const parse = (text) =>
  Object.fromEntries([...text.matchAll(/--(color-[\w-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)].map((m) => [m[1], m[2]]))

const light = parse(block(':root'))
const dark = { ...light, ...parse(block('[data-theme="dark"]')) }

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

// [foreground, background, minimum ratio, where it is used]
const PAIRS = [
  ['text', 'bg', 4.5, 'body text on page'],
  ['text', 'surface', 4.5, 'text on cards and modal'],
  ['text-muted', 'bg', 4.5, 'secondary text on page'],
  ['text-muted', 'surface', 4.5, 'secondary text on cards'],
  ['text-muted', 'surface-sunken', 4.5, 'secondary text inside inset blocks / placeholders'],
  ['text', 'surface-sunken', 4.5, 'text inside inset blocks'],
  ['accent', 'bg', 4.5, 'links, labels, outline buttons on page'],
  ['accent', 'surface', 4.5, 'labels and links on cards'],
  ['accent', 'surface-sunken', 4.5, 'labels inside inset blocks'],
  ['accent-hover', 'bg', 4.5, 'link hover on page'],
  ['on-accent', 'accent', 4.5, 'primary button, solid tag, active toggle'],
  ['on-accent', 'accent-hover', 4.5, 'primary button hover'],
  ['on-tint', 'tint', 4.5, 'tinted tag, hover states'],
  ['accent-hover', 'tint', 4.5, 'outline button hover (text is on-tint)'],
  ['inverse-text', 'inverse-bg', 4.5, '"Next" card text'],
  ['inverse-muted', 'inverse-bg', 4.5, '"Next" card secondary text'],
  ['inverse-accent', 'inverse-bg', 4.5, '"Next" card label'],
  ['focus', 'bg', 3, 'focus ring on page'],
  ['focus', 'surface', 3, 'focus ring on cards / modal'],
  ['accent', 'surface', 3, 'active toggle and limits bar vs surface'],
  ['border-strong', 'bg', 1, 'info only: decorative tag/placeholder borders'],
]

let failures = 0
for (const [name, theme] of [['LIGHT', light], ['DARK', dark]]) {
  console.log(`\n${name}`)
  for (const [fg, bg, min, use] of PAIRS) {
    const value = ratio(theme[`color-${fg}`], theme[`color-${bg}`])
    const ok = value >= min
    if (!ok) failures += 1
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${value.toFixed(2).padStart(5)}:1  (min ${min})  ${fg} on ${bg}  ${use}`)
  }
}
console.log(failures ? `\n${failures} pair(s) below WCAG AA.` : '\nAll pairs meet WCAG AA in both themes.')
process.exit(failures ? 1 : 0)
