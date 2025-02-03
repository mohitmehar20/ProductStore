import { Routes , Route} from "react-router-dom"
import HomePage from "./pages/HomePage"
import CreateProduct from "./pages/CreateProduct"
import Navbar from "./components/Navebar"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateProduct />} />
       
      </Routes>
    </>
  )
}

export default App
