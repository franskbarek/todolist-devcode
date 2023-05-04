import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import DashboardEmpty from "./pages/DashboardEmpty";

export default function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<DashboardEmpty />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
