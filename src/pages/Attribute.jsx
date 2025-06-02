import React, { useEffect, useState } from "react";
import Spinner from "../components/loading/Spinner";
import { useGenerator } from "../hooks/useGenerator";
import Header from "../components/Header";

function Loading() {
    return (
        <div className="flex flex-col items-center gap-y-6 rounded-xl p-10">
        <p className="font-bold text-accent">Loading...</p>
        <Spinner />
        {/* <img src="loading.gif" alt="loading" height={128} width={128} /> */}
        </div>
    );
}

function Success() {
  return (
    <div className="flex flex-col items-center gap-y-6 rounded-xl p-10">
      <p className="font-bold text-accent">Success generated image</p>
      <img src="00000.png" alt="generated image" height={128} width={128} />
      <div className="flex gap-x-4 text-white text-xl">
        <button className="bg-primary p-2 rounded-xl hover:bg-accent">
          Download
        </button>
        <button className="bg-primary p-2 rounded-xl hover:bg-accent">
          Attribute
        </button>
      </div>
    </div>
  );
}

export default function Attribute() {
  const [models, setModels] = useState(["stylegan-f-ffhq-1-3500.pkl"]);
  const [seed, setSeed] = useState(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState({ status: "idle", data: null });

  const { getModels } = useGenerator();
  const { generateImage } = useGenerator();

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await getModels();
        setModels(response.data.models);
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
    const response = await generateImage({ model_name: models[0], seed: parseInt(seed), truncation_psi: 0.7 });
    if (response.status === "success") {
      setResult(response);
    } else {
      setError("Failed to generate image");
    }
  }

  return (
    <div className="bg-background min-h-screen flex flex-col items-center">
      <Header />
      <div className="flex flex-col items-center gap-y-4">
        <h1 className="text-4xl font-bold text-accent">Attribusi Gambar</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6 rounded-xl p-10 shadow-2xl">
          <div className="flex gap-x-10">
            <label htmlFor="" className="text-accent font-bold">
              StyleGAN2 Model
            </label>
            <select name="" id="" className="p-2 border-2 border-secondary rounded-xl w-full focus:outline-none focus:border-primary text-accent font-semibold">
              {models.map((model, index) => (
                <option key={index} value={model} className="text-accent font-semibold">
                  {model}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-x-10">
            <label htmlFor="seed" className="text-accent font-bold">
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
          <button className="bg-primary text-white p-3 text-xl font-bold rounded-xl hover:bg-accent">
            Decode Image
          </button>
        </form>
      </div>
      <Loading />
    </div>
  );
}
