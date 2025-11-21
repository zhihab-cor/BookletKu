import { useState } from "react";

export default function Builder() {
  const [menu, setMenu] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");

  const addItem = () => {
    // validasi kosong
    if (!name || !price) return alert("Nama & harga wajib diisi!");

    const newItem = {
      id: Date.now(),
      name,
      price,
      desc,
      category,
    };

    setMenu([...menu, newItem]);

    // reset input
    setName("");
    setPrice("");
    setDesc("");
    setCategory("");
  };

  const deleteItem = (id) => {
    setMenu(menu.filter((item) => item.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🧱 Menu Builder</h1>

      {/* Form Tambah Item */}
      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          maxWidth: "400px",
        }}
      >
        <h3>Tambah Menu</h3>

        <input
          placeholder="Nama menu…"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          placeholder="Harga…"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          placeholder="Deskripsi…"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          placeholder="Kategori (minuman, makanan, desert…)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <button onClick={addItem}>+ Tambah</button>
      </div>

      {/* List Menu */}
      <div style={{ marginTop: "30px" }}>
        <h3>Daftar Menu</h3>

        {menu.length === 0 && <p>Belum ada menu.</p>}

        {menu.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
          >
            <strong>{item.name}</strong> — Rp{item.price}
            <div>{item.desc}</div>
            <div style={{ fontSize: "12px", opacity: 0.7 }}>
              {item.category}
            </div>
            <button
              onClick={() => deleteItem(item.id)}
              style={{ marginTop: "8px", background: "red", color: "white" }}
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
