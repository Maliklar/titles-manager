## Stack used in this project

- NextJS 13 Fullstack framework
- Prisma for database access and modeling
- TypeScript
- Tailwind for styling

## Running Project Locally Instructions

1. Install NPM packages Run

```bash
npm i
```

2. Push database schema

```bash
npx prisma db push
```

3. Generate Prisma client to be able to use the schema in the project

```bash
npx prisma generate
```

4. Run the project

```bash
npm run dev

```

## Check it live

Visit https://titles-manager.vercel.app/
