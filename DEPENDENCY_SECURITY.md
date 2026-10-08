# Dependency security remediation

Inspected October 8, 2026 UTC against master c07e68c9d13e0a4eaa6c3d185a9057798040add3.

The current npm registry audit and public upstream advisories were inspected. Audit results refer to the dependency tree, not individual GitHub alert counts or dismissal state.

The original lockfile audit reported 25 affected dependency entries: 1 critical, 18 high, 4 moderate, and 2 low. The corrected lockfile reports zero findings at every severity.

## Why an Astro major update is necessary

[GHSA-26w7-cxv4-gfx2](https://github.com/withastro/astro/security/advisories/GHSA-26w7-cxv4-gfx2) lists Astro <7.2.8 as affected and 7.2.8 as the first fixed release, requiring Sharp 0.35.4. The published Astro 5 releases stop at 5.18.2. No supported Astro 5 patch clears this critical advisory. Astro 6.1.10 also remains affected. Additional high severity Astro advisories require versions newer than 6.1.10.

Astro is constrained to ~7.2.8, with 7.2.10 resolved, avoiding the newer 7.3 minor line. Sharp resolves to 0.35.5, which also clears its newer librsvg advisory. Dependency updates use supported parent ranges without forced audit updates or overrides. The old root rolldown-vite alias was re-resolved to genuine Vite 8, clearing the esbuild peer conflict.

Compatibility changes: Node 24 for CI and Netlify; ClientRouter replaces the removed ViewTransitions export; PostCSS points to its configuration directory; Tailwind imports its explicit CSS export. compressHTML: true and the supported unified Markdown processor preserve prior whitespace and essay typography. Postbuild removes private prerender intermediates from the public static output.

## Existing PRs

PR #15 was closed without merging and was superseded by #18. PR #20 is currently mergeable, but its existing Netlify preview failed and its Astro 6.1.10 target does not clear the critical advisory.

The new remediation supersedes the dependency changes proposed in #5 (minimatch), #8 (svgo), #11 (h3), #12 (flatted), #13 (picomatch), #14 (smol-toml), #16 (defu), #19 (fast-xml-parser), #20 (Astro), and #21 (devalue). Some older PR targets remain vulnerable to later advisories. Keep them unmerged; reconcile or close them after this remediation merges. The unrelated timeline PR #4 is outside this change.

## Resolved versions

| Package | Version |
| --- | --- |
| astro | 7.2.10 |
| @astrojs/react | 6.0.6 |
| @astrojs/markdown-remark | 7.3.2 |
| @astrojs/rss | 4.0.19 |
| sharp | 0.35.5 |
| vite | 8.3.3 |
| esbuild | 0.28.2 |
| devalue | 5.9.4 |
| fast-xml-parser | 5.11.2 |
| svgo | 4.1.0 |
| h3 | 1.15.11 |
| flatted | 3.4.4 |
| picomatch | 4.0.7 |
| smol-toml | 1.9.0 |
| defu | 6.1.7 |
| minimatch | 3.1.5 |
| brace-expansion | 1.1.21 |
| js-yaml | 4.3.2 |
| postcss | 8.5.29 |
| nanoid | 3.3.20 |
| browserslist | 4.29.3 |
| @humanfs/node | 0.16.8 |
| baseline-browser-mapping | 2.11.27 |
| source-map-js | 1.2.2 |
| http-cache-semantics | 4.3.0 |
| ajv | 6.15.0 |
| @babel/core | 7.29.7 |

Nested minimatch 9.0.9, brace-expansion 2.1.7, and picomatch 2.3.2 also pass the audit.

## Verification

Node 24.19.0, npm 11.9.0. Baseline lint and build passed. Corrected clean npm ci, npm run lint, npm run build including the existing postbuild integrity check, and npm audit --audit-level=high pass. npm ls --all reports no invalid peer dependencies. There is no dedicated test script in package.json.

All 9 generated HTML routes match the baseline; their visible text is unchanged. Referenced local scripts, styles, and images exist. Netlify contact form markup, CNAME, and .nojekyll are preserved. The production build optimizes 8 image variants. Generated transition styles contain upstream trailing whitespace; source changes pass git diff --check.

## Deployment boundary

This PR proposes repository source, dependency, CI, hosting configuration, and regenerated docs changes. It does not merge or publish production. Netlify must build the merged commit with Node 24, and GitHub Pages must publish the regenerated docs. Confirm the deployed commit and live routes, navigation, image loading, RSS, sitemap, and contact form after deployment. GitHub alert closure must be checked after the default branch is updated. A static site has no deployed Astro image server, but its build environment still processes images; static hosting is not a dependency remediation.
