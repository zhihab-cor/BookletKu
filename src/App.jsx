"use client";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Builder from "./pages/builder";
import Preview from "./pages/preview";
import Navbar from "./components/navbar";
import { useState } from "react";

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
}

export default App;
