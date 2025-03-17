// src/components/layout/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>
            News data provided by NewsAPI, The Guardian, and The New York Times
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} News Aggregator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
