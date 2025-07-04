import React, { useState } from 'react'
import ImageUpload from '../components/ImageUpload'
import { useFingerprint } from '../hooks/useFingerprint';
import Swal from 'sweetalert2';
import Header from '../components/Header';

export default function DecodeImage() {
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [fingerprint_str, setFingerprint_srt] = useState("");
  const [result, setResult] = useState({ status: "idle", data: {
    fingerprint: "",
    bitwise_accuracy: 0
  } });
  const { decodeFingerprint, loading, error: decodeError } = useFingerprint();

  const handleFileSelected = (image) => {
    setImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setError("Pilih gambar terlebih dahulu!");
      return;
    }

    setError("");
    const response = await decodeFingerprint({
      image: image,
      input_fingerprint: fingerprint_str,
    });
    setResult(response);
    console.log(response);
  };

  const handleCopy = async () => {
    const text = result.status === "success" && !loading ? result.data.fingerprint : "";
    if (text) {
      try {
        await navigator.clipboard.writeText(text);
        Swal.fire({
          icon: "success",
          title: "Berhasil disalin!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Gagal menyalin!",
          text: err.message,
        });
      }
    }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
      <h1 className="text-4xl font-bold text-accent text-center">Decode Gambar</h1>
       {error && (
        <p className="text-center text-red-600 font-semibold bg-red-100 border border-red-300 rounded-lg px-4 py-2 mx-auto max-w-lg">
          {error}
        </p>
      )}

      <div className="flex items-center gap-x-4">
        
        <div className="w-full max-w-md mx-auto">
          <p className="text-center font-bold text-xl text-primary">Input</p>
          <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl shadow-2xl p-6">
            <ImageUpload onFileSelected={handleFileSelected} />
            <div className="flex flex-col">
              <label htmlFor="fingerprint" className="font-bold text-primary w-1/2 text-start flex items-center">fingerprint (ground truth)</label>
              <textarea
                id="fingerprint"
                name="fingerprint_str"
                className="p-2 border-2 border-secondary rounded-xl w-full focus:outline-none focus:border-primary text-accent font-semibold resize-none"
                rows={4}
                placeholder="Masukkan fingerprint (ground truth)"
                onChange={(e) => setFingerprint_srt(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-primary text-white text-xl font-bold rounded-xl p-4 hover:bg-accent transition-colors">
              Decode Gambar
            </button>
          </form>
        </div>

        <div className="w-full max-w-md mx-auto space-y-6">
          <p className="text-xl font-bold text-primary text-center">Hasil</p>
          {decodeError ? (
            <p className="text-center text-red-600 font-semibold bg-red-100 border border-red-300 rounded-lg px-4 py-2 mx-auto max-w-lg">
              {decodeError.message}
            </p>
          ) : (
            <div className="flex flex-col items-center rounded-2xl shadow-2xl p-6 gap-y-2">
              <div className="flex w-full text-center">
                <label htmlFor="fingerprint" className="font-bold text-primary w-1/2 text-start flex items-center">Bitwise Accuracy</label>
                <input
                  type="text"
                  className="ml-2 p-2 border-2 border-secondary rounded-xl w-full focus:outline-none focus:border-primary text-accent font-semibold resize-none"
                  readOnly
                  value={result.data.bitwise_accuracy}
                />
              </div>
              <div className="flex flex-col w-full text-center mb-4">
                <label htmlFor="fingerprint" className="font-bold text-primary">Fingerprint</label>
                <textarea
                  id="fingerprint"
                  name="fingerprint"
                  className="ml-2 p-2 border-2 border-secondary rounded-xl w-full focus:outline-none focus:border-primary text-accent font-semibold resize-none"
                  rows={4}
                  placeholder="Fingerprint akan muncul di sini setelah encoding"
                  readOnly
                  value={result.status === "success" && !loading ? result.data.fingerprint : ""}
                ></textarea>
              </div>
              <button onClick={handleCopy} className="bg-primary text-white font-bold py-2 px-4 rounded-xl hover:bg-accent">Copy</button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
