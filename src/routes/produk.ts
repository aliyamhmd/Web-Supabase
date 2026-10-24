import { Elysia } from "elysia";
import { db } from "../db/index";
import { produkTable } from "../db/schema";
import { eq } from 'drizzle-orm';

export const produkRoute = new Elysia({
    prefix: "/produk"
});

// 1. Read Semua Produk (GET /produk)
produkRoute.get("/", async () => {
    const data = await db.select().from(produkTable);
    return data;
});

// 2. Read Produk Berdasarkan ID (GET /produk/:id)
produkRoute.get("/:id", async ({ params }) => {
    const id = Number(params.id);
    const data = await db.select()
        .from(produkTable)
        .where(eq(produkTable.id, id));
    
    if (data.length === 0) {
        return { error: "Produk tidak ditemukan" };
    }
    return data[0];
});

// 3. Create Produk (POST /produk)
produkRoute.post("/", async ({ body }) => {
    const newProduk = await db.insert(produkTable)
        .values(body as any)
        .returning();

    return {
        message: "Produk berhasil ditambahkan",
        data: newProduk[0]
    };
});

// 4. Update Produk (PUT /produk/:id)
produkRoute.put("/:id", async ({ params, body }) => {
    const id = Number(params.id);
    const updatedProduk = await db.update(produkTable)
        .set(body as any)
        .where(eq(produkTable.id, id))
        .returning();

    if (updatedProduk.length === 0) {
        return { error: "Produk tidak ditemukan" };
    }

    return {
        message: "Produk berhasil diperbarui",
        data: updatedProduk[0]
    };
});

// 5. Delete Produk (DELETE /produk/:id)
produkRoute.delete("/:id", async ({ params }) => {
    const id = Number(params.id);
    const deletedProduk = await db.delete(produkTable)
        .where(eq(produkTable.id, id))
        .returning();

    if (deletedProduk.length === 0) {
        return { error: "Produk tidak ditemukan" };
    }

    return {
        message: "Produk berhasil dihapus",
        data: deletedProduk[0]
    };
});