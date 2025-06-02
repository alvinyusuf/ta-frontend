import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import Generate from "./pages/Generate"
import Attribute from "./pages/Attribute"
import EncodeImage from "./pages/EncodeImage"
import DecodeImage from "./pages/DecodeImage"
import EncodeZip from "./pages/EncodeZip"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/encode-image" element={<EncodeImage />} />
      <Route path="/decode-image" element={<DecodeImage />} />
      <Route path="/encode-image-zip" element={<EncodeZip />} />
      <Route path="/generate" element={<Generate />} />
      <Route path="/attribute" element={<Attribute />} />
    </Routes>
  )
}

export default App
