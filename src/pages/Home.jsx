import { Link } from "react-router";
import Header from "../components/Header";

export default function Home() {
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
      link: "/attribute"
    }
  ]

  return (
    <div className="bg-background min-h-screen flex flex-col items-center">
      <Header />
      <h1 className="text-4xl font-bold text-accent">
        Dataset Fingerprinting
      </h1>

      <div className="flex flex-col shadow-2xl p-8 rounded-xl gap-y-4">
        {menu.map((item, index) => (
          <Link to={item.link} key={index}>
            <button className="w-full bg-primary text-white p-3 text-xl font-bold rounded-xl hover:bg-accent">
              {item.title}
            </button>
          </Link>
        ))}
        
      </div>
    </div>
  );
}
