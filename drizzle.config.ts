import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  schemaFilter: ["public"], // <-- Tambahkan baris ini
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});