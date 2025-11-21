import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Builder from "./pages/builder";
import Preview from "./pages/preview";
import Navbar from "./components/navbar";
import { useState } from "react";
import ImageUploader from "./components/ImageUploadesr";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </>
  );

  const [imageUrl, setImageUrl] = useState("");

  rteturn(
    <div style={{ padding: 20 }}>
      <h1>Upload Gambar di Sini</h1>
      <ImageUploader onUploaded={(url) => setImageUrl(url)} />

      {imageUrl && (
        <div>
          <h3>Preview</h3>
          <img src="{imageUrl}" alt="Uploaded" width="200" />
          <p>
            <b>Public URL:</b>
          </p>
          <code>{imageUrl}</code>
        </div>
      )}
    </div>
  );
}

export default App;
