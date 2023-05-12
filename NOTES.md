# Mongo DB

Create new database cluster on [MongoDB](https://cloud.mongodb.com).

# Google Auth

Create new project on [GCP](https://console.cloud.google.com).

# GitHub Auth

Create new OAuth app on [GitHub](https://github.com/settings/developers).
Get Client ID and Client Secrets

# Prisma

npx prisma db push
npx prisma generate

# Dependencies

## Eslint

See: .eslintrc.json
pnpm add --save-dev @typescript-eslint/parser eslint eslint-config-next eslint-config-prettier eslint-plugin-tailwindcss

## Formatters

See: prettier.config.js

### Prettier

pnpm add --save-dev @fsouza/prettierd

### Tailwind Formatter

pnpm add --save-dev prettier-plugin-tailwindcss

### Import Sorter

pnpm add --save-dev @ianvs/prettier-plugin-sort-imports

# Issues

Next 13.3.0 breaks next/image in docker. Downgrade to 13.2.4 or use 13.4.2 to fix.
see: [issue](https://github.com/vercel/next.js/issues/48173)