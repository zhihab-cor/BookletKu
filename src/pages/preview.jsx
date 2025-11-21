import React, { useState } from "react";
import QRCode from "react-qr-code";

export default function PreviewPublish({ menu = [] }) {
  const [theme, setTheme] = useState("minimalist");

  // generate dummy public link
  const publicLink = `https://menu-umkm.example/${Date.now()}`;

  const handlePublish = () => {
    alert("Menu berhasil dipublikasikan.\nLink: " + publicLink);
  };

  const themeStyle = {
    minimalist: {
      card: {
        padding: "14px",
        borderRadius: "8px",
        border: "1px solid #dcdcdc",
        marginBottom: "10px",
        background: "#fff",
      },
      name: { fontSize: "16px", fontWeight: 600 },
      price: { marginTop: "4px", color: "#555" },
    },

    colorful: {
      card: {
        padding: "14px",
        borderRadius: "8px",
        marginBottom: "10px",
        background: "linear-gradient(135deg, #ffd3a5, #fd6585)",
        color: "#fff",
      },
      name: { fontSize: "16px", fontWeight: 600 },
      price: { marginTop: "4px", opacity: 0.95 },
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Preview dan Publikasi</h2>

      {/* Template Option */}
      <div style={{ marginTop: "20px" }}>
        <label>Pilih Template</label>
        <br />
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px", marginTop: "6px" }}
        >
          <option value="minimalist">Minimalist</option>
          <option value="colorful">Colorful</option>
        </select>
      </div>

      {/* Menu Preview */}
      <div style={{ marginTop: "25px" }}>
        <h3>Preview Menu</h3>

        {menu.length === 0 && (
          <p style={{ opacity: 0.7 }}>Belum ada data menu yang dapat dipreview.</p>
        )}

        {menu.map((item) => (
          <div key={item.id} style={themeStyle[theme].card}>
            <div style={themeStyle[theme].name}>{item.name}</div>
            <div style={themeStyle[theme].price}>Rp {item.price}</div>

            {item.desc && (
              <div style={{ marginTop: "5px", fontSize: "14px" }}>{item.desc}</div>
            )}

            {item.category && (
              <div style={{ marginTop: "4px", fontSize: "12px", opacity: 0.7 }}>
                {item.category}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Public Link */}
      <div style={{ marginTop: "30px" }}>
        <h3>Link Publik</h3>
        <div
          style={{
            padding: "10px",
            background: "#f3f3f3",
            borderRadius: "6px",
            wordBreak: "break-all",
          }}
        >
          {publicLink}
        </div>

        {/* QR Code */}
        <h3 style={{ marginTop: "20px" }}>QR Code</h3>
        <div
          style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "8px",
            display: "inline-block",
          }}
        >
          <QRCode value={publicLink} size={170} />
        </div>

        {/* Publish Button */}
        <button
          onClick={handlePublish}
          style={{
            marginTop: "25px",
            padding: "10px 18px",
            background: "#3c7e3c",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Publikasikan Menu
        </button>
      </div>
    </div>
  );
}
