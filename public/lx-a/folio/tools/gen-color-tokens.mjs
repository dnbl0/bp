/* Generates folio/assets/tokens-color.json from src/styles/tokens.css.
   Resolves var() chains for dark (default) + light themes, categorizes into
   primitive / semantic / component tiers, and computes each non-primitive
   token's lineage back to its primitive (component → semantic → primitive).
   Run: node folio/tools/gen-color-tokens.mjs */
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
const dark = block(':root {');
const light = { ...dark, ...block(':root[data-theme="light"]') };
const isColor = v => /^#([0-9a-f]{3,8})$/i.test(v) || /^rgba?\(/i.test(v) || /^hsl/i.test(v);
function resolve(val, map, d = 0) {
  if (d > 12 || val == null) return null; val = val.trim();
  const m = val.match(/^var\(\s*(--[a-z0-9-]+)\s*(?:,\s*([^)]+))?\)$/i);
  if (m) { const r = map[m[1]]; if (r != null) return resolve(r, map, d + 1); if (m[2]) return resolve(m[2], map, d + 1); return null; }
  return val;
}
const names = Object.keys(dark);
const colorTok = names.filter(n => { const r = resolve(dark[n], dark); return r && isColor(r); });
const norm = v => (v || '').toLowerCase().replace(/\s+/g, '');
const tierOf = n => /^--ld-color-lexus-/.test(n) ? 'primitive' : /^--ld-s-color-/.test(n) ? 'semantic'
  : /^--ld-c-/.test(n) ? 'component' : /^--(canvas|surface|fg|accent|border|line|gold|electric|deep)/.test(n) ? 'app' : 'other';
const shortLabel = n => n.replace(/^--ld-color-lexus-/, '').replace(/^--ld-s-color-/, '').replace(/^--ld-c-/, '').replace(/^--/, '');
const rec = n => { const a = resolve(dark[n], dark), b = resolve(light[n] || dark[n], light); return { name: n, label: shortLabel(n), dark: a, light: (b && b.toLowerCase() !== (a || '').toLowerCase()) ? b : null }; };

// value -> primitive / semantic lookups (for value-matched lineage)
const primByVal = {}, semByVal = {};
colorTok.filter(n => tierOf(n) === 'primitive').forEach(n => { const v = norm(resolve(dark[n], dark)); if (!(v in primByVal)) primByVal[v] = n; });
colorTok.filter(n => tierOf(n) === 'semantic').forEach(n => { const v = norm(resolve(dark[n], dark)); if (!(v in semByVal)) semByVal[v] = n; });
const link = n => ({ name: n, label: shortLabel(n), tier: tierOf(n) });
const directRef = (name, tierRe) => { const m = (dark[name] || '').match(new RegExp(`var\\(\\s*(${tierRe})`, 'i')); return m ? m[1] : null; };
function lineage(name) {
  const t = tierOf(name), v = norm(resolve(dark[name], dark));
  const prim = primByVal[v] || directRef(name, '--ld-color-lexus-[a-z0-9-]+');
  if (t === 'semantic' || t === 'app') return prim ? [link(prim)] : [];
  if (t === 'component') {
    const sem = directRef(name, '--ld-s-color-[a-z0-9-]+') || semByVal[v];
    const out = [];
    if (sem) out.push(link(sem));
    if (prim) out.push(link(prim));
    return out;
  }
  return [];
}
const withLineage = n => ({ ...rec(n), lineage: lineage(n) });

const prim = {};
colorTok.filter(n => tierOf(n) === 'primitive').forEach(n => {
  const m = n.match(/^--ld-color-lexus-([a-z]+)-(.+)$/); if (!m) return;
  (prim[m[1]] ??= []).push({ ...rec(n), label: m[2] });
});
const stepNum = l => /^\d+$/.test(l) ? +l : Infinity;
Object.values(prim).forEach(a => a.sort((x, y) => (stepNum(x.label) - stepNum(y.label)) || x.label.localeCompare(y.label)));

const semDS = {};
colorTok.filter(n => tierOf(n) === 'semantic').forEach(n => { const g = n.replace('--ld-s-color-', '').split('-')[0]; (semDS[g] ??= []).push(withLineage(n)); });
const appAliases = colorTok.filter(n => tierOf(n) === 'app').map(withLineage);
const comp = {};
colorTok.filter(n => tierOf(n) === 'component').forEach(n => { const g = n.replace('--ld-c-', '').split('-')[0]; (comp[g] ??= []).push(withLineage(n)); });

const lineaged = [...Object.values(semDS).flat(), ...appAliases, ...Object.values(comp).flat()];
const out = { primitive: prim, semanticDS: semDS, appAliases, component: comp,
  counts: { primitive: Object.values(prim).flat().length, semanticDS: Object.values(semDS).flat().length, app: appAliases.length, component: Object.values(comp).flat().length,
    lineaged: lineaged.filter(t => t.lineage.length).length, ofLineaged: lineaged.length } };
fs.writeFileSync('folio/assets/tokens-color.json', JSON.stringify(out, null, 1));
console.log('counts:', JSON.stringify(out.counts));
console.log('sample semantic:', JSON.stringify(semDS.foreground.find(t => t.lineage.length)));
console.log('sample component:', JSON.stringify(comp.surface.find(t => t.lineage.length > 1)));
