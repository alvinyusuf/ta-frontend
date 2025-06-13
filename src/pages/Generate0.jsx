import React, { useState } from "react";
import Spinner from "../components/loading/Spinner";
import generatorService from "../api/services/generator.service";

function Loading() {
  return (
    <div className="flex flex-col items-center gap-y-6 rounded-xl p-10">
      <p className="font-bold text-accent">Loading...</p>
      <Spinner />
    </div>
  );
}

function Success({ imageUrl }) {
  return (
    <div className="flex flex-col items-center gap-y-6 rounded-xl p-10">
      <p className="font-bold text-accent">Success generated image</p>
      <img src={imageUrl} alt="generated image" height={128} width={128} />
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

export default function Generate() {
  const [modelName, setModelName] = useState("model-1");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerateImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    setImageUrl(null);
    setError(null);

    const playload = {
      model_name: modelName,
      seed: 42,
      truncation_psi: 0.7,
      class_idx: 0,
      noise_mode: "const",
    };

    try {
      const result = await generatorService.generateImage(playload);
      setImageUrl(result.data.imageUrl || "00000.png");
    } catch (err) {
      console.error("Error generating image:", err);
      setError("Failed to generate image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-around">
      <div className="flex flex-col items-center gap-y-4">
        <h1 className="text-4xl font-bold text-accent">Generate Image</h1>
        <form
          onSubmit={handleGenerateImage}
          className="flex flex-col items-center gap-y-6 border-2 border-accent rounded-xl p-10"
        >
          <div className="flex gap-x-10">
            <label htmlFor="" className="text-accent font-bold">
              StyleGAN2 Model
            </label>
            <select
              id="model"
              className="bg-secondary rounded-lg px-10 py-2"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
            >
              <option value="metfaces.pkl">Model 1</option>
              <option value="">Model 2</option>
              <option value="">Model 3</option>
            </select>
          </div>
          <button className="bg-primary text-white p-3 text-2xl rounded-xl hover:bg-accent">
            Generate Image
          </button>
        </form>
      </div>

      {loading && <Loading />}
      {!loading && imageUrl && <Success imageUrl={imageUrl} />}
      {!loading && error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
