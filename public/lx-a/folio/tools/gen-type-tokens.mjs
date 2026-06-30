/* Generates folio/assets/tokens-type.json from src/styles/tokens.css —
   the Lexus DS type scale (--ld-s-typography-<style>-<prop>), one entry per
   style with its resolved properties, sorted largest → smallest.
   Run: node folio/tools/gen-type-tokens.mjs */
import fs from 'fs';
const css = fs.readFileSync('src/styles/tokens.css', 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
function block(sel) {
  const i = css.indexOf(sel); if (i < 0) return {};
  let s = css.indexOf('{', i) + 1, depth = 1, j = s;
  for (; j < css.length && depth > 0; j++) { if (css[j] === '{') depth++; else if (css[j] === '}') depth--; }
  const map = {};
  for (const m of css.slice(s, j - 1).matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/gi)) map[m[1].trim()] = m[2].trim();
  return map;
}
const root = block(':root {');
const calc = (v) => { const m = (v || '').match(/^calc\(\s*([\d.]+)px\s*\*\s*([\d.]+)\s*\)$/i); return m ? +(parseFloat(m[1]) * parseFloat(m[2])).toFixed(3) + 'px' : v; };
const styles = {};
for (const [k, v] of Object.entries(root)) {
  const m = k.match(/^--ld-s-typography-([a-z0-9]+)-(.+)$/); if (!m) continue;
  (styles[m[1]] ??= { style: m[1] })[m[2]] = v;
}
const list = Object.values(styles).map((s) => ({
  style: s.style,
  family: (s['font-family'] || '').split(',')[0].trim(),
  weight: s['font-weight'] || '',
  lineHeight: s['line-height'] || '',
  size: s['font-size'] || '',
  tracking: calc(s['letter-spacing'] || '0px'),
  textCase: s['text-case'] || 'none',
  px: parseFloat(s['font-size']) || 0,
})).sort((a, b) => b.px - a.px || a.style.localeCompare(b.style));
fs.mkdirSync('folio/assets', { recursive: true });
fs.writeFileSync('folio/assets/tokens-type.json', JSON.stringify(list, null, 1));
console.log('type styles:', list.length);
console.log(list.map((s) => `${s.style} ${s.size}/${s.weight}`).join(' · '));
