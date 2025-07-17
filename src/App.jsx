import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import StockList from "./pages/stock_list";
import StockTable from "./pages/stock_table";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StockList />} />
          <Route path="/stock_table" element={<StockTable />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
