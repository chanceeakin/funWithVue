# funWithVue

This is an in browser spectrograph, built on top of Vue3 + SciChart.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Deployment

AWS deployment strategy via Terraform is also included with the repo. These instructions assume knowledge of AWS, TF, and Github. For support, please message me. To deploy:

- Ensure that AWS, Make, & Terraform CLIs are installed and configured. This example uses `us-east-1`.
- Clone this repo, or keep your AWS instance pointed to this repo's remote URL.
- Create a new `.env` file in the `tf/` directory from the `.env.sample`. Fill in the required fields.
- Use the Makefile to run the appropriate commands to `init`, `plan`, and `apply` the infrastructure.
- Observe: code _should_ be live on your AWS account and will listen to the associated repo for automated branch builds of `main`.
