import React from "react";
import { Dashboard } from "./pages/Dashboard";
import { ToastContainer } from "./components/Common/Toast";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Dashboard />
      <ToastContainer />
    </div>
  );
}

export default App;
