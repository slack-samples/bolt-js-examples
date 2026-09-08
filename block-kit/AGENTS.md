# Adding an Example

A block example is **code-complete** when all four of these are present:

1. Example file
2. Test file
3. README entry
4. Correct docstring

## Example file

Create `src/blocks/{type}.js`:

```js
/**
 * {Description from docs page — must match exactly}.
 *
 * @see {@link https://docs.slack.dev/reference/block-kit/blocks/{type}-block/}
 */

/**
 * {Brief description of this specific example}.
 *
 * @returns {import('@slack/types').{Type}Block}
 */
export function example01() {
  /**
   * @type {import('@slack/types').{Type}Block}
   */
  const block = {
    type: "{type}",
    // fields here
  };
  return block;
}
```

Rules:
- ES Modules (`export function`, no `module.exports`)
- One file per block type in `src/blocks/`
- Each example is an exported function named `example01()`, `example02()`, etc.
- Use JSDoc `@type` and `@returns` with `import('@slack/types')` for type annotations
- The file-level JSDoc first line must match the docs page `description` field exactly (found in the page's YAML frontmatter)
- Blocks are plain object literals (not SDK builder calls) — the JS SDK uses `@slack/types` for type definitions only

## Test file

Create `tests/blocks/{type}.test.js`:

```js
import * as assert from "node:assert";
import { describe, it } from "node:test";
import { example01 } from "../../src/blocks/{type}.js";

describe("{type}", () => {
  it("example01", () => {
    const block = example01();
    const expected = {
      type: "{type}",
      // fields matching the docs JSON example
    };
    assert.deepStrictEqual(block, expected);
  });
});
```

The expected object must match the docs page JSON example exactly (minus the outer `"blocks": [...]` wrapper).

## README entry

Add an entry to `block-kit/README.md` in alphabetical order under `### Blocks`:

```markdown
- **[{Name}](https://docs.slack.dev/reference/block-kit/blocks/{type}-block)**: {Description matching docs}. [Implementation](./src/blocks/{type}.js).
```

The description must match the docs page `description` field exactly.

## Lint and verify

```bash
cd block-kit
npm run lint      # Biome linter
npm run check     # TypeScript type checking
npm test          # Node.js built-in test runner
```

All must pass. Use `npm run lint:fix` to auto-fix formatting (spaces, double quotes, trailing commas).
