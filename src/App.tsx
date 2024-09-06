import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import AppRoutes from "./routes/Routes";

const App: React.FC = () => {
  return (
    <>
      <div className="w-full sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl flex justify-center items-center p-5 font-bold  bg-gray-200">
        Contact Page
      </div>
      <div className="h-1 bg-white"></div>
      <Router>
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="w-1/4 bg-gray-200 p-4">
            <div className="space-y-4">
              <Link
                to="/contacts"
                className="block p-2 bg-blue-500 text-white rounded"
              >
                Contacts
              </Link>
              <Link
                to="/charts"
                className="block p-2 bg-green-500 text-white rounded"
              >
                Charts
              </Link>
              <Link
                to="/maps"
                className="block p-2 bg-yellow-500 text-white rounded"
              >
                Maps
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-3/4 p-4">
            <AppRoutes />
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
