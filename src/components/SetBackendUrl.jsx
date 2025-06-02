import React, { useState } from "react";
import { useBackend } from "../context/BackendContext";

export default function SetBackendUrl() {
  const [input, setInput] = useState("");
  const { updateBackendUrl } = useBackend();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBackendUrl(input);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center w-full max-w-md"
    >
      <p className="text-2xl font-bold text-primary mb-4">Masukkan URL Backend</p>
      <input
        type="text"
        placeholder="https://example.com/api/"
        className="w-full p-2 border-2 border-secondary rounded-2xl focus:outline-none focus:border-primary text-accent font-semibold"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-primary text-white p-2 mt-4 rounded-2xl hover:bg-accent w-full"
        type="submit"
      >
        Simpan
      </button>
    </form>
  );
}
