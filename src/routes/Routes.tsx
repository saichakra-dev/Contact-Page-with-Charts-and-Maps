import React from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import React Query

import ContactForm from "../components/ContactForm";
import Contacts from "../components/Contacts";
import Charts from "../components/Charts";
import Map from "../components/Map";
import EditContact from "../components/EditContact";

// Create a QueryClient instance
const queryClient = new QueryClient();

const AppRoutes: React.FC = () => {
  return (
    // Wrap the routes with QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/contacts/create" element={<ContactForm />} />
        <Route path="/contacts/edit/:id" element={<EditContact />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/maps" element={<Map />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default AppRoutes;
