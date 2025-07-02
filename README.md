# Next.js Browserslist Issue - UUID Package with Nullish Coalescing

This repository demonstrates a potential bug in Next.js where browserslist configuration is not properly transpiling modern JavaScript syntax from node_modules, specifically nullish coalescing operators (`??`) from the UUID package.

## Issue Description

When using Next.js with a browserslist configuration targeting older browsers (Chrome 58), the build output still contains nullish coalescing operators (`??`) from the UUID package, even though Chrome 58 doesn't support this syntax (requires Chrome 80+).

### Expected Behavior
- Browserslist configuration should transpile all modern syntax to be compatible with target browsers
- Output bundles should not contain `??` operators when targeting Chrome 58

### Actual Behavior
- Build output contains untranspiled nullish coalescing operators from node_modules
- This could cause runtime errors in older browsers

## Environment

- **Next.js**: 15.4.0-canary.109
- **UUID**: 11.1.0  
- **Node.js**: Latest stable
- **Compiler**: SWC (default Next.js compiler)

## Reproduction Steps

1. Clone this repository
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Examine the output bundle for nullish coalescing operators

## Evidence

### Browserslist Configuration
```
chrome 58
```

### Build Output Analysis
The build generates a bundle at `.next/static/chunks/app/page-[hash].js` containing:

```javascript
let o=(e=e||{}).random??e.rng?.()??function(){
  // ... more code with ?? operators
```

**Count of nullish coalescing operators in bundle**: 5 instances

### Search Command Used
```bash
grep -o "\?\?" .next/static/chunks/app/page-*.js | wc -l
```

### Verification Commands
```bash
# Find the bundle containing UUID code
find .next/static/chunks -name "*.js" -exec grep -l "uuid\|UUID" {} \;

# Count nullish coalescing operators
grep -o "\?\?" .next/static/chunks/app/page-*.js | wc -l

# View the problematic code
grep -n "\?\?" .next/static/chunks/app/page-*.js
```

## Expected Fix

Next.js should configure SWC to transpile node_modules content according to browserslist configuration, converting nullish coalescing operators to equivalent compatible syntax for the target browser versions.

## How to use this template

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example reproduction-template reproduction-app
```

```bash
yarn create next-app --example reproduction-template reproduction-app
```

```bash
pnpm create next-app --example reproduction-template reproduction-app
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [How to Contribute to Open Source (Next.js)](https://www.youtube.com/watch?v=cuoNzXFLitc) - a video tutorial by Lee Robinson
- [Triaging in the Next.js repository](https://github.com/vercel/next.js/blob/canary/contributing.md#triaging) - how we work on issues
- [CodeSandbox](https://codesandbox.io/s/github/vercel/next.js/tree/canary/examples/reproduction-template) - Edit this repository on CodeSandbox

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployment

If your reproduction needs to be deployed, the easiest way is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
