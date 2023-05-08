import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ItemDetail from "./pages/ItemDetail";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/itemdetail/:id" element={<ItemDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
