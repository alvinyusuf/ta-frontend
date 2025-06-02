import { useState } from "react";
import { useFingerprint } from "../hooks/useFingerprint";
import { getBackendUrl } from "../context/BackendContext";
import ZipUpload from "../components/ZipUpload";
import Header from "../components/Header";

export default function EncodeZip() {
  const [zip, setZip] = useState(null);
  const [seed, setSeed] = useState(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState({ status: "idle", data: null });

  const backendUrl = getBackendUrl();
  const { embedBatch, loading, error: fingerprintError } = useFingerprint();

  const handleFileSelected = (zip) => {
    setZip(zip);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!zip) {
      setError("Pilih file zip terlebih dahulu!");
      return;
    }

    setError("");
    const response = await embedBatch({
      file: zip,
      seed: parseInt(e.target.seed.value, 10) || 0,
    });
    setResult(response);
  };

  const handleDownload = async () => {
    if (result.status !== "success" || !result.data.zip_url) {
      setError("Tidak ada zip untuk diunduh.");
      return;
    }

    try {
      const response = await fetch(backendUrl + result.data.zip_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = result.data.zip_url?.split('/').pop() || "encoded_zip.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download gagal:", err);
      setError("Terjadi kesalahan saat mengunduh file zip.");
    }
  };


  return (
    <div className="bg-background min-h-screen flex flex-col py-gap-y-4">
      <Header />
      <h1 className="text-4xl font-bold text-accent text-center">Encode Gambar</h1>
      {error && (
        <p className="text-center text-red-600 font-semibold bg-red-100 border border-red-300 rounded-lg px-4 py-2 mx-auto max-w-lg">
          {error}
        </p>
      )}

      <div className="flex items-center gap-x-4">
        
        <div className="w-full max-w-md mx-auto space-y-10">
          <p className="text-center font-bold text-xl text-primary">Input</p>
          <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl shadow-2xl p-6">
            <ZipUpload onFileSelected={handleFileSelected} />
            <div className="flex items-center">
              <label htmlFor="seed" className="text-primary font-bold text-xl">Seed</label>
              <input
                type="number"
                id="seed"
                name="seed"
                className="ml-2 p-2 border-2 border-secondary rounded-xl w-full focus:outline-none focus:border-primary text-accent font-semibold"
                placeholder="Masukkan seed"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full bg-primary text-white text-xl font-bold rounded-xl p-4 hover:bg-accent transition-colors">
              Encode Zip
            </button>
          </form>
        </div>

        <div className="w-full max-w-md mx-auto space-y-6">
          <p className="text-xl font-bold text-primary text-center">Hasil</p>
          {fingerprintError ? (
            <p className="text-center text-red-600 font-semibold bg-red-100 border border-red-300 rounded-lg px-4 py-2 mx-auto max-w-lg">
              {fingerprintError.message}
            </p>
          ) : (
            <div className="flex flex-col items-center rounded-2xl shadow-2xl p-6 gap-y-6">
              <div className="w-32 h-32 flex items-center justify-center bg-gray-100 rounded-xl shadow-lg">
                {(result.status === "success" && !loading) ? (
                  <img
                    src="zip-96.png"
                    alt="result.png"
                    height={96}
                    width={96}
                  />
                ) : (
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                )}
              </div>
              <button onClick={handleDownload} className="bg-primary text-white font-bold py-2 px-4 rounded-xl hover:bg-accent">Download Zip</button>
            </div>
          )}
        </div>


      </div>
    </div>
  );
}
