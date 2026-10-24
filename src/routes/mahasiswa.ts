import { Elysia } from "elysia";

let mahasiswa = [
    {
        id: 1,
        nama: "Ahmad",
        email: "ahmad@example.com",
        jurusan: "Teknik Informatika"
    },
    {
        id: 2,
        nama: "Anisa",
        email: "anisa@example.com",
        jurusan: "Manajemen Informatika"
    },
    {
        id: 3,
        nama: "Andika",
        email: "andika@example.com",
        jurusan: "Teknik Informatika"
    }
];

export const mahasiswaRoute = new Elysia({
    prefix: "/mahasiswa"
});

// GET
mahasiswaRoute.get("/:id", ({ params }) => {
    const mahasiswaId = params.id;
    const data = mahasiswa.find(m => m.id === parseInt(mahasiswaId));
    if (data) {
        return data;
    } else {
        return { error: "Mahasiswa tidak ditemukan" };
    }
});

// POST
mahasiswaRoute.post("/", ({ body }) => {
    if (body) {
        const newMahasiswa = {
            id: mahasiswa.length + 1,
            ...(body as object)
        };
        mahasiswa.push(newMahasiswa as any);
        return { message: "Mahasiswa berhasil ditambahkan", data: newMahasiswa };
    } else {
        return { error: "Tidak ada data yang masuk" };
    }
});

// PUT
mahasiswaRoute.put("/:id", ({ params, body }) => {
    const id = parseInt(params.id);
    const index = mahasiswa.findIndex(m => m.id === id);

    if (index === -1) {
        return { error: "Mahasiswa tidak ditemukan" };
    }

    const { nama, email, jurusan } = body as any;
    mahasiswa[index] = { id, nama, email, jurusan };

    return { message: "Data mahasiswa berhasil diperbarui seluruhnya", data: mahasiswa[index] };
});

// PATCH
mahasiswaRoute.patch("/:id", ({ params, body }) => {
    const id = parseInt(params.id);
    const index = mahasiswa.findIndex(m => m.id === id);

    if (index === -1) {
        return { error: "Mahasiswa tidak ditemukan" };
    }

    mahasiswa[index] = {
        ...mahasiswa[index],
        ...(body as object)
    };

    return { message: "Data mahasiswa berhasil diperbarui sebagian", data: mahasiswa[index] };
});

// DELETE
mahasiswaRoute.delete("/:id", ({ params }) => {
    const id = parseInt(params.id);
    const index = mahasiswa.findIndex(m => m.id === id);

    if (index === -1) {
        return { error: "Mahasiswa tidak ditemukan" };
    }

    const deleted = mahasiswa.splice(index, 1);
    return { message: "Mahasiswa berhasil dihapus", data: deleted[0] };
});

// CONNECT
mahasiswaRoute.connect("/", () => {
    return { message: "CONNECT request diterima, koneksi berhasil dihubungkan" };
});