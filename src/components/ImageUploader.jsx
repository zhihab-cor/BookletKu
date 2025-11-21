import React, { useState } from "react";
import { supabase } from "../supabase";

export default function ImageUploader({ onUploaded }) {
  const [uploading, setUploading] = useState(false);

  async function uploadImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    const fileName = `${Date.now()}-${file.name}`;

    // Upload ke bucket Supabase
    const { error } = await supabase.storage
      .from("menu-images") // nama bucket kamu
      .upload(fileName, file);

    if (error) {
      console.error(error);
      alert("Upload gagal");
      setUploading(false);
      return;
    }

    // Ambil URL publik
    const { data } = supabase.storage
      .from("menu-images")
      .getPublicUrl(fileName);

    const url = data.publicUrl;

    setUploading(false);

    // Kirim balik URL ke parent
    if (onUploaded) onUploaded(url);
  }

  return (
    <div>
      <input type="file" onChange={uploadImage} />
      {uploading && <p>Uploading...</p>}
    </div>
  );
}
