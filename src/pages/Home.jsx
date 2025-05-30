import { Link } from "react-router";
import { useBackend } from "../context/BackendContext";
import SetBackendUrl from "../components/SetBackendUrl";

export default function Home() {
  const { backendUrl } = useBackend();

  if (!backendUrl) {
    return (
      <div className="bg-background min-h-screen flex flex-col gap-4 items-center justify-center">
        <SetBackendUrl />
      </div>
    );
  }

  const menu = [
    {
      title: "Encode Gambar",
      link: "/encode-image"
    },
    {
      title: "Encode Gambar (zip)",
      link: "/encode-image-zip"
    },
    {
      title: "Decode Gambar",
      link: "/decode-image"
    },
    {
      title: "Coba Use Case Attribusi",
      link: "/attribution"
    }
  ]

  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-around py-20">
      <h1 className="text-4xl font-bold text-accent">
        Dataset Fingerprinting
      </h1>

      <div className="flex flex-col border-2 border-accent p-10 rounded-xl">
        {menu.map((item, index) => (
          <Link to={`/${item.title.toLowerCase().replace(/\s+/g, '-')}`} key={index}>
            <button className="w-full bg-primary text-white p-3 text-2xl rounded-xl hover:bg-accent mb-4">
              {item.title}
            </button>
          </Link>
        ))}
        
      </div>

      {/* <div className="flex items-center gap-x-4">
        <Link to="/generate">
            <button className="bg-primary text-white p-3 text-2xl rounded-xl hover:bg-accent">
            Generate Image
            </button>
        </Link>
        <p className="text-secondary font-bold">OR</p>
        <button className="bg-primary text-white p-3 text-2xl rounded-xl hover:bg-accent">
          Attribution Image
        </button>
      </div> */}
    </div>
  );
}
