import { useState, useEffect } from "react";
import ImageUploader from "../components/ImageUploader";
import { supabase } from "../supabase";

// ⭐ FUNGSI HELPER UNTUK FORMAT RUPIAH
const formatCurrency = (amount) => {
  const amountStr = String(amount).replace(/[^0-9]/g, "");

  if (!amountStr) return "";

  const formatted = amountStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return formatted;
};

export default function Builder() {
  const [menu, setMenu] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handlePriceChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    setPrice(rawValue);
  };

  // --- 1. Fungsi READ Data dari Supabase ---
  const fetchMenu = async () => {
    const { data, error } = await supabase
      .from("menu_items")
      .select("id, name, Harga, Deskripsi, Kategori, foto_url")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error fetching menu:", error);
    } else {
      setMenu(
        data.map((item) => ({
          ...item,
          price: item.Harga,
          desc: item.Deskripsi,
          category: item.Kategori,
          image: item.foto_url,
        }))
      );
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // --- 2. Fungsi CREATE Item ke Supabase ---
  const addItem = async () => {
    if (!name || !price) return alert("Nama & harga wajib diisi!");

    const parsedPrice = parseFloat(price);

    if (isNaN(parsedPrice)) {
      return alert("Harga harus diisi dengan angka yang valid!");
    }

    const newItem = {
      name: name,
      Harga: parsedPrice,
      Deskripsi: desc,
      Kategori: category,
      foto_url: imageUrl,
    };

    const { data, error } = await supabase
      .from("menu_items")
      .insert([newItem])
      .select();

    if (error) {
      console.error("Error adding item:", error);
      alert("Gagal menambahkan menu!");
      return;
    }

    const addedItem = {
      ...data[0],
      price: data[0].Harga,
      desc: data[0].Deskripsi,
      category: data[0].Kategori,
      image: data[0].foto_url,
    };

    setMenu([...menu, addedItem]);

    // reset input
    setName("");
    setPrice("");
    setDesc("");
    setCategory("");
    setImageUrl("");
  };

  // --- 3. Fungsi DELETE Item dari Supabase ---
  const deleteItem = async (id) => {
    const { error } = await supabase.from("menu_items").delete().eq("id", id);

    if (error) {
      console.error("Error deleting item:", error);
      alert("Gagal menghapus menu!");
      return;
    }

    setMenu(menu.filter((item) => item.id !== id));
  };

  return (
    // ⭐ KONTENER UTAMA: BACKGROUND, PEMUSATAN
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "rgb(240, 248, 255)", // Light Blue Background
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "900px", // Batas lebar konten
          width: "100%",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}
        >
          Menu
        </h1>

        {/* Form Tambah Item */}
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "12px",
            maxWidth: "400px",
            margin: "0 auto 40px auto", // Pusatkan Form
            backgroundColor: "#f9f9f9",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Tambah Menu</h3>

          <input
            placeholder="Nama menu…"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "95%",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          <input
            placeholder="Harga…"
            value={formatCurrency(price)}
            onChange={handlePriceChange}
            style={{
              width: "95%",
              marginBottom: "15px",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          <input
            placeholder="Deskripsi…"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            style={{
              width: "95%",
              marginBottom: "15px",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          <input
            placeholder="Kategori (minuman, makanan, dessert…)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: "95%",
              marginBottom: "15px",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          {/* Upload Gambar */}
          <p>Upload Gambar Menu:</p>
          <ImageUploader onUploaded={(url) => setImageUrl(url)} />

          {/* ⭐ PREVIEW GAMBAR LEBIH BESAR & PUSAT ⭐ */}
          {imageUrl && (
            <div
              style={{
                marginTop: "10px",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              <p>Preview Gambar:</p>
              <img
                src={imageUrl}
                alt="menu"
                width="300"
                height="200"
                style={{ borderRadius: "8px", objectFit: "cover" }}
              />
            </div>
          )}

          <button
            onClick={addItem}
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "10px",
              backgroundColor: "rgb(40, 167, 69)", // Hijau
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            + Tambah Menu
          </button>
        </div>

        {/* List Menu */}
        <div style={{ marginTop: "30px" }}>
          <h3
            style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}
          >
            Daftar Menu
          </h3>

          {menu.length === 0 && (
            <p style={{ textAlign: "center", color: "#666" }}>
              Belum ada menu.
            </p>
          )}

          {/* ⭐ CARD MENU DENGAN FLEXBOX ⭐ */}
          {menu.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "15px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              {/* Area Gambar */}
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  width="100"
                  height="100"
                  style={{
                    borderRadius: "8px",
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />
              )}

              {/* Area Teks dan Info */}
              <div style={{ flexGrow: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "5px",
                  }}
                >
                  <strong style={{ fontSize: "1.2em", color: "#333" }}>
                    {item.name}
                  </strong>
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "rgb(220, 53, 69)", // Merah Marun
                    }}
                  >
                    Rp{formatCurrency(item.price)},00
                  </span>
                </div>

                <div style={{ color: "#666", marginBottom: "5px" }}>
                  {item.desc}
                </div>

                <div
                  style={{
                    fontSize: "12px",
                    opacity: 0.7,
                    padding: "3px 8px",
                    backgroundColor: "rgb(233, 236, 239)", // Light Gray
                    borderRadius: "4px",
                    display: "inline-block",
                  }}
                >
                  {item.category}
                </div>
              </div>

              {/* Tombol Hapus */}
              <button
                onClick={() => deleteItem(item.id)}
                style={{
                  background: "rgb(220, 53, 69)",
                  color: "white",
                  padding: "8px 15px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
