This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker

```bash
docker build -t next-airbnb .
docker run -p3000:3000 -p 24678:24678 next-airbnb
```

## References and Acknowledgements

Heavily inspired by [this.](https://github.com/AntonioErdeljac/next13-airbnb-clone)

File structure inspired by [taxonomy.](https://github.com/shadcn/taxonomy)
