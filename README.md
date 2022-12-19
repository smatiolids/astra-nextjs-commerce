# DataStax Astra provider for Next.js Commerce

A data provider (or package) implementation to host data on DataStax Astra and Stargate acting as a headless ecommerce service, leveraging the Next.js Commerce framework to build a site.

## What is Next.js Commerce

The all-in-one starter kit for high-performance e-commerce sites. With a few clicks, Next.js developers can clone, deploy and fully customize their own store.
Start right now at [nextjs.org/commerce](https://nextjs.org/commerce)

Demo live at: [demo.vercel.store](https://demo.vercel.store/)

## Implemented Features

- Product listing
- Product Search (basic)

## Run minimal version locally

> To run a minimal version of Next.js Commerce you can start with the default local provider `@vercel/commerce-local` that has all features disabled (cart, auth) and uses static files for the backend

```bash
pnpm install & pnpm build # run these commands in the root folder of the mono repo
pnpm dev # run this command in the site folder
```
