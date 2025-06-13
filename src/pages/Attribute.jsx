import React, { useEffect, useState } from "react";
import { useGenerator } from "../hooks/useGenerator";
import Header from "../components/Header";
import { getBackendUrl } from "../context/BackendContext";

export default function Attribute() {
  const [models, setModels] = useState(["..."]);
  const [seed, setSeed] = useState(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState({ status: "idle", data: null });

  const backendUrl = getBackendUrl();

  const { getModels, error: modelsError } = useGenerator();

  const {
    generateImage,
    loading,
    error: generatorError,
  } = useGenerator();

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await getModels();
        setModels(response.data.models);
        if (response.status !== "success") {
          setError(modelsError || "Failed to fetch models");
        }
      } catch (err) {
        setError("Failed to fetch models", err.message);
      }
    };

    fetchModels();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (seed < 0) {
      setError("Seed must be a positive integer");
      return;
    }
    const response = await generateImage({
      model_name: models[0],
      seed: parseInt(seed),
    });
    console.log(response)
    if (response.status === "success") {
      setResult(response);
      console.log("Image generation request sent:", response);
    } else {
      setError("Failed to generate image");
    }
  };

  const handleDownload = async () => {
    if (result.status !== "success" || !result.data.image_url) {
      setError("Tidak ada gambar untuk diunduh.");
      return;
    }

    try {
      const response = await fetch(backendUrl + result.data.image_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = result.data.filename || "gan_image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download gagal:", err);
      setError("Terjadi kesalahan saat mengunduh gambar.");
    }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col gap-y-4">
      <Header />
      <h1 className="text-4xl font-bold text-accent text-center">
        Attribusi Gambar
      </h1>
      {error && (
        <p className="text-center text-red-600 font-semibold bg-red-100 border border-red-300 rounded-lg px-4 py-2 mx-auto max-w-lg">
          {error}
        </p>
      )}

      <div className="flex items-center gap-x-4">
        <div className="w-full max-w-md mx-auto space-y-10">
          <p className="text-center font-bold text-xl text-primary">Generate</p>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl shadow-2xl p-6"
          >
            <div className="flex items-center justify-between gap-x-6">
              <label
                htmlFor="model"
                className="text-primary font-bold text-xl w-1/4"
              >
                Model
              </label>
              <select
                id="model"
                name="model"
                className="p-2 border-2 border-secondary rounded-xl w-full focus:outline-none focus:border-primary text-accent font-semibold"
                value={models[0]}
                onChange={(e) => setModels([e.target.value])}
              >
                {models.map((model, index) => (
                  <option
                    key={index}
                    value={model}
                    className="text-accent font-semibold"
                  >
                    {model}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between gap-x-6">
              <label
                htmlFor="seed"
                className="text-primary font-bold text-xl w-1/4"
              >
                Seed
              </label>
              <input
                type="number"
                id="seed"
                name="seed"
                className="p-2 border-2 border-secondary rounded-xl w-full focus:outline-none focus:border-primary text-accent font-semibold"
                placeholder="Masukkan seed"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white text-xl font-bold rounded-xl p-4 hover:bg-accent transition-colors"
            >
              Encode Gambar
            </button>
          </form>
        </div>

        <div className="w-full max-w-md mx-auto space-y-6">
          <p className="text-xl font-bold text-primary text-center">Hasil</p>
          {generatorError ? (
            <p className="text-center text-red-600 font-semibold bg-red-100 border border-red-300 rounded-lg px-4 py-2 mx-auto max-w-lg">
              {generatorError.message}
            </p>
          ) : (
            <div className="flex flex-col items-center rounded-2xl shadow-2xl p-6 gap-y-6">
              <div className="w-32 h-32 flex items-center justify-center bg-gray-100 rounded-xl shadow-lg">
                {result.status === "success" && !loading ? (
                  <img
                    src={backendUrl + result.data.image_url}
                    alt="result.png"
                    height={128}
                    width={128}
                    className="w-32 h-32 bg-gray-100 rounded-xl shadow-lg"
                  />
                ) : (
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                )}
              </div>
              <button
                onClick={handleDownload}
                className="bg-primary text-white font-bold py-2 px-4 rounded-xl hover:bg-accent"
              >
                Download gambar
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
