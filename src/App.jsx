import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import Generate from "./pages/Generate"
import Attribute from "./pages/Attribute"
import EncodeImage from "./pages/EncodeImage"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/encode-image" element={<EncodeImage />} />
      <Route path="/generate" element={<Generate />} />
      {/* <Route path="/attribute" element={<Attribute />} /> */}
    </Routes>
  )
}

export default App
