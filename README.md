# D3js data calculation & manipulation

This is a simple d3.js app built with Nuxt. It also uses shadcn for the components used in this app. This app is capable of calculating sums of n-level nested data structures, it is able to invert or skip desired values & provides a simple context menu that lets users mess with some simple UI settings & filter out negative value.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Instructions

There are two sample data sets that are located in data.ts file. One is a 2 level nested data structure, the other one 3.

All the logic is in app.vue file.
The app waits for it to be mounted in the browser, then it begins with executing the logic. Firsly the calculation is made, and then the data is plotted in a simple d3 table.

The targeted data set can be changed on line 102.

The context menu opens when the user right clicks anywhere on the table header.
