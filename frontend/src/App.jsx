import { useState } from "react";
import MenuManagement from "./pages/MenuPage";
import OrdersDashboard from "./pages/OrdersDashboard";

function App() {
  const [activePage, setActivePage] = useState("menu");

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Top Navigation */}
      <nav className="flex gap-4 p-4 border-b border-slate-800">
        <button
          onClick={() => setActivePage("menu")}
          className={`px-4 py-2 rounded ${
            activePage === "menu"
              ? "bg-blue-600"
              : "bg-slate-800"
          }`}
        >
          Menu Management
        </button>

        <button
          onClick={() => setActivePage("orders")}
          className={`px-4 py-2 rounded ${
            activePage === "orders"
              ? "bg-blue-600"
              : "bg-slate-800"
          }`}
        >
          Orders Dashboard
        </button>
      </nav>

      {/* Page Content */}
      {activePage === "menu" && <MenuManagement />}
      {activePage === "orders" && <OrdersDashboard />}
    </div>
  );
}

export default App;
