import React from "react";
import Spinner from "../components/loading/Spinner";

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
  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-around">
      <div className="flex flex-col items-center gap-y-4">
        <h1 className="text-4xl font-bold text-accent">Attribute Image</h1>
        <form className="flex flex-col items-center gap-y-6 border-2 border-accent rounded-xl p-10">
          <div className="flex gap-x-10">
            <label htmlFor="" className="text-accent font-bold">
              StyleGAN2 Model
            </label>
            <input type="file" className="bg-secondary rounded-lg px-10 py-2" />
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
